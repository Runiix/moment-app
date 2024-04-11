import { Fullscreen } from '@mui/icons-material';
import { supabaseServer } from '../utils/supabaseServerClient';
import movieCollage from '/assets/images/movie-poster-background-p5qblffj7cvswl5g.jpg';
import Image from 'next/image';

export default function ProfileBanner({ user }) {
   return (
      <div className="h-1/5">
         <Image
            priority={true}
            src={movieCollage}
            alt="profileBanner"
            className="z-0 object-cover  w-full h-96"
         />
         <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-t from-gray-900 via-gray-900/0 to-gray-900/0"></div>
      </div>
   );
}
