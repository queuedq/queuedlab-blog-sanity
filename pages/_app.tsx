import 'tailwindcss/tailwind.css'
import 'public/fonts/pretendard/pretendardvariable-dynamic-subset.css'

import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white font-sans text-gray-700">
      <Component {...pageProps} />
    </div>
  )
}
