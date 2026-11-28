# TYPiO public website

Responsive, dependency-free static site for GitHub Pages. The pages share a stylesheet and script but keep their content in separate HTML files.

## Pages

- `index.html` — product overview and key features
- `about.html` — app details, English/Hindi learning paths and Pixel Kraft Productions
- `how-to-use.html` — keyboard setup and getting started
- `faq.html` — product, lesson and backup answers
- `privacy.html` — privacy policy and data handling
- `terms.html` — terms of use
- `contact.html` — developer contact and support guidance

## Preview

Open `index.html` in a modern browser or serve this folder with any static file server. Keep all HTML pages, `styles.css`, `script.js` and the SVG logos together. No package install or build step is required.

## Appearance and motion

The header theme button switches between light and dark appearance and remembers the choice in local storage. On a first visit, the site follows the operating-system preference. Motion respects `prefers-reduced-motion`; the navigation and content remain usable without animation.

## Publish with GitHub Pages

Copy the **contents** of this `site` folder into the root of the website repository, push the files, then open **Settings → Pages** and choose **Deploy from a branch** with the publishing branch and **/(root)**. If publishing from `/docs`, copy these files there instead. For another folder, configure a GitHub Actions workflow.

After publishing, verify every page and both themes on a phone and desktop. Use these public paths in Play Console:

- Privacy policy: `/privacy.html`
- Terms of use: `/terms.html`
- Support website: `/contact.html`

Do not submit local file paths as policy URLs. Verify the public HTTPS links before release.

## Release review

- Confirm that product and policy claims match the exact app bundle and enabled SDK behavior.
- Complete Google Play Data safety and age/audience declarations from the shipped app, not from website copy alone.
- Review privacy and terms with appropriate legal guidance for intended distribution regions.
- Keep the contact email and effective policy date current when publishing revisions.
