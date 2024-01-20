import { toHTML } from '@portabletext/to-html'
import { parseISO } from 'date-fns'
import { Feed } from 'feed'

import { faviconUrl, feedUrl, ogImageUrl, postUrl } from '@/app/utils/urls'
import { getRssComponents } from '@/components/rich-text/components'
import { loadRssFeed, loadSettings } from '@/sanity/loader/loadQuery'

export async function GET(req: Request) {
  const [settings, posts] = await Promise.all([
    loadSettings().then((x) => x.data),
    loadRssFeed().then((x) => x.data),
  ])
  const { domain, title, description, copyrightNotice } = settings
  const absolute = (url) => new URL(url, `https://${domain}/`).toString()

  // https://github.com/jpmonette/feed
  const feed = new Feed({
    title: title!,
    description: description,
    id: absolute('/'),
    link: absolute('/'),
    image: absolute(ogImageUrl(title)),
    favicon: absolute(faviconUrl),
    copyright: `${copyrightNotice}`,
    feedLinks: {
      atom: absolute(feedUrl),
    },
    author: {
      name: title,
    },
    // author: {
    //   name: 'John Doe',
    //   email: 'johndoe@example.com',
    //   link: 'https://example.com/johndoe',
    // },
  })

  const components = await getRssComponents()

  posts.forEach((post) => {
    feed.addItem({
      title: post.title!,
      id: absolute(postUrl(post.slug)),
      link: absolute(postUrl(post.slug)),
      description: post.excerpt,
      content: toHTML(post.content, { components }),
      author: [
        {
          name: title,
        },
        // {
        //   name: "Jane Doe",
        //   email: "janedoe@example.com",
        //   link: "https://example.com/janedoe"
        // },
      ],
      date: parseISO(post.date!),
      image: absolute(ogImageUrl(post.title)),
    })
  })

  return new Response(feed.atom1(), {
    status: 200,
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
    },
  })
}
