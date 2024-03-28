'use client'

import { useState } from "react"
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/navigation";
import '../../assets/css/fonts.css'



export default function AuthForm(){

const [isNewUser, setIsNewUser]= useState(false);
const [email, setEmail]= useState('')
const [password, setPassword]= useState('')
const [isSigningIn, setIsSigningIn]= useState(false)
const [isSigningUp, setIsSigningUp]= useState(false)
const [resetPassword, setResetPassword]= useState(false)
const [emailData, setEmailData]= useState('')
const router= useRouter();


async function handleLogin(e){
    e.preventDefault();
    setIsSigningIn(true)
    const {data, error}= await supabase.auth.signInWithPassword({
        email, password
    })
    console.log({error, data})
    if(!error){
        router.push('/home')
    }else{
        alert('Email or Password not correct')
        setIsSigningIn(false)
    }

}

async function handleSignUp(e){
    e.preventDefault();
    const {data, error}= await supabase.auth.signUp({
        email,
        password
    })
    if(!error){
        setIsSigningUp(true)
    }
    console.log({data, error})
}

const sendResetPassword= async() => {
    try{
        const { data, error} = await supabase.auth.resetPasswordForEmail(emailData, {
            redirectTo: 'http://localhost:3000/passwordreset'
        })
    }catch(error){
        console.log(error)
    }
    alert('Email sent successfully')
}
const handleEmailChange= (e) =>{
    setEmailData(e.target.value)
}

let signInMessage= 'Sign In';

if(isSigningIn){
    signInMessage= 'Signing In'
}else if (isNewUser){
    signInMessage = 'Sign Up'
}

const signUpMessage = <p>Email sent! Check your email to confirm Sign Up</p>

    return (
        <div className="font-doppio z-10">
            {!resetPassword && <div>
                <div className="flex gap-4 mb-10">
                <h1 className="text-6xl font-bold mb-4 text-green-600">MoMent </h1>
                <h1 className="text-6xl font-bold mb-4 text-slate-100">Login</h1>
                </div>
                <form onSubmit={isNewUser ? handleSignUp : handleLogin} className="flex flex-col items-center gap-5">
                    <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="text-slate-100 w-80 py-5 pl-3 rounded-2xl bg-gray-900 border border-slate-300 text-lg hover:border-slate-100 "
                    />
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="text-slate-100 w-80 py-5 pl-3 rounded-2xl bg-gray-900 border border-slate-300 text-lg hover:border-slate-100 "
                    />
                    <button
                    type="submit"
                    className="bg-green-600 text-zinc-900 py-3 px-20 text-2xl rounded-2xl hover:text-slate-100 hover:bg-green-700"
                    >{signInMessage}</button>
                    <div>
                        {
                            isNewUser ? (
                                <>
                                    Already have an account? {' '}
                                    <button type="button" onClick= {() => setIsNewUser(false)} className="underline hover:text-green-600">Sign In</button>
                                    
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <div>
                                        Dont have an account? {' '}
                                        <button type="button" onClick= {() => setIsNewUser(true)} className="underline hover:text-green-600">Sign Up</button>  

                                    </div>
                                    <p className="underline hover:text-green-600 hover:cursor-pointer" onClick={() =>setResetPassword(!resetPassword)}>Reset Password</p>
                                </div>
                            )
                        }
                    </div>
                    {
                        isSigningUp && signUpMessage
                    }
                    
                </form>
            </div>}
            {resetPassword && 
            <div>
                <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
                    <h1 className="text-5xl font-bold mb-4 text-slate-100">Forgot Your Password?</h1>
                    <div className="flex flex-col items-center gap-2">
                        <label>Enter your Email to receive a Link for resetting your password</label>
                        <input 
                        type="email"
                        placeholder="Email"
                        value={emailData}
                        onChange={handleEmailChange}
                        className="text-slate-100 p-3 rounded bg-gray-900 border"
                        />
                        <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 py-2 px-8 rounded"
                        onClick={sendResetPassword}
                        >Send Email</button>
                        <p onClick={() => setResetPassword(!resetPassword)} className="underline hover:text-green-600 hover:cursor-pointer">Back to login?</p>
                    </div>
                </div>
            </div>}
        </div>
    )
}