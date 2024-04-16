import Nav from '../components/Nav';

export default function HomeLayout({
   children, // will be a page or nested layout
}) {
   return (
      <section>
         {/* Include shared UI here e.g. a header or sidebar */}
         <Nav />
         {children}
      </section>
   );
}
