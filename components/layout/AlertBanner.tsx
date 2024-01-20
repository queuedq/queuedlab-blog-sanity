import { disableDraftUrl } from '@/app/utils/urls'

export default function AlertBanner({
  preview,
  loading,
}: {
  preview?: boolean
  loading?: boolean
}) {
  if (!preview) return null

  return (
    <div className="border-b border-accent-7 bg-accent-7 text-white">
      <div className="px-5 py-2 text-center text-sm">
        {loading ? 'Loading... ' : 'This page is a preview. '}
        <a
          href={disableDraftUrl}
          className="underline transition-colors duration-200 hover:text-cyan"
        >
          Click here
        </a>{' '}
        to exit preview mode.
      </div>
    </div>
  )
}
