import getYouTubeID from 'get-youtube-id'

export default function YouTubePreview(props) {
  const { url, renderDefault } = props
  const id = getYouTubeID(url)
  const embedUrl = `https://www.youtube.com/embed/${id}`

  let content
  if (!id) {
    content = (
      <div className="flex w-full h-full items-center justify-center text-red-500 font-bold">
        <div>Enter YouTube video URL</div>
      </div>
    )
  } else {
    content = (
      <iframe
        title="YouTube Preview"
        src={embedUrl}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        className="w-full h-full"
      />
    )
  }

  return (
    <div>
      {renderDefault({ ...props, title: 'YouTube Embed' })}
      <div className="mt-1 aspect-video">
        {content}
      </div>
    </div>
  )
}
