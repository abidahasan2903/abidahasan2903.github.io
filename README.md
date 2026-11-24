# Abid Ahasan — Portfolio

A responsive React and Vite portfolio for Abid Ahasan, a Software Engineering student and mobile and web app developer. It showcases STUDORA and CALCORA, skills, education, a CV, and direct email contact.

## Run locally

```bash
npm ci
npm run dev
```

Build the static site with `npm run build`; preview it with `npm run preview`.

## CV and images

The CV is included at `public/assets/Abid_Ahasan_CV.pdf`. The **View CV** button opens it in a new tab; **Download CV** downloads it. Replace the file at that exact path to update the published CV.

Optional image paths for the hero portrait and project cards are documented in [public/assets/media-README.md](public/assets/media-README.md). Add the matching image files there and they will replace the fallback initials/icons.

## Contact form

The static portfolio posts messages to FormSubmit's AJAX endpoint for `abidahasan5002@gmail.com`; it has no paid backend or server key. Submissions include the sender's name, email as Reply-To, subject, and message in FormSubmit's table template. The first test submission sends a one-time activation email to that inbox. Confirm it to enable delivery. If the form is offline or the service is unavailable, the page offers a prefilled `mailto:` fallback.

## Deployment

Every push to `main` builds the Vite site and deploys `dist/` to GitHub Pages through GitHub Actions.
