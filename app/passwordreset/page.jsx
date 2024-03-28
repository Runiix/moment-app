'use client'
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PasswordReset(){
        
    const [data, setData]= useState({password: '', confirmPassword: ''})
    const [showPassword, setShowPassword]= useState(false)
    const router= useRouter();

    const confirmPasswords = async () => {
        const {password, confirmPassword}= data;
        if(password !== confirmPassword){
            return alert("Passwords are different!")
        }
        const {resetData, error}= await supabase.auth.updateUser({
            password: data.password
        })

        if(resetData){
            router.push('/')
        }
        if(error) console.log(error)
    }

    const handlePasswordChange= (e) =>{
        setData(prev =>({
            ...prev,
            password: e.target.value,
        }))
    }
    const handleConfirmPasswordChange= (e) =>{
        setData(prev =>({
            ...prev,
            confirmPassword: e.target.value,
        }))
    }
    
    return (
        <div  className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold mb-4 text-white">Reset Your Password</h1>
            <div className="flex flex-col mb-4">
                <label>Enter your new Password</label>
                <div className="flex items-center">
                    <input 
                    type={showPassword? 'text' : 'password'}
                    value={data?.password}
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    className="text-white p-3 rounded bg-gray-900 border"
                    />
                    <div onClick={() =>setShowPassword(!showPassword)} className="relative right-10 hover:cursor-pointer hover:text-blue-600">
                    {
                        showPassword? <Visibility/> : <VisibilityOff />
                    }
                    </div>
                </div>
            </div>
            <div className="flex flex-col mb-4">
                <label>Confirm your new Password</label>
                <div className="flex items-center">
                    <input 
                    type={showPassword? 'text' : 'password'}
                    value={data?.confirmPassword}
                    placeholder="Confrm Password"
                    onChange={handleConfirmPasswordChange}
                    className="text-white p-3 rounded bg-gray-900 border"
                    />
                    <div onClick={() =>setShowPassword(!showPassword)} className="relative right-10 hover:cursor-pointer hover:text-blue-600">
                    {
                        showPassword? <Visibility/> : <VisibilityOff />
                    }
                    </div>
                </div>
            </div>
            <button
            type="submit"
            onClick={confirmPasswords}
            className="bg-red-600 hover:bg-red-700 py-2 px-8 rounded"
            >Reset Password
            </button>   
            <Link href="/loginpage" className="underline hover:text-red-600 hover:cursor-pointer">Back to login?</Link>
        </div>
    );
}