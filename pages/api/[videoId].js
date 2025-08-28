import videos from "../../data/videos.json";

export default function handler(req, res) {
  const { videoId } = req.query;
  const video = videos[videoId];

  if (!video) {
    return res.status(404).send("Video not found");
  }

  // Detect Twitterbot (so it sees meta tags instead of redirect)
  const ua = req.headers["user-agent"] || "";
  const isTwitterBot = ua.toLowerCase().includes("twitterbot");

  if (!isTwitterBot) {
    // Normal user → redirect to destination
    return res.redirect(302, video.redirect_url);
  }

  // Twitterbot → send meta tags
  const playerUrl = `https://${req.headers.host}/player/${videoId}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${video.title}</title>
      <meta name="description" content="${video.description}">
      <meta name="twitter:card" content="player">
      <meta name="twitter:site" content="@your_twitter_handle">
      <meta name="twitter:title" content="${video.title}">
      <meta name="twitter:description" content="${video.description}">
      <meta name="twitter:player" content="${playerUrl}">
      <meta name="twitter:player:width" content="1280">
      <meta name="twitter:player:height" content="720">
    </head>
    <body></body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
