import Link from "next/link"

interface NavbarProps {
  header: React.ReactElement
}

// TODO: Get link list from settings
// TODO: Add about page
// TODO: Highlight current page link
export default function Navbar({ header }: NavbarProps) {
  return (
    <header className="flex justify-between items-center py-8">
      {header}
      <nav className="flex gap-4 text-sm">
        <Link href="/" className="hover:underline">Blog</Link>
        <Link href="about" className="hover:underline">About</Link>
      </nav>
    </header>
  )
}
