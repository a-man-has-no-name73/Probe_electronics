import './globals.css'

export const metadata = {
  title: 'Lab-in-A-Box | Student Electronics Kit',
  description: 'The ultimate combo kit: DSO138 Oscilloscope + XR2206 Function Generator. Build, test, and visualize signals like a pro.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
