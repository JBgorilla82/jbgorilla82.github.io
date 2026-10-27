# Gorilla82 Help

Static site (HTML, CSS, JS) for GitHub Pages. No build step.

## Put it live

1. Create a GitHub repository and upload everything in this folder to the root (so `index.html` sits at the top level).
2. In the repository, go to **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, then save.
4. After a minute or so the site is live at `https://<your-username>.github.io/<repository-name>/`.

All links inside the site are relative, so it works from a project URL like the one above and from a custom domain.

## Add your real links

Open `js/main.js` and fill in the `CONFIG` block at the top.

- `email`: the address that receives service orders. The service buttons (CV review, cover letter and so on) open an email to this address with the service name in the subject.
- `links`: your Etsy shop, print-on-demand shop, free book, social profiles, and the prompt pack and Tech Help purchase pages.

Any link left empty shows a "Coming soon" message instead of going nowhere.

## Change the colours

Every colour is a variable at the top of `css/styles.css` (the `:root` block). Change `--gold`, `--bg` and the rest there and all three pages update.

## Files

- `index.html`: home page (shop, tech help, print-on-demand, prompt packs, services, book, tools, testimonials)
- `tech-help.html`: the six Tech Help topics
- `prompt-packs.html`: the four AI prompt packs
- `css/styles.css`, `js/main.js`, `assets/favicon.svg`

## Before you launch

- The two testimonials near the bottom of `index.html` came across from the old site. Swap them for real customer feedback.
- The fonts (Bricolage Grotesque and Instrument Serif) load from Google Fonts. If the visitor is offline the site falls back to system fonts.
