import { Doppio_One } from 'next/font/google';
import './globals.css';

const doppio = Doppio_One({ subsets: ['latin'], weight: ['400'] });

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
         <body className={doppio.className}>{children}</body>
      </html>
   );
}
