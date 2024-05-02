'use client';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PasswordReset() {
   const [data, setData] = useState({ password: '', confirmPassword: '' });
   const [showPassword, setShowPassword] = useState(false);
   const router = useRouter();

   const confirmPasswords = async () => {
      const { password, confirmPassword } = data;
      if (password !== confirmPassword) {
         return alert('Passwords are different!');
      }
      const { resetData, error } = await supabase.auth.updateUser({
         password: data.password,
      });
      if (error) console.error(error);
      alert('Password changed successfully');
      router.replace('/home');
   };

   const handlePasswordChange = (e) => {
      setData((prev) => ({
         ...prev,
         password: e.target.value,
      }));
   };
   const handleConfirmPasswordChange = (e) => {
      setData((prev) => ({
         ...prev,
         confirmPassword: e.target.value,
      }));
   };

   return (
      <main className="bg-gray-900 min-h-screen flex flex-col gap-2 items-center justify-center font-doppio">
         <h1 className="text-5xl font-bold mb-4 text-white text-center">
            Reset Your Password
         </h1>
         <div className="flex flex-col gap-2 mb-4">
            <label>Enter your new Password</label>
            <div className="flex gap-4 items-center border border-slate-300 text-lg hover:border-slate-100 rounded-xl">
               <input
                  type={showPassword ? 'text' : 'password'}
                  value={data?.password}
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  className="text-slate-100 w-80 py-5 pl-3 rounded-2xl bg-gray-900 bg-opacity-80 border-r-none active:border-r-none border-slate-300 text-lg hover:border-slate-100 "
               />
               <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="pr-4 hover:cursor-pointer hover:text-green-600 text-slate-400"
               >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
               </div>
            </div>
         </div>
         <div className="flex flex-col gap-2 mb-4">
            <label>Confirm your new Password</label>
            <div className="flex gap-4 items-center border border-slate-300 text-lg hover:border-slate-100 rounded-xl">
               <input
                  type={showPassword ? 'text' : 'password'}
                  value={data?.confirmPassword}
                  placeholder="Confrm Password"
                  onChange={handleConfirmPasswordChange}
                  className="text-slate-100 w-80 py-5 pl-3 rounded-2xl bg-gray-900 bg-opacity-80 border-r-none active:border-r-none border-slate-300 text-lg hover:border-slate-100 "
               />
               <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="pr-4 hover:cursor-pointer hover:text-green-600 text-slate-400"
               >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
               </div>
            </div>
         </div>
         <button
            type="submit"
            onClick={confirmPasswords}
            className="bg-green-600 text-zinc-900 py-3 px-20 text-2xl rounded-2xl hover:text-slate-100 hover:bg-green-700"
         >
            Reset Password
         </button>
         <Link
            href="/loginpage"
            className="underline hover:text-green-600 hover:cursor-pointer"
         >
            Back to login?
         </Link>
      </main>
   );
}
