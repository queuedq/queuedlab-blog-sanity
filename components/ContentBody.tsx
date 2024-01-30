import styles from './ContentBody.module.css'
import RichText from './rich-text/RichText'

export default function ContentBody({ content }) {
  return (
    <div className={`break-words ${styles.portableText}`}>
      <RichText content={content} />
    </div>
  )
}
