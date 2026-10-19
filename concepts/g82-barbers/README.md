# G82 Barbers — GitHub Pages website template

A dark, premium, biker-style one-page site for a barbershop. Plain HTML, CSS and JavaScript only — no build step, no frameworks — so it works on GitHub Pages straight away.

## Files

| File | What it does |
| --- | --- |
| `index.html` | All the content and structure |
| `styles.css` | All the styling (colours and fonts are at the top in `:root`) |
| `script.js` | Mobile menu, scroll effects, gallery lightbox, live "Open now" status |

## Publish on GitHub Pages

1. Create a new repository on GitHub (e.g. `g82-barbers`).
2. Upload `index.html`, `styles.css` and `script.js` to the **root** of the repository (drag and drop works via **Add file → Upload files**).
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose the `main` branch and the `/ (root)` folder, then **Save**.
5. After a minute or two your site is live at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

To use your own domain, add it under **Settings → Pages → Custom domain**.

## Things to change before going live

The text, prices and contact details are **placeholders** — replace them with the real thing.

- **Booksy link** — search `index.html` for `https://booksy.com/en-gb/` and replace every instance with your shop's own Booksy profile link.
- **Address, phone, email** — in the hero bar, the `#contact` section and the footer. The phone number and email are fictional placeholders.
- **Opening hours** — edit the `<table data-hours>` in `#contact`. The "Open now / Closed" badges and the "Today" highlight update automatically from that table (evaluated in UK time).
- **Services and prices** — the `#services` section.
- **Barbers** — the `#barbers` section: names, roles, bios and tags. The photos are stock images, so swap in real portraits.
- **Social links** — the Instagram and Facebook links currently point to the home pages of each site.
- **Map** — instructions are in an HTML comment inside the `.map-box` in `#contact`.
- **Reviews** — the reviews band links to Booksy rather than showing made-up quotes. Add real client reviews once you have them (a commented example is in the file).

## Gorilla82 concept bar

A green "Concept design only · Not a working website" bar sits at the very top and very bottom of the page. To remove it for a live client site, delete the two `<div class="concept-bar">` blocks in `index.html` (search for "concept bar") and the "Gorilla82 concept bar" section in `styles.css`. The banner image is loaded from `https://gorilla82.co.uk/images/Gorilla-banner.jpeg`.

## Swapping photos

Every image is a link to an Unsplash photo. To use your own, put the image file in the same folder as `index.html` (e.g. `shop-front.jpg`) and replace the `src="https://images.unsplash.com/..."` value with `src="shop-front.jpg"`. For gallery images, also update the matching `data-full="..."` value.

## Photo credits

Photography is from [Unsplash](https://unsplash.com/) and is free to use under the [Unsplash License](https://unsplash.com/license) (attribution not required, but appreciated): Nathon Oski, Redd Francisco, Agustin Fernandez, delfina pan, Michael DeMoya, Gulom Nazarov, Jason Leung, Andrea Donato, Joshua Lawrence, Nate Johnston, Allef Vinicius, Obi, Hai Phung and Federico Tonini.

The images are loaded directly from Unsplash's servers, so they need an internet connection. For the most reliable site, download the ones you keep and host them in your repository.
