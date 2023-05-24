import BlogContext from 'components/BlogContext'
import { parseISO } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import { formatInTimeZone } from 'date-fns-tz'
import { useContext } from 'react'

export interface PostDateProps {
  dateString: string
}

export default function PostDate({ dateString }: PostDateProps) {
  const { settings } = useContext(BlogContext)
  if (!dateString) return null

  const date = parseISO(dateString)
  return (
    <time className="tabular-nums" dateTime={dateString}>
      {formatInTimeZone(date, settings.timeZone, 'yyyy.MM.dd', {
        locale: enUS,
      })}
    </time>
  )
}
