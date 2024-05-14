export default function ProfileStat({ name, stat, yellow, green }) {
   return (
      <div className="flex items-center text-center justify-center gap-4">
         <div
            className={`h-12 w-12 min-h-12 min-w-12 sm:w-16 sm:h-16 sm:min-w-16 sm:min-h-16 text-xl sm:text-3xl pt-1 sm:pt-2 bg-zinc-900 text-center shadow-lg shadow-black ${
               stat <= yellow
                  ? 'border-red-600'
                  : stat <= green
                  ? 'border-yellow-400'
                  : 'border-green-600'
            } border-4 rounded-full`}
         >
            {stat}
         </div>{' '}
         <p>{name}</p>
      </div>
   );
}
