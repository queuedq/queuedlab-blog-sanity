import Link from 'next/link'

// TODO: Get link list from settings
// TODO: Highlight current category link
export default function Navbar() {
  return (
    <nav className="mb-8 flex flex-wrap gap-x-4 text-sm font-semibold text-gray-400 sm:gap-x-8 ">
      <Link href="/" className="text-gray-900 hover:underline">
        All Posts
      </Link>
      <Link href="/" className="hover:underline">
        PS
      </Link>
      <Link href="/" className="hover:underline">
        CS & Math
      </Link>
      <Link href="/" className="hover:underline">
        Life
      </Link>
      <Link href="/" className="hover:underline">
        Puzzle
      </Link>
    </nav>
  )
}
