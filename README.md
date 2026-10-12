# My personal page

You can see the page here: https://medz23.github.io/ana-maria-luisa/

It's my personal web page: who I am, my work experience, education and volunteering, my skills, my publications, the projects I'm proudest of and the certificates I've collected. If you want to get in touch, the "Say hi" section at the bottom has my email and links.

![me](https://github.com/medz23/ana-maria-luisa/blob/main/img/me3.png)

## How it's built

Plain HTML, CSS and JavaScript, with no frameworks or CDNs:

- `index.html` – the content, with an inline SVG sprite for the pixel icons and the brand logos
- `styles.css` – the design (purple tokens at the top, automatic dark mode, mobile-first layout)
- `main.js` – phone menu, typewriter, bubbles, Experience tabs, certificate filter and lightbox
- `fonts/` – self-hosted VT323 and Newsreader (latin + latin-ext)
- `img/` – WebP images; certificates live in `img/certs/` as a 640px thumbnail plus a full-size version

### Adding a certificate

1. Export the certificate as WebP twice: `name-640.webp` (640px wide) and `name-full.webp` (up to 1600px) into `img/certs/`.
2. Copy one of the `<li data-group="...">` entries in the Certificates section of `index.html` and change the file names, title and issuer.
3. If it's a new provider, add a filter button with the same `data-filter` value as the entry's `data-group`, and update the counts.
