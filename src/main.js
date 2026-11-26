
import { PaddleOCR } from "@paddleocr/paddleocr-js";
import "./style.css";

const imageInput = document.querySelector("#imageInput");
const preview = document.querySelector("#preview");
const extractBtn = document.querySelector("#extractBtn");
const status = document.querySelector("#status");
const output = document.querySelector("#output");
const regions = document.querySelector("#regions");
const metrics = document.querySelector("#metrics");

let selectedFile = null;
let ocrEngine = null;
let previewUrl = null;

async function initializeOCR() {
  if (ocrEngine) return ocrEngine;

  status.textContent = "Initializing PaddleOCR...";

  ocrEngine = await PaddleOCR.create({
    lang: "en",
    ocrVersion: "PP-OCRv5",
    ortOptions: {
      backend: "auto"
    }
  });

  return ocrEngine;
}

imageInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    status.textContent = "Please select an image.";
    return;
  }

  selectedFile = file;

  if (previewUrl) URL.revokeObjectURL(previewUrl);

  previewUrl = URL.createObjectURL(file);
  preview.src = previewUrl;
  preview.hidden = false;

  extractBtn.disabled = false;
  output.value = "";
  regions.replaceChildren();
  metrics.textContent = "Ready for extraction.";

  status.textContent = `Selected: ${file.name}`;
});

extractBtn.addEventListener("click", async () => {
  if (!selectedFile) return;

  extractBtn.disabled = true;
  output.value = "";
  regions.replaceChildren();

  try {
    const engine = await initializeOCR();

    status.textContent = "Extracting screenshot text...";

    const [result] = await engine.predict(selectedFile);

    const items = result.items ?? [];

    // Preserve OCR text exactly. No correction or normalization.
    output.value = items.map(item => item.text).join("\n");

    items.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "region";

      const text = document.createElement("pre");
      text.textContent = item.text;

      const details = document.createElement("small");
      details.textContent =
        `Line ${index + 1} | Confidence: ${
          (item.score * 100).toFixed(2)
        }% | Coordinates: ${JSON.stringify(item.poly)}`;

      row.append(text, details);
      regions.append(row);
    });

    metrics.textContent = JSON.stringify({
      image: result.image,
      detectionTimeMs: result.metrics?.detMs,
      recognitionTimeMs: result.metrics?.recMs,
      totalTimeMs: result.metrics?.totalMs,
      detectedBoxes: result.metrics?.detectedBoxes,
      recognizedCount: result.metrics?.recognizedCount,
      runtime: result.runtime
    }, null, 2);

    status.textContent = `Extraction completed: ${items.length} text regions.`;

  } catch (error) {
    console.error(error);
    status.textContent = `OCR failed: ${error.message}`;
  } finally {
    extractBtn.disabled = false;
  }
});
