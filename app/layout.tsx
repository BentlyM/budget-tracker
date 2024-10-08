import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Metadata } from 'next'
import RootProviders from '@/components/providers/RootProviders'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: "Budget Tracker",
  description: "Track your budget!"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider afterSignOutUrl={'/sign-in'}>
      <html 
      lang="en"
      className='dark'
      style={{
        colorScheme: "dark"
      }}
      >
        <body>
          <Toaster richColors position='bottom-right' />
          <RootProviders>{children}</RootProviders>
        </body>
      </html>
    </ClerkProvider>
  )
}