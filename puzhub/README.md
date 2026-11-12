# PuzHub public information site

This is a self-contained static website for **PuzHub: Daily Brain Puzzles**, by **Pixel Kraft Productions**. It uses the app logo, the matching teal/mint/peach palette, original SVG puzzle artwork, and a light/dark theme control. It has no build step, external fonts, tracking scripts, analytics, or cookies. All page links are relative so the site works under a GitHub project URL as well as a custom domain.

## Pages

- `index.html` — product overview
- `games.html` — how the five games work and how progression works
- `about-app.html` — app features and local/offline behavior
- `privacy-policy.html` — public privacy policy
- `terms.html` — terms of use
- `contact.html` — support and privacy contact

## Publish on GitHub Pages

GitHub Pages branch publishing supports the repository root or `/docs`. This site is in `listing/site`, so use GitHub Actions to upload that directory as the Pages artifact.

1. Push this repository to GitHub. The current local project may have a different Git remote; GitHub Pages requires a GitHub repository.
2. In the repository, create `.github/workflows/` if it does not exist.
3. Copy `deploy-pages-workflow.yml` from this folder to `.github/workflows/puzhub-site.yml` at the repository root. Commit and push it to the branch named `main`, or change the workflow's branch filter first.
4. On GitHub, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
5. Open **Actions**, wait for “Deploy PuzHub website” to complete, and open its published page URL. The first deployment URL usually resembles `https://OWNER.github.io/REPOSITORY/`.
6. Open every page on the published HTTPS URL, including the privacy policy. Check mobile layout, dark mode, email link, and all navigation links.
7. Put the public privacy URL in the app’s visible privacy entry and the Google Play Console privacy-policy field. The current app screen contains a local privacy summary; it does not yet open this hosted page. Update that in-app link after the final Pages URL is known.

If the default branch is not `main`, change the `branches` entry in the workflow. If you use a custom domain, configure it in Pages and verify HTTPS before submitting the listing.

## Store submission checklist

- Use the exact public HTTPS privacy-policy URL in Google Play Console and provide a clear path to it inside the app.
- Complete the Play Console **Data safety** form for the exact release bundle and every included dependency/SDK. The policy text here reflects the project source/configuration reviewed for the current release; recheck the final AAB, merged Android manifest, SDKs, and any later changes before declaring the app’s practices.
- Keep the policy consistent with actual behavior. If adding ads, analytics, crash reporting, sign-in, cloud sync, purchases, or any network feature, update the app disclosures, this policy, and the Play Console form before release.
- If account creation is ever added, review Google Play’s account deletion and data deletion URL rules. This version has no PuzHub account system.
- Confirm your target audience, age rating, permissions, screenshots, feature graphic, and store description match the shipped app. This site does not guarantee store approval.

## Policy and platform references

- [Google Play: User Data policy](https://support.google.com/googleplay/android-developer/answer/10144311)
- [Google Play: Prepare your app for review / privacy policy and Data safety](https://support.google.com/googleplay/android-developer/answer/9859455)
- [GitHub Pages: Using a custom GitHub Actions workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages: Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Updating the content

Keep the effective date on the privacy and terms pages current whenever their text changes. Review the Privacy Policy against the actual installed build, including transitive SDKs and Android permissions. This site is informational and is not legal advice.
