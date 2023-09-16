import RichText from 'app/components/rich-text/RichText'

import styles from './ContentBody.module.css'

export default function ContentBody({ content }) {
  return (
    <div className={styles.portableText}>
      <RichText content={content} />
    </div>
  )
}
