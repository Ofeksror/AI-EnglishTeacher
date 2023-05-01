import Navbar from './components/Navbar'
import './globals.css'

import { ChatContextProvider } from './context/newChatContext'

export const metadata = {
  title: 'Homepage',
  description: 'Description',
}

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html lang="en">
      <body>

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