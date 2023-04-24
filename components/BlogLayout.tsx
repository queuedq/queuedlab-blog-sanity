import AlertBanner from 'components/AlertBanner'

export default function BlogLayout({
  preview,
  loading,
  children,
}: {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <AlertBanner preview={preview} loading={loading} />
        <div className="container max-w-3xl mx-auto px-5">
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}
