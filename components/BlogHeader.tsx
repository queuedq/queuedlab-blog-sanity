import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export default function BlogHeader({
  title,
  level,
}: {
  title: string
  level: 1 | 2
}) {
  switch (level) {
    case 1:
      return (
        <header>
          <h1 className="mt-8 mb-8 text-xl font-light">
            {title}
          </h1>
        </header>
      )

    case 2:
      return (
        <header>
          <h2 className="mt-8 mb-8 text-xl font-light">
            <Link href="/" className="hover:underline">
              {title}
            </Link>
          </h2>
        </header>
      )

    default:
      throw new Error(
        `Invalid level: ${
          JSON.stringify(level) || typeof level
        }, only 1 or 2 are allowed`
      )
  }
}
