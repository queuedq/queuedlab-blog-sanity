import getYouTubeID from 'get-youtube-id'

export default function YouTubePreview(props) {
  const { url, renderDefault } = props
  const id = getYouTubeID(url)
  const embedUrl = `https://www.youtube.com/embed/${id}`

  let content
  if (!id) {
    content = (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>Enter YouTube video URL</div>
      </div>
    )
  } else {
    content = (
      <iframe
        title="YouTube Preview"
        src={embedUrl}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        style={{ width: '100%', height: '100%' }}
      />
    )
  }

  return (
    <div>
      {renderDefault({ ...props, title: 'YouTube Embed' })}
      <div style={{ marginTop: 4, aspectRatio: 16 / 9 }}>
        {content}
      </div>
    </div>
  )
}
