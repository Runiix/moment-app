
import DiscoverSlider from "../components/DiscoverSlider";
import Nav from "../components/Nav";
import { Favorite, NotInterested, AddCircleOutline, HeartBroken } from "@mui/icons-material";


export default function Discover(){

    return(
        <main className="bg-gray-900 text-slate-100 font-doppio ">
            <Nav />
            <DiscoverSlider />

        </main>
    )
}