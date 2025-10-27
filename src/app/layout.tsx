import './globals.css'

export const metadata = {
  title: 'LOL App',
  description: 'Anonymous Chat App',
  icons: {
    icon: '/fav_lol.png', // points to public/icon.png
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
