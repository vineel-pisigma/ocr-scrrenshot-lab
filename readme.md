# OCR Screenshot Lab

A standalone experimental environment for testing and evaluating OCR models on message screenshots.

The primary objective is to identify OCR engines that can accurately extract text, URLs, punctuation, and special characters from screenshots of SMS messages, messaging applications, and other text-based interfaces.

This project is independent of any production application. It provides a controlled environment for experimenting with OCR engines without introducing experimental dependencies or code into existing repositories.

## 1. Project Objectives

The lab focuses on screenshot-based text extraction.

Our objectives are:

- Extract complete text from uploaded message screenshots.
- Preserve the original recognized text without automatic correction.
- Identify how accurately OCR engines recognize URLs.
- Investigate errors involving special characters and punctuation.
- Inspect individual recognized text regions and confidence scores.
- Measure OCR detection, recognition, and total processing time.
- Compare different OCR engines using the same screenshots.
- Identify a suitable OCR solution based on accuracy and resource consumption.

## 2. Technology Stack

### Current Implementation

| Technology | Purpose |
|---|---|
| JavaScript | Application logic |
| Vite | Development server and build tooling |
| HTML | User interface structure |
| CSS | Application styling |
| PaddleOCR.js | Screenshot text recognition |
| PP-OCRv5 | Initial OCR model |
| ONNX Runtime Web | Browser-based model inference |
| OpenCV.js | Image processing support |

### Why PaddleOCR.js?

PaddleOCR.js provides a JavaScript interface for running PaddleOCR in a browser environment.

We selected it for the initial experiment because:

- It supports browser-based OCR inference.
- It avoids requiring a dedicated Python OCR server.
- It supports PP-OCR model configurations.
- It provides recognized text and associated detection information.
- It allows us to experiment with screenshot extraction locally.

The initial configuration uses English recognition with PP-OCRv5.

## 3. Application Workflow

1. The user uploads a message screenshot.
2. The application displays an image preview.
3. PaddleOCR is initialized when required.
4. The screenshot is passed to the OCR engine.
5. The engine detects text regions and recognizes their contents.
6. Recognized text is displayed in the results area.
7. Individual recognition results and confidence scores are displayed.
8. Processing metrics are displayed for inspection.

### Processing Architecture

```text
Message Screenshot
       |
       v
Image Upload
       |
       v
Image Preview
       |
       v
PaddleOCR.js
       |
       v
PP-OCRv5
       |
       v
Text Detection
       |
       v
Text Recognition
       |
       v
OCR Results
       |
       +----> Extracted Text
       |
       +----> Confidence Scores
       |
       +----> Text Region Coordinates
       |
       +----> Processing Metrics
```

## 4. URL and Special Character Testing

An important part of this project is evaluating OCR accuracy for URLs.

A single incorrectly recognized character can change a URL or make it unusable.

We will pay particular attention to:

| Character | Testing purpose |
|---|---|
| `.` | Domain separation and extensions |
| `!` | Trailing punctuation |
| `&` | Query parameter separation |
| `?` | Query string identification |
| `=` | Parameter assignments |
| `/` | URL paths |
| `:` | Protocol and port separators |
| `-` | Hyphenated domains |
| `_` | Underscores in paths and parameters |
| `%` | URL encoding |
| `@` | Email addresses and URL user information |

Example test input:

```text
https://example.com/verify?id=123&source=bank!
```

The objective is to determine whether the OCR engine recognizes every character correctly.

The original OCR output must remain unchanged during testing.

## 5. Important Design Principle: No Automatic Text Correction

This lab is intended to evaluate OCR recognition quality.

Therefore, the initial implementation does not perform:

- Automatic spelling correction.
- Language-model-based text correction.
- URL reconstruction.
- Character substitution.
- Punctuation normalization.
- Automatic removal of special characters.

These operations could hide recognition errors or introduce new ones.

We want to inspect what the OCR engine actually recognizes.

## 6. Current Project Scope

The first development milestone focuses exclusively on PaddleOCR.js.

| Feature | Status |
|---|---|
| Screenshot upload | Initial implementation |
| Image preview | Initial implementation |
| PaddleOCR.js integration | Initial implementation |
| PP-OCRv5 configuration | Initial implementation |
| Text extraction | Initial implementation |
| Confidence display | Initial implementation |
| Text region coordinates | Initial implementation |
| Processing metrics | Initial implementation |
| Multiple OCR engine comparison | Planned |
| URL-specific evaluation | Planned |
| Character-level accuracy evaluation | Planned |
| Resource consumption comparison | Planned |
| Automated benchmark reports | Planned |

Implementation status should be updated after each feature is tested successfully.

## 7. Planned OCR Engine Comparisons

After validating the initial PaddleOCR implementation, we intend to investigate:

- PaddleOCR
- EasyOCR
- RapidOCR
- Tesseract OCR
- docTR

Each engine will eventually be evaluated against the same screenshot dataset.

We will compare:

- Overall text recognition accuracy.
- Character Error Rate (CER).
- Word Error Rate (WER).
- Exact URL Match Rate.
- URL character recognition accuracy.
- Processing time.
- Memory consumption.
- CPU utilization.

No model will be selected based on assumptions or popularity. Selection will be based on actual experimental results.

## 8. Experimental Testing Methodology

The user will initially inspect screenshots and extracted text manually.

The testing process will be:

1. Upload a screenshot.
2. Record the OCR output.
3. Inspect missing or incorrectly recognized characters.
4. Check whether URLs were extracted accurately.
5. Record recognition failures.
6. Repeat the same experiment with other OCR engines when integrated.
7. Compare the results.

A manually verified ground-truth dataset can be introduced later to support automated evaluation.

## 9. Project Structure

```text
ocr-screenshot-lab/
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
│
├── src/
│   ├── main.js
│   └── style.css
│
├── README.md
└── .gitignore
```

This is the initial lightweight application structure. Additional modules will be introduced when the experimental requirements justify them.

## 10. Development Roadmap

### Phase 1 — Initial OCR Environment
- Establish an independent repository.
- Configure Vite and JavaScript.
- Integrate PaddleOCR.js.
- Configure PP-OCRv5 English.
- Upload message screenshots.
- Display extracted text and recognition information.

### Phase 2 — Manual OCR Testing
- Test different screenshot types.
- Inspect URL recognition failures.
- Investigate punctuation and special-character errors.
- Record observations.

### Phase 3 — Additional OCR Engines
- Integrate alternative OCR models.
- Maintain a common result format.
- Run identical screenshots through each engine.

### Phase 4 — Evaluation Framework
- Introduce manually verified ground truth.
- Calculate CER and WER.
- Calculate exact URL match accuracy.
- Measure processing time and resource consumption.

### Phase 5 — Model Selection
- Generate comparison reports.
- Identify the best-performing model.
- Document accuracy and deployment trade-offs.
- Consider integrating the selected model into production applications.

## 11. Running the Project

Requirements:

- Node.js
- npm
- A modern browser with WebAssembly support

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## 12. Project Philosophy

This is an experimental OCR evaluation environment, not a production smishing detection application.

The goal is to understand the actual capabilities and limitations of different OCR engines through reproducible experiments.

We prioritize exact text recognition, URL integrity, special-character preservation, and practical resource requirements over assumptions about model performance.
