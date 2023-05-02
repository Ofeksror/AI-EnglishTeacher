import Navbar from './components/Navbar'
import './globals.css'
import ChatContextProvider from './context/ChatContext'
import { Open_Sans } from 'next/font/google'

export const metadata = {
  title: 'Homepage',
  description: 'Description',
}

const openSans = Open_Sans({ subsets: ['latin'] });

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html lang="en">
      <body className={openSans.className}>

        <header>
          <Navbar />
        </header>
        <main>
          <ChatContextProvider>
            {children}
          </ChatContextProvider>
        </main>
        
      </body>
    </html>
  )
}

export default RootLayout;