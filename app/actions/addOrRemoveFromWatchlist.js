'use server'

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
 
export async function addOrRemoveFromFavorites(formData){
    const movieTitle= formData.get('title')
    const isOnWatchList= formData.get('isOnWatchList')
    const cookieStore= cookies();

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
    console.log( movieTitle, user.id, "isOnWatchlist:", isOnWatchList)

    if(isOnWatchList === 'true'){
        console.log( movieTitle, user.id, "isOnWatchlist:", isOnWatchList)
        const {error} = await supabase
        .from('watchlist')
        .insert({ user_id: user.id, movie_title: movieTitle});        
        if (error) {
            console.log("error inserting Movie", error)
        }
    }else {
        console.log("removed", isOnWatchList)
        const {error}= await supabase 
            .from('watchlist')
            .delete()
            .match({user_id: user.id, movie_title: movieTitle})

        if(error){
            return{success: false, error}
        }
    }
    revalidatePath('/home')
    revalidatePath('/movies')
    revalidatePath('/favorites')

    return {success: true}
}