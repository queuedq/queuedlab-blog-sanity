import { urlForImage } from "lib/sanity.image";

export default function Image({ value }) {
  const url = urlForImage(value.asset).url()
  console.log(url)

  // TODO: write alt
  // TODO: set size
  // TODO: use next/image or https://www.sanity.io/plugins/next-sanity-image
  return (
    <img src={url} alt="image" />
  )
}
