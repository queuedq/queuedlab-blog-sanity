import { PortableTextEditor } from '@sanity/portable-text-editor'
import { Inline, Stack, Switch, Text } from '@sanity/ui'
import { useState } from 'react'
import { BlockEditor } from 'sanity'

import { handlePaste } from './handlePaste'

export function RichTextEditor(props) {
  const [markdownPaste, setMarkdownPaste] = useState(false)

  return (
    <Stack space={3}>
      <BlockEditor
        {...props}
        onPaste={handlePaste(markdownPaste)}
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
