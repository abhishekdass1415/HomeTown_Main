import './globals.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export const metadata = {
  title: 'Hometown Furniture Admin',
  description: 'Admin panel for Hometown Furniture',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto pt-16">
              <div className="p-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}