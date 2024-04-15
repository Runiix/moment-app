import MovieGrid from '../components/MovieGrid';
import { supabaseServer } from '../utils/supabaseServerClient';

async function getUser() {
   const { data: user, error } = await supabaseServer.auth.getUser();

   if (error) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
   }

   return user;
}

async function getData(from, to) {
   const { data, error } = await supabaseServer
      .from('Movies')
      .select('*')
      .range(from, to);
   /*       .contains('genre_ids', genre)
      .ilike('title', `%${searchQuery}%`)
      .order(sortedBy, { ascending: sortOrder }) */

   // The return value is *not* serialized
   // You can return Date, Map, Set, etc.

   if (error) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
   }
   return data;
}

export default async function movies({ query }) {
   console.log(query);
   const from = 0;
   const to = 19;
   const user = await getUser();
   const data = await getData(
      /*       query.genre,
      query.sortedBy,
      query.sortOrder,
      query.searchQuery,
      query.from,
      query.to */
      from,
      to
   );
   /*     const [searchQuery, setSearchQuery]= useState('');

    const handleSearch= (query) =>{
        setSearchQuery(query);
    } */

   return (
      <main className="min-h-screen bg-gray-900 text-white relative  font-doppio">
         {/* <Nav onSearch={handleSearch} /> */}
         <MovieGrid
            data={data}
            user={user} /* searchQuery={''}  */
            favorites={true}
         />
      </main>
   );
}
