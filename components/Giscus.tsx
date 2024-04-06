'use client'
import Giscus, { Repo } from '@giscus/react'

const ClientGiscus = () => (
  // TODO: validate env vars
  <Giscus
    id="comments"
    repo={process.env.NEXT_PUBLIC_GISCUS_REPO as Repo}
    repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
    category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY}
    categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID}
    mapping="pathname"
    reactionsEnabled="0"
    emitMetadata="0"
    inputPosition="top"
    theme="light" // TODO: customize giscus theme
    lang="en"
    loading="lazy"
  />
)
export default ClientGiscus
