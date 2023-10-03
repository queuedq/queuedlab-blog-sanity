import { parseISO } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import { formatInTimeZone } from 'date-fns-tz'
import { getSettings } from 'lib/sanity.fetch'

export interface PostDateProps {
  dateString: string
}

export default async function PostDate({ dateString }: PostDateProps) {
  const settings = await getSettings()
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
