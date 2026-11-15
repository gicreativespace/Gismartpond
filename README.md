# GI SMART POND PWA — Frontend Demo

Premium Light Aqua theme, responsive dashboard, editable farm name, 10 animated SVG aerator illustrations, EB/DG demo toggles and PWA install/offline shell.

## Current scope
- Demo mode only.
- Aerator and EB/DG states are local JavaScript demo values.
- No Firebase, ESP32, Modbus, DI or DO integration yet.
- Navigation items other than Home are placeholders for upcoming stages.
- Demo toggles do not control real electrical equipment.

## Run locally
Open `index.html` in a browser for basic UI preview. For PWA/service-worker testing, serve the folder over HTTPS or localhost.

## Deploy with GitHub Pages (mobile workflow)
1. Create a GitHub repository named `gi-smart-pond-pwa`.
2. Upload all files and folders from this project ZIP to the repository root (not the ZIP file itself).
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main`, folder `/ (root)`, then Save.
6. Wait for the Pages deployment. Open the published HTTPS URL on your phone.
7. In Chrome, use **⋮ → Add to Home screen** or **Install app**.

If using a project repository, keep the relative paths (`./css/...`, `./js/...`) unchanged.

## Next stages
1. Complete Aerators, Power, Reports, Events and Settings screens.
2. Add Firebase Authentication and per-farmer/pond database rules.
3. Add secure ESP32 device-to-cloud communication.
4. Integrate Modbus DI status only after bench testing the selected module.
5. Keep DO channels disabled until a separately tested automation package is commissioned.

## Important
The frontend is a visual prototype, not a safety or control system. Never connect this demo to motor control circuits. Actual electrical installation and automation require verified device datasheets, engineered drawings and qualified commissioning.
