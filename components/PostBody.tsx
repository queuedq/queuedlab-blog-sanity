/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import styles from './PostBody.module.css'
import RichText from './rich-text/RichText'

export default function PostBody({ content }) {
  return (
    <div className={`${styles.portableText}`}>
      <RichText content={content} />
    </div>
  )
}
