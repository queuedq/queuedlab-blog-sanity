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
    <p
      style={{
        paddingBottom: '56.25%',
        position: 'relative',
        height: 0,
        overflow: 'hidden',
      }}
    >
      <iframe
        title="YouTube Embed"
        src={url}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </p>
  )
}
