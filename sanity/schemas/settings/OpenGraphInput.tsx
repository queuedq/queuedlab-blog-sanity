import { Skeleton, Stack } from '@sanity/ui'
import React, { lazy, Suspense, useDeferredValue } from 'react'
import { type ObjectInputProps } from 'sanity'
import styled from 'styled-components'

import { height, width } from '@/components/OpenGraphImage'

const OpenGraphPreview = lazy(() => import('./OpenGraphPreview'))

const RatioSkeleton = styled(Skeleton).attrs({
  radius: 3,
  overflow: 'hidden',
})`
  aspect-ratio: ${width} / ${height};
  height: 100%;
  width: 100%;
`

const fallback = <RatioSkeleton animated />

export default function OpenGraphInput(props: ObjectInputProps) {
  const value = useDeferredValue(props.value)
  return (
    <Stack space={2}>
      <Suspense fallback={fallback}>
        {value ? <OpenGraphPreview {...(value as any)} /> : fallback}
      </Suspense>
      {props.renderDefault(props)}
    </Stack>
  )
}
