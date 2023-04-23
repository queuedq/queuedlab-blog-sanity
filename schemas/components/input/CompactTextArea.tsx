// Guide: https://www.sanity.io/guides/your-first-input-component-for-sanity-studio-v3
import { TextArea } from '@sanity/ui'
import { useCallback } from 'react'
import { set, unset } from 'sanity'

export default function CompactTextArea(props) {
  const {
    elementProps,
    onChange,
    value = ''
  } = props

  const handleChange = useCallback((event) => {
    const nextValue = event.currentTarget.value
    onChange(nextValue ? set(nextValue) : unset())
	}, [onChange])

  // https://www.sanity.io/ui/docs/primitive/text-areax
  return (
    <TextArea
      {...elementProps}
      onChange={handleChange}
      value={value}
    />
  )
}
