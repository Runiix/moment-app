import AuthForm from "../components/AuthForm"
import Image from "next/image"
import heroBanner from '/assets/images/dark-vip-cinema-studio-still-life.jpg'

export default function LoginPage(){
    return(
        <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
            <div >
                <Image
                src={heroBanner}
                alt="hero banner"
                className="absolute top-0 left-0 object-cover w-screen h-screen opacity-80"/>
            </div>
            <AuthForm />
        </div>
    )
}