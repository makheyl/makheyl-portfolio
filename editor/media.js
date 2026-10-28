// Image handling for the editor, done entirely in the browser with <canvas>:
// resizing, thumbnails, shape detection, and a square crop with optional black and white.

export const slug = (s) =>
  String(s || "file")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 48) || "file";

const stamp = () => Date.now().toString(36);

export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("That file isn't an image this browser can read."));
    };
    img.src = url;
  });
}

const toBlob = (canvas, type = "image/jpeg", quality = 0.84) =>
  new Promise((resolve) => canvas.toBlob(resolve, type, quality));

// Draws the image scaled so its longest side is at most `max`, on white (no transparent JPEG)
function scaled(img, max) {
  const s = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.naturalWidth * s);
  canvas.height = Math.round(img.naturalHeight * s);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}

// "16:9", "4:5", … or the reduced exact ratio
export function ratioString(w, h) {
  const r = w / h;
  const known = [[1, 1], [4, 5], [5, 4], [3, 4], [4, 3], [2, 3], [3, 2], [16, 9], [9, 16], [21, 9]];
  const near = known.find(([a, b]) => Math.abs(a / b - r) < 0.02);
  if (near) return `${near[0]}:${near[1]}`;
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const g = gcd(w, h);
  return `${w / g}:${h / g}`;
}

// A gallery work: full size (1600 px) + thumbnail (800 px)
export async function processWork(file, name) {
  const img = await loadImage(file);
  const full = await toBlob(scaled(img, 1600));
  const thumb = await toBlob(scaled(img, 800), "image/jpeg", 0.8);
  const base = `${slug(name)}-${stamp()}.jpg`;
  return {
    files: [
      { path: `assets/creative/web/${base}`, blob: full },
      { path: `assets/creative/web/thumbs/${base}`, blob: thumb },
    ],
    image: `assets/creative/web/${base}`,
    thumb: `assets/creative/web/thumbs/${base}`,
    ratio: ratioString(img.naturalWidth, img.naturalHeight),
  };
}

// A single resized photo (gear)
export async function processPhoto(file, name, dir = "assets/gear") {
  const img = await loadImage(file);
  const path = `${dir}/${slug(name)}-${stamp()}.jpg`;
  return { files: [{ path, blob: await toBlob(scaled(img, 1200)) }], image: path };
}

/* ---------- Square crop with zoom, position, and black and white ---------- */
export function cropDialog(file, { title = "Crop", size = 900, grayscale = false, dir = "assets", name = "image" } = {}) {
  return loadImage(file).then(
    (img) =>
      new Promise((resolve) => {
        const view = 280;
        const dlg = document.createElement("div");
        dlg.className = "ed-modal";
        dlg.innerHTML = `
          <div class="ed-modal-card ed-crop" role="dialog" aria-label="${title}">
            <p class="ed-modal-title">${title}</p>
            <canvas class="ed-crop-canvas" width="${view * 2}" height="${view * 2}" style="width:${view}px;height:${view}px"></canvas>
            <p class="ed-hint">Drag to move. Use the slider to zoom.</p>
            <label class="ed-field-row">Zoom <input type="range" min="1" max="3" step="0.01" value="1" class="ed-crop-zoom" /></label>
            <label class="ed-switch"><input type="checkbox" class="ed-crop-bw" ${grayscale ? "checked" : ""} /><span></span>Black and white</label>
            <div class="ed-modal-actions">
              <button type="button" class="ed-btn" data-act="cancel">Cancel</button>
              <button type="button" class="ed-btn is-primary" data-act="use">Use photo</button>
            </div>
          </div>`;
        document.body.append(dlg);
        const canvas = dlg.querySelector("canvas");
        const ctx = canvas.getContext("2d");
        const zoomEl = dlg.querySelector(".ed-crop-zoom");
        const bwEl = dlg.querySelector(".ed-crop-bw");
        let zoom = 1;
        let ox = 0; // offset of the image centre from the frame centre, in source pixels
        let oy = 0;

        const base = Math.min(img.naturalWidth, img.naturalHeight); // source square at zoom 1
        const clamp = () => {
          const half = base / zoom / 2;
          ox = Math.max(-(img.naturalWidth / 2 - half), Math.min(img.naturalWidth / 2 - half, ox));
          oy = Math.max(-(img.naturalHeight / 2 - half), Math.min(img.naturalHeight / 2 - half, oy));
        };
        const draw = (target, px) => {
          const g = target.getContext("2d");
          const side = base / zoom;
          const sx = img.naturalWidth / 2 + ox - side / 2;
          const sy = img.naturalHeight / 2 + oy - side / 2;
          g.fillStyle = "#fff";
          g.fillRect(0, 0, px, px);
          g.filter = bwEl.checked ? "grayscale(1) contrast(1.08)" : "none";
          g.imageSmoothingQuality = "high";
          g.drawImage(img, sx, sy, side, side, 0, 0, px, px);
          g.filter = "none";
        };
        const redraw = () => { clamp(); draw(canvas, canvas.width); };
        redraw();

        let drag = null;
        canvas.addEventListener("pointerdown", (e) => {
          drag = { x: e.clientX, y: e.clientY, ox, oy };
          canvas.setPointerCapture(e.pointerId);
        });
        canvas.addEventListener("pointermove", (e) => {
          if (!drag) return;
          const perPx = base / zoom / view; // source pixels per screen pixel
          ox = drag.ox - (e.clientX - drag.x) * perPx;
          oy = drag.oy - (e.clientY - drag.y) * perPx;
          redraw();
        });
        canvas.addEventListener("pointerup", () => (drag = null));
        zoomEl.addEventListener("input", () => { zoom = Number(zoomEl.value); redraw(); });
        bwEl.addEventListener("change", redraw);

        const done = async (use) => {
          if (!use) { dlg.remove(); resolve(null); return; }
          const out = document.createElement("canvas");
          out.width = out.height = size;
          draw(out, size);
          const path = `${dir}/${slug(name)}-${stamp()}.jpg`;
          const blob = await toBlob(out, "image/jpeg", 0.88);
          dlg.remove();
          resolve({ files: [{ path, blob }], image: path });
        };
        dlg.addEventListener("click", (e) => {
          const act = e.target.closest("[data-act]")?.dataset.act;
          if (act) done(act === "use");
          else if (e.target === dlg) done(false);
        });
        dlg.querySelector('[data-act="use"]').focus();
      })
  );
}

export const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
