import './globals.css'
import Navbar from './components/Navbar'
import { AuthProvider } from './components/AuthProvider'

export const metadata = {
  title: 'Rentify - Find Your Next Home',
  description: 'Rent apartments, self-contains, and flats directly from homeowners',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}