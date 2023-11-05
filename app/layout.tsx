import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import AboutPopUp from '@/components/ui/AboutPopUp'
// import StatusDisplay from '@/components/ui/StatusDisplay'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Source Viewer for Object Based Audio Spatialization',
  description: 'Eagle Wu 2023',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
    <body>
      <div className="w-screen h-screen">
          <AboutPopUp />
          {/* <StatusDisplay /> */}
          {children}
      </div>
    </body>
</html>
  )
}
