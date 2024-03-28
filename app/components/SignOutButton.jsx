

export default function SignOutButton(){
    return(
        <form action="/auth/signout" method="post">
            <button type="submit" className="text-green-600 bg-slate-100 font-bold my-2 py-2 px-4 rounded hover:bg-green-700 hover:text-zinc-900">Sign Out</button>
            
        </form>
    )
}