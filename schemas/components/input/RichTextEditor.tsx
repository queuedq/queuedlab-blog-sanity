import { normalizeBlock } from '@sanity/block-tools'
import { PortableTextEditor } from '@sanity/portable-text-editor'
import { Inline, Stack, Switch, Text } from '@sanity/ui'
import { useState } from 'react'
import { BlockEditor } from 'sanity'

import { handleMarkdownPaste } from './handleMarkdownPaste'
import { htmlPastePatch } from './htmlParser'

export function RichTextEditor(props) {
  const [markdownPaste, setMarkdownPaste] = useState(false)

  return (
    <Stack space={3}>
      <BlockEditor
        {...props}
        onPaste={markdownPaste ? handleMarkdownPaste : handlePaste}
        hotkeys={{
          custom: {
            'mod+opt+1': (event, editor) => {
              PortableTextEditor.toggleBlockStyle(editor, 'h1')
            },
            'mod+opt+2': (event, editor) => {
              PortableTextEditor.toggleBlockStyle(editor, 'h2')
            },
            'mod+opt+3': (event, editor) => {
              PortableTextEditor.toggleBlockStyle(editor, 'h3')
            },
            'mod+opt+4': (event, editor) => {
              PortableTextEditor.toggleBlockStyle(editor, 'h4')
            },
            'mod+opt+5': (event, editor) => {
              PortableTextEditor.toggleBlockStyle(editor, 'h5')
            },
            'mod+opt+6': (event, editor) => {
              PortableTextEditor.toggleBlockStyle(editor, 'h6')
            },
            'mod+opt+0': (event, editor) => {
              PortableTextEditor.toggleBlockStyle(editor, 'normal')
            },
          },
        }}
      />
      <Inline space={2}>
        <Switch
          label={`Markdown paste (${markdownPaste ? 'on' : 'off'})`}
          onChange={() => setMarkdownPaste(!markdownPaste)}
          checked={markdownPaste}
          />
        <Text>Markdown paste</Text>
      </Inline>
    </Stack>
  )
}

function handlePaste(input) {
  return undefined

  // https://www.sanity.io/docs/customizing-the-portable-text-editor
  const { event, schemaTypes, path } = input
  const text = event.clipboardData.getData('text')
  const html = event.clipboardData.getData('text/html')
  const json = event.clipboardData.getData('application/json')
  const pt = event.clipboardData.getData('application/x-portable-text')
  // console.log(text)
  // console.log(html)
  // console.log(json)
  // console.log(pt)

  if (!html) {
    // This code deals with Sanity bug that removes contiguous whitespaces and line breaks...
    // ref: https://github.com/sanity-io/sanity/issues/1814#issuecomment-858799468
    // It seems that Sanity removes contiguous whitespaces in htmlToBlock().
    // https://github.com/sanity-io/sanity/issues/3977
    return {
      insert: [
        // TODO: fix type issue (probably sanity is responsible for it)
        normalizeBlock({
          _type: 'block',
          // @ts-ignore
          children: [{ _type: 'span', text }],
        }),
      ],
      path,
    }
  }

  return htmlPastePatch(html, schemaTypes, path)
}
