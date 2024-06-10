import Navbar from './NavBar';
import '@fontsource/share-tech-mono';
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='p-5'>
        <Navbar />
        {children}
      </body>
    </html>
  );
}