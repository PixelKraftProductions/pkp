# WiFiles website

A self-contained static website for the WiFiles product, with a searchable gallery of the 46 documented app screens and links to their light/dark SVGs and screen specifications.

## Preview locally

From the `WifiFiles` folder, run a static file server such as:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/site/`. Opening the HTML directly with `file://` may prevent the screen catalog from loading.

## Publish with GitHub Pages

The workflow at `../.github/workflows/pages.yml` assembles `site/`, `docs/`, and `prototype/` into one Pages artifact. Put the `WifiFiles` folder contents in a GitHub repository, push to its `main` branch, and set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The workflow also supports a manual run from the Actions tab.

The website uses relative paths, so it works at a GitHub Pages project URL without hardcoding a repository name. It uses no app framework, external font service, analytics, or raster UI icons. Theme follows the visitor’s system light/dark preference.

## Publisher details and privacy commitment

Publisher: Pixel Kraft Productions · Support and privacy contact: `mr.pkp.dev@gmail.com`. These details are configured in `assets/site-config.js`. The canonical policy pages are `privacy.html` and `terms.html`. The privacy page follows the v1 data-handling commitments in `../summary.md`; the release implementation and Google Play Data safety declarations must match those commitments.
