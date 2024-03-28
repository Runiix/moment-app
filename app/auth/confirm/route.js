import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request){
    const {searchParams}= new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')
    const next= searchParams.get('next')

    if(token_hash && type){
        const cookieStore= cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            {
                cookies: {
                    get(name){
                        return cookieStore.get(name)?.value
                    },
                    set(name, value, options){
                        cookieStore.set({name, value, ...options})
                    },
                    remove(name, options){
                        cookieStore.set({name, value: '', ...options})
                    }
                }
            },
            {
                headers: {
                    'Access-Control-Allow-Origin': 'http://127.0.0.1:3000'
                }
            }
        )
    
        const {error}= await supabase.auth.verifyOtp({
            type,token_hash
        })
        if(!error){
            console.log(next)
            return NextResponse.redirect(next)
        }
    }

    return NextResponse.redirect('/error')
}