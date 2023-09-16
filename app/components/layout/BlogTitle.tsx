'use client'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function BlogTitle({ title }: { title: string }) {
  const segment = useSelectedLayoutSegment()

  if (segment == null) {
    return (
      <h1 className="text-xl font-light text-gray-800">
        <Link href="/" className="hover:underline">
          {title}
        </Link>
      </h1>
    )
  } else {
    return (
      <div className="text-xl font-light text-gray-800">
        <Link href="/" className="hover:underline">
          {title}
        </Link>
      </div>
    )
  }
}
