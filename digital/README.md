# Gorilla82 Digital

Static site (HTML, CSS, JS) for GitHub Pages. No build step.

## Put it live

1. Create a GitHub repository and upload everything in this folder to the root (so `index.html` sits at the top level).
2. In the repository, go to **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, then save.
4. After a minute or so the site is live at `https://<your-username>.github.io/<repository-name>/`.

All links inside the site are relative, so it works from a project URL like the one above and from a custom domain.

## Add your real links

Open `js/main.js` and fill in the `CONFIG` block at the top.

- `links.etsy`: your Etsy shop. It's set to `https://www.etsy.com/shop/Gorilla82Digital`. Check this matches your shop's address.
- `packs`: one line for each of the 10 packs. When a listing is live on Etsy, paste its listing URL between the quotes. Until then, that pack's buttons open the Etsy shop.
- `email` and the other `links`: leave empty for now. Everything else on the site is marked "Coming soon" and its buttons do nothing except show a "Coming soon" message.

## Turning a "Coming soon" section back on

Each coming-soon section in `index.html` has `is-soon` on its `<section>` tag, a `<span class="soon">Coming soon</span>` label, and buttons with `data-soon`. Remove those three things and put the original link back on the button. The Tech Help and Prompt Packs pages have a "This page is coming soon" banner near the top to remove the same way.

## Pack photos

The product photos are in `assets/packs/`, one `.webp` per pack, cropped from the Etsy listing photos.

## Change the colours

Every colour is a variable at the top of `css/styles.css` (the `:root` block). Change `--gold`, `--bg` and the rest there and all three pages update.

## Files

- `index.html`: home page (the 10 packs first, then the coming-soon sections)
- `tech-help.html`: the six Tech Help topics
- `prompt-packs.html`: the four AI prompt packs
- `css/styles.css`, `js/main.js`, `assets/favicon.svg`

## Before you launch

- The old placeholder testimonials have been removed. Add real Etsy reviews to the Reviews section once buyers leave them.
- The fonts (Bricolage Grotesque and Instrument Serif) load from Google Fonts. If the visitor is offline the site falls back to system fonts.
