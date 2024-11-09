import { parseISO } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import { formatInTimeZone } from 'date-fns-tz'

import { loadSettings } from '@/sanity/loader/loadQuery'

export interface PostDateProps {
  dateString: string
}

export default async function PostDate({ dateString }: PostDateProps) {
  const { data: settings } = await loadSettings()
  if (!dateString) return null

  const date = parseISO(dateString)
  return (
    <time className="tabular-nums" dateTime={dateString}>
      {formatInTimeZone(date, settings.timeZone ?? 'Etc/UTC', 'yyyy.MM.dd', {
        locale: enUS,
      })}
    </time>
  )
}
