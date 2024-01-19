import BlogLayout from '@/components/layout/BlogLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BlogLayout category="_index">{children}</BlogLayout>
}
