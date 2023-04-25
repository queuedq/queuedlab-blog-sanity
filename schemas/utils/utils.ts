// Usage:
// defineField({
//   name: 'my_field',
//   title: 'My field',
//   ...arrayOf(item_type.name),
// })
export function referenceArray(type: string) {
  return {
    type: 'array',
    of: [{
      type: 'reference',
      to: [{ type }],
    }],
  }
}
