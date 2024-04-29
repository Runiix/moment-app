import Nav from '../components/Nav/Nav';

export default function Help() {
   return (
      <main className="bg-gray-900 text-slate-100 font-doppio ">
         <Nav search={false} />
         <h1 className="absolute left-1/2 text-4xl top-20">Help</h1>
      </main>
   );
}
