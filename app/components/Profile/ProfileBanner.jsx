'use client';
import Image from 'next/image';
import { Cameraswitch, Person, Settings } from '@mui/icons-material';
import { supabase } from '../../utils/supabaseClient';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GridLoader } from 'react-spinners';
import moviegrid from '/assets/images/MovieGrid.png';
import { useRouter } from 'next/navigation';

export default function ProfileBanner({
   paramusername,
   paramuserid,
   user,
   username,
   createdat,
   changeprofile = true,
}) {
   const userName = username;
   const joinDate = createdat;
   const [profilePicUrl, setProfilePicUrl] = useState('');
   const [bannerUrl, setBannerUrl] = useState('');
   const [loading, setLoading] = useState(true);
   const router = useRouter();

   useEffect(() => {
      setLoading(true);
      if (paramuserid === user.id) {
         getProfilePictureUrl(user.id);
         getProfileBannerUrl(user.id);
      } else {
         getProfileBannerUrl(paramuserid);
         getProfilePictureUrl(paramuserid);
      }
      setLoading(false);
   }, []);

   async function addOrChangeProfilePictures(event) {
      try {
         const file = event.target.files[0];
         const {
            data: { user },
         } = await supabase.auth.getUser();

         if (!user) {
            throw new Error('User not authenticated for Photo upload!');
         }
         const filePath = `/${user.id}/ProfilePicture/ProfilePic.jpg`;

         const { data: listData, error: listError } = await supabase.storage
            .from('profileimages')
            .list(user?.id + '/', {
               limit: 1,
               offset: 0,
               sortBy: { column: 'name', order: 'asc' },
            });
         if (listData.length === 0) {
            const { error: insertError } = await supabase.storage
               .from('profileimages')
               .upload(filePath, file);
            router.refresh;
            if (insertError) {
               console.error(insertError);
            }
         } else {
            const { error: updateError } = await supabase.storage
               .from('profileimages')
               .update(filePath, file, {
                  cacheControl: '3600',
                  upsert: true,
               });
            if (updateError)
               console.error('Error updating Profile Pic: ', updateError);
         }
      } catch (err) {
         console.error(err);
      }
   }
   async function addOrChangeProfileBanner(event) {
      try {
         const file = event.target.files[0];
         const {
            data: { user },
         } = await supabase.auth.getUser();

         if (!user) {
            throw new Error('User not authenticated for Photo upload!');
         }
         const filePath = `/${user.id}/ProfileBanner/ProfileBanner.jpg`;

         const { data: listData, error: listError } = await supabase.storage
            .from('profileimages')
            .list(user?.id + '/ProfileBanner', {
               limit: 1,
               offset: 0,
               sortBy: { column: 'name', order: 'asc' },
            });
         if (listData.length === 0) {
            const { error: insertError } = await supabase.storage
               .from('profileimages')
               .upload(filePath, file);
            router.refresh;
            if (insertError) {
               console.error(insertError);
            }
         } else {
            const { error: updateError } = await supabase.storage
               .from('profileimages')
               .update(filePath, file, {
                  cacheControl: '3600',
                  upsert: true,
               });
            if (updateError)
               console.error('Error updating Profile Banner: ', updateError);
         }
      } catch (err) {
         console.error(err);
      }
   }

   async function getProfilePictureUrl(userId) {
      const { data: listData, error: listError } = await supabase.storage
         .from('profileimages')
         .list(user?.id + '/ProfilePicture', {
            limit: 1,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
         });
      if (listData.length !== 0) {
         const { data, error } = await supabase.storage
            .from('profileimages')
            .createSignedUrl(
               `${userId}/ProfilePicture/ProfilePic.jpg`,
               60 * 60,
               { transform: { width: 100, height: 100, quality: 50 } }
            );
         if (error) {
            console.error('Error generating signed URL', error);
            return null;
         } else {
            setProfilePicUrl(data.signedUrl);
         }
      }
   }

   async function getProfileBannerUrl(userId) {
      const { data: listData, error: listError } = await supabase.storage
         .from('profileimages')
         .list(user?.id + '/ProfileBanner', {
            limit: 1,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
         });
      if (listData.length !== 0) {
         const { data, error } = await supabase.storage
            .from('profileimages')
            .createSignedUrl(
               `${userId}/ProfileBanner/ProfileBanner.jpg`,
               60 * 60,
               { transform: { width: 1280, height: 720, quality: 50 } }
            );
         if (error) {
            console.error('Error generating signed URL', error);
            return null;
         } else {
            setBannerUrl(data.signedUrl);
         }
      }
   }

   return (
      <div>
         {loading ? (
            <div className="w-full h-[28rem] flex items-center justify-center">
               <GridLoader color="#16A34A" />{' '}
            </div>
         ) : (
            <div className="h-96">
               {bannerUrl === '' ? (
                  <Image
                     priority={true}
                     src={moviegrid}
                     alt="profileBanner"
                     className="z-0 object-cover w-full h-96"
                  />
               ) : (
                  <Image
                     src={bannerUrl}
                     alt="profileBanner"
                     className="z-0 object-cover w-full h-96"
                     height={500}
                     width={1920}
                     priority
                  />
               )}

               <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-t from-gray-900 via-gray-900/0 to-gray-900/0"></div>
               <div
                  className={`relative bottom-36 items-center sm:items-end flex mx-10 ${
                     changeprofile ? 'justify-around' : 'justify-center w-3/4'
                  }`}
               >
                  <div>
                     <div className="text-5xl flex items-center gap-2 sm:gap-4">
                        {changeprofile ? (
                           <label className="group">
                              {profilePicUrl === '' ? (
                                 <Person className="text-5xl hover:cursor-pointer border-2 group-hover:text-slate-400 rounded-full w-20 h-20" />
                              ) : (
                                 <Image
                                    src={profilePicUrl}
                                    alt="profileBanner"
                                    className="z-10 object-cover rounded-full w-20 border-2 bg-gray-900 hover:cursor-pointer group-hover:opacity-90 h-20"
                                    height={100}
                                    width={100}
                                 />
                              )}
                              <p className="hidden group-hover:flex absolute bottom-8 sm:bottom-14 ml-4 sm:ml-5 text-xs hover:cursor-pointer">
                                 change
                              </p>
                              <input
                                 type="file"
                                 id="photo-upload"
                                 onChange={addOrChangeProfilePictures}
                                 className="hidden"
                              />
                           </label>
                        ) : profilePicUrl === '' ? (
                           <Person className="text-5xl hover:cursor-pointer border-2 hover:text-slate-400 rounded-full " />
                        ) : (
                           <Image
                              src={profilePicUrl}
                              alt="profileBanner"
                              className="z-10 object-cover rounded-full w-20 min-w-20 border-2 bg-gray-900 h-20"
                              height={40}
                              width={40}
                           />
                        )}
                        <div className="flex flex-col">
                           <h2 className="text-xl sm:text-4xl"> {userName}</h2>
                           <p className="text-[0.5rem] sm:text-xl">
                              Member since: {joinDate}
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center">
                     <div>
                        {changeprofile && (
                           <div>
                              <label className="group flex flex-col items-center relative bottom-2 sm:left-4 sm:bottom-3 gap-2">
                                 <p className="invisible group-hover:visible relative  text-[6px] sm:text-xs text-center z-20 text-slate-100">
                                    {' '}
                                    change Profile Banner
                                 </p>
                                 <Cameraswitch className="relative z-20 hover:cursor-pointer text-slate-100 hover:text-slate-400" />

                                 <input
                                    type="file"
                                    id="banner-upload"
                                    onChange={addOrChangeProfileBanner}
                                    className="hidden"
                                 />
                              </label>
                           </div>
                        )}
                     </div>
                     <div>
                        {paramusername === username && (
                           <div>
                              <Link
                                 href="/account"
                                 aria-label="Go to Account Settings"
                              >
                                 <Settings className="text-4xl hover:text-slate-400 hover:cursor-pointer" />
                              </Link>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         )}{' '}
      </div>
   );
}
