import getYouTubeID from 'get-youtube-id'

export default function YouTubeEmbed({ value }) {
  const id = getYouTubeID(value.url)
  const url = `https://www.youtube.com/embed/${id}`

  if (!id) {
    return (
      <p className="text-center text-red-500 font-bold">
        Missing YouTube video URL
      </p>
    )
  }

  return (
    <iframe
      title="YouTube Embed"
      src={url}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      className="w-full aspect-video"
    />
  )
}
