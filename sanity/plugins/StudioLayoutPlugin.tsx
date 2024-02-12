import { useEffect } from 'react'
import { useRouter } from 'sanity/router'

// Redirect to post list when accessing Sanity Studio Structure Tool,
// which doesn't open any panes by default -> bad for user experience.
// I found this snippet from Sanity Slack and modified it.
// API references:
// - https://www.sanity.io/docs/studio-components
// - https://www.sanity.io/docs/reference/api/sanity/router/useRouter
const Layout = (props) => {
  const router = useRouter()

  useEffect(() => {
    const structure = router?.state?.structure
    if (structure && Object.keys(structure).length === 0) {
      router.navigate({
        tool: 'structure',
        structure: {
          panes: [[{ id: 'post' }]],
        },
      })
    }
  })

  return props.renderDefault(props)
}

export default Layout
