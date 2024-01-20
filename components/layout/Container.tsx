export default function Container({ children }) {
  return (
    // The outer div prevents layout shift caused by a scrollbar.
    // Reference: https://dev.to/rashidshamloo/preventing-the-layout-shift-caused-by-scrollbars-2flp
    // (But I ended up with a different solution)
    <div className="relative ml-[calc((100vw-100%))]">
      <div className="container mx-auto max-w-3xl px-5">{children}</div>
    </div>
  )
}
