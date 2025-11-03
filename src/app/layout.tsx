// src/app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { ToastProvider } from '@/context/ToastContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LOL App - Anonymous Chat & Communities',
  description: 'Send anonymous messages, join communities, chat with Gen Z',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-white min-h-screen`}>
        <ToastProvider>
          <div className="max-w-md min-h-screen mx-auto bg-gray-900 shadow-xl">
            {children}
          </div>
        </ToastProvider>
      </body>
    </html>
  )
}