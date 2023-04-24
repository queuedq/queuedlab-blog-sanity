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
          <h1 className="pt-8 pb-8 text-xl font-light">
            {title}
          </h1>
        </header>
      )

    case 2:
      return (
        <header>
          <div className="pt-8 pb-8 text-xl font-light">
            <Link href="/" className="hover:underline">
              {title}
            </Link>
          </div>
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
