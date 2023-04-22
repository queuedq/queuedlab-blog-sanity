import { format, parseISO } from 'date-fns'

export default function PostDate({ dateString }: { dateString: string }) {
  if (!dateString) return null

  const date = parseISO(dateString)
  return <time className="tabular-nums" dateTime={dateString}>{format(date, 'yyyy.MM.dd')}</time>
}
