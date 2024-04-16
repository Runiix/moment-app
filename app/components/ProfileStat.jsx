export default function ProfileStat({ name, stat, yellow, green }) {
   return (
      <div className="flex items-center text-center justify-center gap-4">
         <div
            className={`w-16 h-16 min-w-16 min-h-16 text-3xl pt-2 bg-zinc-900 text-center shadow-md shadow-black ${
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
