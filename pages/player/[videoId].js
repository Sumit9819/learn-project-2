import videos from "../../data/videos.json";

export default function PlayerPage({ video }) {
  if (!video) {
    return <h1>Video not found</h1>;
  }

  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <title>{video.title}</title>
        <style>{`
          body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
          video { width: 100%; height: 100%; object-fit: contain; }
        `}</style>
      </head>
      <body>
        <video controls autoPlay>
          <source src={video.video_path} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </body>
    </html>
  );
}

// SSR to load video from JSON
export async function getServerSideProps(context) {
  const { videoId } = context.params;
  const video = videos[videoId] || null;
  return { props: { video } };
}
