'use server'

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
 
export async function fetchMovies(){
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

    const {data, error}= await supabase
        .from("Movies")
        .select("*")
    if(error) console.error("Error fetching Movies", error)
    const allMovieData= data;

    const favoriteMovies= async () =>{
        const {data: favoriteData, error: favoriteError}= await supabase
            .from("favorites")
            .select("movie_title")
            .eq("user_id", currentUser.user.id)
        if(favoriteError) console.error("Error getting Favorites")
        const favoriteFilter= favoriteData
    }
    
    const watchlistMovies= async () =>{
        const {data: watchlistData, error: watchlistError}= await supabase
            .from("watchlist")
            .select("movie_title")
            .eq("user_id", currentUser.user.id)
        if(watchlistError) console.error("Error getting Favorites")
        const watchlistFilter= watchlistData
    }

    const dislikeMovies= async () =>{
        const {data: dislikeData, error: dislikeError}= await supabase
            .from("dislikes")
            .select("movie_title")
            .eq("user_id", currentUser.user.id)
        if(dislikeError) console.error("Error getting Favorites")
        const dislikeFilter= dislikeData
    }
    
   
    revalidatePath('/home')
    revalidatePath('/movies')
    revalidatePath('/favorites')

    return {success: true}
}