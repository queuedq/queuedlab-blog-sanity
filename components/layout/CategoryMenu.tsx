import Link from "next/link"

// TODO: Get link list from settings
// TODO: Highlight current category link
export default function Navbar() {
  return (
    <nav className="flex gap-8 mb-8 text-sm font-semibold text-gray-400 ">
      <Link href="/" className="hover:underline text-gray-900">All Posts</Link>
      <Link href="/" className="hover:underline">PS</Link>
      <Link href="/" className="hover:underline">CS & Math</Link>
      <Link href="/" className="hover:underline">Life</Link>
      <Link href="/" className="hover:underline">Puzzle</Link>
    </nav>
  )
}
