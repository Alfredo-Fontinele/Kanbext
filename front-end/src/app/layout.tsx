import ModalProvider from './context/ModalContext'
import ApiProvider from './context/ApiContext'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Todo Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <ApiProvider>
          <ModalProvider>{children}</ModalProvider>
        </ApiProvider>
      </body>
    </html>
  )
}
