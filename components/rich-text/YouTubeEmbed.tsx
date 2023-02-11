import getYouTubeID from 'get-youtube-id'

export default function YouTubeEmbed({ value }) {
  const id = getYouTubeID(value.url)
  const url = `https://www.youtube.com/embed/${id}`

  if (!id) {
    return (
      <p
        style={{
          color: 'red',
          fontWeight: 700,
          textAlign: 'center'
        }}
      >
        Missing YouTube video URL
      </p>
    )
  }

  return (
    <div style={{ aspectRatio: 16 / 9 }}>
      <iframe
        title="YouTube Embed"
        src={url}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        className="w-full h-full"
      />
    </div>
  )
}
