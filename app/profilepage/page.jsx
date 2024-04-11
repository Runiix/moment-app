import Nav from '../components/Nav';
import ProfileBanner from '../components/ProfileBanner';
import { supabaseServer } from '../utils/supabaseServerClient';
import ProfileInfo from '../components/ProfileInfo';

export default async function ProfilePage() {
   const {
      data: { user },
   } = await supabaseServer.auth.getUser();

   return (
      <main className="font-doppio">
         <Nav />
         <ProfileBanner user={user} />
         <ProfileInfo user={user} />
      </main>
   );
}
