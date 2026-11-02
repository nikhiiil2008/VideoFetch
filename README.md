# VideoFetch

A responsive video downloader interface for **direct video-file URLs**.

## Current MVP
- Paste a direct HTTP(S) video URL.
- Preview supported video files in the browser.
- Download the original file when the host permits it.
- Responsive dark interface for mobile and desktop.

## Supported direct file extensions
MP4, WebM, OGG, MOV, and M4V.

## Important limitations
This static MVP does not extract videos from YouTube, social-media pages, private pages, or DRM-protected streams. It cannot bypass login restrictions, access controls, or host download protections. Only save content you own or are authorized to download. Quality is the source file's original quality; selectable 1080p/720p variants require a backend/source that explicitly provides those variants.

## Run locally
Open `index.html` in a browser, or serve this folder with any static web server.

## Publish with GitHub Pages
1. Open the repository's **Settings**.
2. Select **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site.

The public site will be available at `https://nikhiiil2008.github.io/VideoFetch/` after Pages is enabled.
