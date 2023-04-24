import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'


const UserLink = ({ link }) => {
  return (
    <Link href={link.href} className="mr-4 text-gray-500 hover:underline">
      <FontAwesomeIcon icon={link.icon} className="mr-2" width={16} />
      {link.name}
    </Link>
  )
}


// TODO: Use blog setting from Sanity
const links = [
  {
    name: 'GitHub',
    icon: faGithub,
    href: 'https://example.com',
  },
  {
    name: 'Twitter',
    icon: faTwitter,
    href: 'https://example.com',
  },
  {
    name: 'Email',
    icon: faEnvelope,
    href: 'https://example.com',
  },
  {
    name: 'RSS',
    icon: faRss,
    href: 'https://example.com',
  },
]

// TODO: Separate links on left/right
// TODO: Make it pretty on mobile
export default function Footer() {
  return (
    <footer className="py-8">
      <div>
        {links.map(link => (
          <UserLink key={link.name} link={link} />
        ))}
      </div>
    </footer>
  )
}
