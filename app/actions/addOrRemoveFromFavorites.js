'use server'

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
 
export async function addOrRemoveFromFavorites(formData){
    const movieTitle= formData.get('title')
    const isFavorited= formData.get('isFavorited')
    const cookieStore= cookies();
    console.log(movieTitle, isFavorited)

    const supabase= createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name){
                    return cookieStore.get(name)?.value
                },
                set(name){
                    cookieStore.set({name, value, ...options})
                },
                remove(name, options){
                    cookieStore.set({name, value: '', ...options})
                }
            }
        }
    )

    const {data: {user}}= await supabase.auth.getUser();

    if(!user){
        return{success: false, error: 'User is not authenticated!'}
    }
    if(isFavorited=== 'true'){
        const {error}= await supabase 
            .from('favorites')
            .delete()
            .match({user_id: user.id, movie_title: movieTitle})

        if(error){
            return{success: false, error}
        }
    }else{
        const { error: insertError } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, movie_title: movieTitle });

    if (insertError) {
        return { success: false, error: insertError.message };
    }
    }
    revalidatePath('/home')
    revalidatePath('/movies')
    revalidatePath('/favorites')

    return {success: true}
}