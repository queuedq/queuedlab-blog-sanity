import BlogLayout from '../../BlogLayout'

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  return <BlogLayout category={params.slug}>{children}</BlogLayout>
}
