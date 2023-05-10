import Navbar from './components/Navbar'
import './globals.css'
import ChatContextProvider from './context/ChatContext'
import { Open_Sans } from 'next/font/google'

export const metadata = {
  title: 'AI English Coach | Ofek Sror',
  description: 'A web-app designed to help you improve your English skills through interactive AI-powered conversations!',
}

const openSans = Open_Sans({ subsets: ['latin'] });

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Navbar />
        
        <ChatContextProvider>
          {children}
        </ChatContextProvider>
        
      </body>
    </html>
  )
}

export default RootLayout;