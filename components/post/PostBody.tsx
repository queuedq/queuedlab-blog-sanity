/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import RichText from 'components/rich-text/RichText'

import styles from './PostBody.module.css'

export default function PostBody({ content }) {
  return (
    <div className={`mt-16 ${styles.portableText}`}>
      <RichText content={content} />
    </div>
  )
}
