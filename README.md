# BMW Collection — standalone Angular 21

This is a complete standalone project. No other RevGate project is required.

## Run on Windows
Install Node.js 24 LTS, open a terminal in this folder, then run:

    npm install
    npm start

Open http://localhost:4200

## Production build

    npm run build

Output: dist/bmw-collection/browser. Configure your web host to serve index.html for application routes.

The collection opens at /. Model detail pages use /models/:slug.
Existing navigation to other RevGate pages returns to the collection in this standalone edition.
Images and model data are preserved from the original package. Five hero images are low-resolution fallbacks; unknown specifications remain blank."# design-2" 
