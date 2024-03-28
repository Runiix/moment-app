import Link from "next/link";

export default function Footer(){

    return(
        <footer className="bg-gray-900 w-full">
            <div className="flex flex-col underline justify-start p-10 pl-44 gap-3 flex-wrap">
                <Link href="" className="hover:text-green-600">Help-Center</Link>
                <Link href="" className="hover:text-green-600">Contact</Link>
                <Link href="" className="hover:text-green-600">Imprint</Link>
                <Link href="" className="hover:text-green-600">Data-Polics</Link>
                <Link href="" className="hover:text-green-600">Delete My Account</Link>
            </div>
        </footer>
    )
}