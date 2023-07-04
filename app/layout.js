import ToasterContext from '@/contexts/ToasterContext'
import './globals.css'
import { Inter } from 'next/font/google'
import AuthContext from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Messenger clone',
  description: 'Messenger clone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
