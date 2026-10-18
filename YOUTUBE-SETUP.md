# 5,000-video static YouTube gallery

The video page contains a **fixed catalogue of 5,000 videos** from four public channels:

- DAWAH X — 1 video
- Professor Dr. Abubakar Muhammad Zakaria — 2,798 videos
- Salafi Manhaj 2 — 201 videos
- Peace TV Bangla (`@PeaceTVprogram`) — 2,000 videos

The videos are combined into one gallery, with 20 cards per page (250 pages total). Visitors can search by video title or channel, use the page controls, and click a card to play the YouTube embed in a player on the website.

## No API key or automatic updates

The catalogue is static; no YouTube API key or live API request is needed. New channel uploads will **not** appear automatically. To change the collection later, update `youtube-videos.json` and the first-page thumbnail files as needed, then upload the changed files to the same GitHub Pages folder.

## Publish

Upload all files and folders from the ZIP into the GitHub Pages repository root (the same folder as `index.html`). In particular, keep `youtube-videos.json`, `youtube-gallery.js`, `videos.html`, and the `video-thumb-*.jpg` files together.

The video player is an embedded YouTube player. YouTube or a channel owner can restrict playback for an individual video (for example, disable embedding, age/region restrict it, or remove it), so those individual videos may show a YouTube restriction message. The in-app preview sandbox blocks YouTube/network content; test actual playback on the published website.
