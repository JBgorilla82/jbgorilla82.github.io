# Gorilla 82 — website

A responsive, static website designed to be hosted on GitHub Pages. It uses plain HTML, CSS and a small amount of JavaScript. No build step, package manager or framework is required.

## Files

- `index.html` — page content and structure
- `styles.css` — responsive styling and visual design
- `script.js` — mobile navigation, portfolio filters, current year and email enquiry helper

## Before publishing

1. Search the files for `info@gorilla82.co.uk` and replace it with your real contact email if different.
2. Confirm the prices, package details and service areas reflect your actual offer.
3. Replace the concept portfolio names and designs with real work as you build it. The three current examples are explicitly labelled as concept designs, not completed client projects.
4. Add your own phone number and any social links if you want them displayed.
5. The contact form opens the visitor's default email app using a `mailto:` link. It does not store submissions or send them through a server. For a form that works without an email app, connect a static-form provider such as Formspree or use a suitable form endpoint.
6. Google Fonts load from Google's servers. The site still has fallback fonts if those requests fail.

## Publish on GitHub Pages

1. Create a new **public** repository on GitHub, for example `gorilla-82`.
2. Upload `index.html`, `styles.css`, `script.js` and this README to the repository root.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site. The URL will usually be `https://YOUR-USERNAME.github.io/gorilla-82/`.
7. Test the published URL on mobile and desktop. Check all links and submit a test enquiry.

## Custom domain

You can add a domain later under **Settings → Pages → Custom domain**, then configure the DNS records at your domain provider as GitHub instructs. Once the DNS and certificate are ready, enable **Enforce HTTPS**.

## Important notes

- GitHub Pages serves static files. This website is compatible as-is.
- Do not put passwords, private customer details or secrets in a public repository.
- The portfolio examples are illustrative designs and should not be presented as paid client work.
- Prices are guide prices and should be edited to match the packages you actually intend to offer.
