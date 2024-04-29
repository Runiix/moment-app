import AuthForm from '../components/Login/AuthForm';
import Image from 'next/image';
import heroBanner from '/assets/images/dark-vip-cinema-studio-still-life.jpg';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';

export default function LoginPage() {
   return (
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-slate-100">
         <Link className="absolute left-5 top-5 z-10" href="/">
            <ArrowBack className="text-slate-100 text-4xl hover:text-slate-400" />
         </Link>
         {/*          <div>
            <Image
               src={heroBanner}
               alt="hero banner"
               className="absolute top-0 left-0 object-cover w-screen h-screen opacity-80"
            />
         </div> */}
         <AuthForm />
      </div>
   );
}
