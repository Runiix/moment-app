import movieCollage from '/assets/images/movie-poster-background-p5qblffj7cvswl5g.jpg';
import Image from 'next/image';
import { Person } from '@mui/icons-material';

export default function ProfileBanner({ user, username, createdat }) {
   const userName = username;
   const joinDate = createdat;

   return (
      <div className="h-1/5">
         <Image
            priority={true}
            src={movieCollage}
            alt="profileBanner"
            className="z-0 object-cover  w-full h-96"
         />
         <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-t from-gray-900 via-gray-900/0 to-gray-900/0"></div>
         <div className="flex flex-col ml-96 relative bottom-28">
            <div className="text-5xl flex items-center gap-4">
               <Person className="text-5xl" />
               <h2> {userName}</h2>
            </div>
            <p>Member since: {joinDate}</p>
         </div>
      </div>
   );
}
