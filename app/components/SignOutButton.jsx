

export default function SignOutButton(){
    return(
        <form action="/auth/signout" method="post">
            <button type="submit" className="text-zinc-900 bg-green-600 font-bold my-2 py-2 px-4 rounded hover:bg-green-700 hover:text-slate-100">Sign Out</button>
            
        </form>
    )
}