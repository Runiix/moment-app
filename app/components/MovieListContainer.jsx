import Image from 'next/image';
import Link from 'next/link';
import MovieGrid from '../../assets/images/MovieGrid.png';

export default function MovieListContainer({
   movielist_link,
   movielist_title,
   movielist_description,
   /*    movielist_images,
    */
}) {
   return (
      <div className="">
         <Link href={movielist_link}>
            <div className="pr-32 flex h-44 rounded-lg border border-slate-400">
               <div className="grid grid-cols-2 w-32 h-full object-cover rounded-lg">
                  <Image
                     src={MovieGrid}
                     alt="MovieListImage 1"
                     className="object-cover w-full h-full rounded-tl-lg"
                  />
                  <Image
                     src={MovieGrid}
                     alt="MovieListImage 2"
                     className="object-cover w-full h-full "
                  />
                  <Image
                     src={MovieGrid}
                     alt="MovieListImage 3"
                     className="object-cover w-full h-full rounded-bl-lg"
                  />
                  <Image
                     src={MovieGrid}
                     alt="MovieListImage 4"
                     className="object-cover w-full h-full"
                  />
               </div>
               <div className="m-3 ml-5 flex flex-col gap-4">
                  <h2 className="text-xl">{movielist_title}</h2>
                  <p>{movielist_description}</p>
               </div>
            </div>
         </Link>
      </div>
   );
}
