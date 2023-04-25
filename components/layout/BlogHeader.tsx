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
        <h1 className="text-xl font-light">
          {title}
        </h1>
      )

    case 2:
      return (
        <div className="text-xl font-light">
          <Link href="/" className="hover:underline">
            {title}
          </Link>
        </div>
      )

    default:
      throw new Error(
        `Invalid level: ${
          JSON.stringify(level) || typeof level
        }, only 1 or 2 are allowed`
      )
  }
}
