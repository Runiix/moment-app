import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
   title: 'Moment- Movie Entertainment',
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <head>
            <meta
               name="description"
               content="Moment-app Movie Entertainment application, 2024, Germany, created by ruben liebert"
            />
         </head>
         <body className={inter.className}>{children}</body>
      </html>
   );
}
