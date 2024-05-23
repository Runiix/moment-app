'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useRouter } from 'next/navigation';
import '../../../assets/css/fonts.css';
import { GridLoader } from 'react-spinners';

export default function AuthForm() {
   const [isNewUser, setIsNewUser] = useState(false);
   const [displayName, setDisplayName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isSigningIn, setIsSigningIn] = useState(false);
   const [isSigningUp, setIsSigningUp] = useState(false);
   const [resetPassword, setResetPassword] = useState(false);
   const [emailData, setEmailData] = useState('');
   const router = useRouter();

   useEffect(() => {
      setDisplayName(email.split('@')[0]);
   }, [email]);

   async function handleLogin(e) {
      e.preventDefault();
      setIsSigningIn(true);
      const { error } = await supabase.auth.signInWithPassword({
         email,
         password,
      });
      if (!error) {
         router.push('/home');
      } else {
         alert('Email or Password not correct');
         setIsSigningIn(false);
      }
   }

   function validatePassword(password) {
      const passwordRegex =
         /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{10,}$/;
      return passwordRegex.test(password);
   }

   async function handleSignUp(e) {
      e.preventDefault();
      if (!validatePassword(password)) {
         alert(
            'Password must be at least 10 characters long and contain at least one capital letter, one number, and one special symbol.'
         );
         return;
      }
      const { error } = await supabase.auth.signUp({
         email,
         password,
         options: {
            data: {
               displayName: displayName,
            },
         },
      });
      if (!error) {
         setIsSigningUp(true);
      }
   }

   const sendResetPassword = async () => {
      try {
         const { error } = await supabase.auth.resetPasswordForEmail(
            emailData,
            {
               redirectTo: 'https://moment-movies.vercel.app/passwordreset',
            }
         );
         if (error) console.error('Error sending reset Email');
      } catch (error) {
         console.error(error);
      }
      alert('Email sent successfully');
   };

   const handleEmailChange = (e) => {
      setEmailData(e.target.value);
   };

   let signInMessage = 'Sign In';

   if (isSigningIn) {
      signInMessage = 'Signing In';
   } else if (isNewUser) {
      signInMessage = 'Sign Up';
   }

   const signUpMessage = (
      <p className="text-green-600">
         Email sent! Check your email to confirm Sign Up
      </p>
   );

   return (
      <div className=" z-10">
         {!resetPassword && (
            <div>
               <div className="flex gap-4 mb-6 sm:mb-10 text-5xl sm:text-6xl font-bold ">
                  <h1 className="mb-4 text-green-600">MoMent </h1>
                  <h1 className="mb-4 text-slate-100">Login</h1>
               </div>
               <form
                  onSubmit={isNewUser ? handleSignUp : handleLogin}
                  className="flex flex-col items-center gap-5"
               >
                  <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Email"
                     className="text-slate-100 w-80 py-5 pl-3 rounded-2xl bg-gray-900 border bg-opacity-80 border-slate-300 text-lg hover:border-slate-100 "
                  />
                  <input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Password"
                     className="text-slate-100 w-80 py-5 pl-3 rounded-2xl bg-gray-900 bg-opacity-80 border border-slate-300 text-lg hover:border-slate-100 "
                  />
                  <button
                     type="submit"
                     className="bg-green-600 text-zinc-900 py-3 flex gap-4 justify-around items-center px-20  rounded-2xl hover:text-slate-100 hover:bg-green-700"
                  >
                     <p className="text-2xl">{signInMessage} </p>
                     {isSigningIn && (
                        <div className="">
                           <GridLoader
                              color="#000000"
                              margin={0}
                              size={12}
                              padding={0}
                           />{' '}
                        </div>
                     )}
                  </button>
                  <div>
                     {isNewUser ? (
                        <>
                           Already have an account?{' '}
                           <button
                              type="button"
                              onClick={() => setIsNewUser(false)}
                              className="underline hover:text-green-600"
                           >
                              Sign In
                           </button>
                        </>
                     ) : (
                        <div className="flex flex-col items-center justify-center">
                           <div>
                              Dont have an account?{' '}
                              <button
                                 type="button"
                                 onClick={() => setIsNewUser(true)}
                                 className="underline hover:text-green-600"
                              >
                                 Sign Up
                              </button>
                           </div>
                           <p
                              className="underline hover:text-green-600 hover:cursor-pointer"
                              onClick={() => setResetPassword(!resetPassword)}
                           >
                              Reset Password
                           </p>
                        </div>
                     )}
                  </div>
                  {isSigningUp && signUpMessage}
               </form>
            </div>
         )}
         {resetPassword && (
            <div>
               <div className="min-h-screen flex flex-col gap-3 items-center justify-center text-center">
                  <h1 className="text-5xl font-bold  text-slate-100">
                     Forgot Your Password?
                  </h1>
                  <div className="flex flex-col items-center gap-4">
                     <label className="mb-4 sm:mb-10">
                        Enter your Email to receive a Link for resetting your
                        password
                     </label>
                     <input
                        type="email"
                        placeholder="Email"
                        value={emailData}
                        onChange={handleEmailChange}
                        className="text-slate-100 w-80 py-5 pl-3 rounded-2xl bg-gray-900 border bg-opacity-80 border-slate-300 text-lg hover:border-slate-100 "
                     />
                     <button
                        type="submit"
                        className="bg-green-600 text-zinc-900 py-3 px-20 text-2xl rounded-2xl hover:text-slate-100 hover:bg-green-700"
                        onClick={sendResetPassword}
                     >
                        Send Email
                     </button>
                     <p
                        onClick={() => setResetPassword(!resetPassword)}
                        className="underline hover:text-green-600 hover:cursor-pointer"
                     >
                        Back to login?
                     </p>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
