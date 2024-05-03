import Link from 'next/link';

export default function Footer() {
   return (
      <footer className="bg-gray-900 w-full border-t border-slate-400">
         <div className="flex flex-col underline justify-center items-center sm:items-start sm:justify-start p-10 sm:pl-44 gap-3 flex-wrap">
            <Link href="" className="hover:text-green-600">
               Help-Center
            </Link>
            <Link href="" className="hover:text-green-600">
               Contact
            </Link>
            <Link href="" className="hover:text-green-600">
               Imprint
            </Link>
            <Link href="" className="hover:text-green-600">
               Data-Policies
            </Link>
            <Link href="" className="hover:text-green-600">
               Delete My Account
            </Link>
         </div>
      </footer>
   );
}
