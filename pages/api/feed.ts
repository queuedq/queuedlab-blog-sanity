import { toPlainText } from '@portabletext/react'
import { toHTML } from '@portabletext/to-html'
import { parseISO } from 'date-fns'
import { Feed } from 'feed'
import { getAllPostsWithContent, getSettings } from 'lib/sanity.client'
import { ogImageUrl, pageUrl } from 'lib/urls'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function feedApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // TODO: Use only recent posts
  const [settings, posts] = await Promise.all([
    getSettings(),
    getAllPostsWithContent(),
  ])

  // https://github.com/jpmonette/feed
  const feed = new Feed({
    title: settings.title,
    description: toPlainText(settings.description),
    id: `https://${settings.domain}/`,
    link: `https://${settings.domain}/`,
    image: ogImageUrl(settings.domain, settings.title),
    favicon: `https://${settings.domain}/favicon/favicon.ico`,
    copyright: `${settings.copyrightNotice}`,
    feedLinks: {
      atom: 'https://example.com/feed',
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
      title: post.title,
      id: pageUrl(settings.domain, post.slug),
      link: pageUrl(settings.domain, post.slug),
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
      date: parseISO(post.date),
      image: ogImageUrl(settings.domain, post.title),
    })
  })

  res.setHeader('Content-Type', 'text/xml')
  res.send(feed.atom1())
}