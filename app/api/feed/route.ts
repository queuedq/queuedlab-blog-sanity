import { toHTML } from '@portabletext/to-html'
import { parseISO } from 'date-fns'
import { Feed } from 'feed'

import { feedUrl, ogImageUrl, postUrl } from '@/app/utils/urls'
import { loadRssFeed, loadSettings } from '@/sanity/loader/loadQuery'

export async function GET(req: Request) {
  const [settings, posts] = await Promise.all([
    loadSettings().then((x) => x.data),
    loadRssFeed().then((x) => x.data),
  ])

  // https://github.com/jpmonette/feed
  const feed = new Feed({
    title: settings.title!,
    description: settings.description,
    id: `https://${settings.domain}/`,
    link: `https://${settings.domain}/`,
    image: ogImageUrl(settings.domain, settings.title),
    favicon: `https://${settings.domain}/favicon/favicon.ico`,
    copyright: `${settings.copyrightNotice}`,
    feedLinks: {
      atom: feedUrl(settings.domain),
    },
    author: {
      name: settings.title,
    },
    // author: {
    //   name: 'John Doe',
    //   email: 'johndoe@example.com',
    //   link: 'https://example.com/johndoe',
    // },
  })

  posts.forEach((post) => {
    feed.addItem({
      title: post.title!,
      id: postUrl(settings.domain, post.slug),
      link: postUrl(settings.domain, post.slug),
      description: post.excerpt,
      content: toHTML(post.content), // TODO: support custom component rendering
      author: [
        {
          name: settings.title,
        },
        // {
        //   name: "Jane Doe",
        //   email: "janedoe@example.com",
        //   link: "https://example.com/janedoe"
        // },
      ],
      date: parseISO(post.date!),
      image: ogImageUrl(settings.domain, post.title),
    })
  })

  return new Response(feed.atom1(), {
    status: 200,
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
