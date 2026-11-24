# Abid Ahasan — Portfolio

This repository contains the React/Vite portfolio deployed at [abidahasan2903.github.io](https://abidahasan2903.github.io/).

## Run locally

```bash
npm ci
npm run dev
```

Build the static site with `npm run build`; preview it with `npm run preview`.

## CV

The CV is included at `assets/Abid_Ahasan_CV.pdf`. The **View CV** button opens it in a new tab; **Download CV** downloads the PDF. See [assets/README.md](assets/README.md).

## Contact form

The static portfolio posts messages to FormSubmit's AJAX endpoint for `abidahasan5002@gmail.com`; it has no paid backend or server key. The first test submission sends a one-time activation email to that inbox. Confirm it to enable delivery. If the form is offline or the service is unavailable, the page offers a prefilled `mailto:` fallback.

## Deployment

Every push to `main` builds the Vite site and deploys `dist/` to GitHub Pages through GitHub Actions.