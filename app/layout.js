import './globals.css'
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['300','400','500','600','700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  title: 'Usamah Rhacac Zamar | Data & Administrative Operations Specialist',
  description:
    'Detail-oriented data and administrative operations specialist with strong Excel-based workflows and documentation experience.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-inter bg-[#0A0E27] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
