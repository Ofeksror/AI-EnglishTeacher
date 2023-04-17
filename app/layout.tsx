import Navbar from './components/Navbar'
import './globals.css'

export const metadata = {
  title: 'Homepage',
  description: 'Description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
