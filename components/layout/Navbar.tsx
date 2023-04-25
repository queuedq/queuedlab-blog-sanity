import Link from "next/link"

// TODO: Get link list from settings
// TODO: Add about page
// TODO: Highlight current page link
export default function Navbar() {
  return (
    <nav className="flex gap-4 text-sm text-gray-700">
      <Link href="/" className="hover:underline">Blog</Link>
      <Link href="about" className="hover:underline">About</Link>
    </nav>
  )
}
