import './globals.css'
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  title: 'Usamah Rhacac Zamar | Data & Administrative Operations Specialist',
  description: 'Usamah Rhacac Zamar - Detail-oriented data and administrative operations specialist. Excel expert with 10,000+ documents managed, Microsoft Azure certified, based in Makassar, Indonesia.',
  keywords: [
    'Usamah Rhacac Zamar',
    'Rhacac Zamar', 
    'Usamah Zamar',
    'Rhacac',
    'Zamar',
    'Data Operations Specialist',
    'Administrative Support',
    'Excel Specialist',
    'Data Entry Expert',
    'Makassar',
    'Indonesia',
    'Microsoft Azure Certified',
    'Documentation Specialist'
  ],
  authors: [{ name: 'Usamah Rhacac Zamar' }],
  creator: 'Usamah Rhacac Zamar',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Usamah Rhacac Zamar | Data & Administrative Operations Specialist',
    description: 'Detail-oriented data and administrative operations specialist. Excel expert with 10,000+ documents managed, Microsoft Azure certified.',
    url: 'https://dreamy-cactus-ba57c1.netlify.app',
    siteName: 'Usamah Rhacac Zamar Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Usamah Rhacac Zamar | Data & Administrative Operations Specialist',
    description: 'Detail-oriented data and administrative operations specialist. Excel expert, Microsoft Azure certified.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body className="font-inter bg-[#0A0E27] text-white antialiased overflow-x-hidden">
        {/* NO NAVBAR HERE - Navbar is embedded in page.js */}
        {children}
      </body>
    </html>
  )
}