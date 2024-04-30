'use client';
import movieCollage from '/assets/images/movie-poster-background-p5qblffj7cvswl5g.jpg';
import Image from 'next/image';
import { Cameraswitch, Person, Settings } from '@mui/icons-material';
import { supabase } from '../../utils/supabaseClient';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GridLoader } from 'react-spinners';

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
         console.log(file);
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
         console.log('ListData: ', listData);
         if (listData.length === 0) {
            const { error: insertError } = await supabase.storage
               .from('profileimages')
               .upload(filePath, file);

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
         console.log(file);
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
         console.log('ListData: ', listData);
         if (listData.length === 0) {
            const { error: insertError } = await supabase.storage
               .from('profileimages')
               .upload(filePath, file);

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
      const { data, error } = await supabase.storage
         .from('profileimages')
         .createSignedUrl(`${userId}/ProfilePicture/ProfilePic.jpg`, 60 * 60);
      if (error) {
         console.error('Error generating signed URL', error);
         return null;
      } else {
         setProfilePicUrl(data.signedUrl);
      }
   }

   async function getProfileBannerUrl(userId) {
      const { data, error } = await supabase.storage
         .from('profileimages')
         .createSignedUrl(`${userId}/ProfileBanner/ProfileBanner.jpg`, 60 * 60);
      if (error) {
         console.error('Error generating signed URL', error);
         return null;
      } else {
         setBannerUrl(data.signedUrl);
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
                     src={movieCollage}
                     alt="profileBanner"
                     className="z-0 object-cover w-full h-96"
                  />
               ) : (
                  <img
                     src={bannerUrl}
                     alt="profileBanner"
                     className="z-0 object-cover w-full h-96"
                  />
               )}

               <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-t from-gray-900 via-gray-900/0 to-gray-900/0"></div>
               <div
                  className={`relative bottom-36 items-end flex ${
                     changeprofile ? 'justify-around' : 'justify-center w-3/4'
                  }`}
               >
                  <div>
                     {changeprofile && (
                        <div>
                           <label className="group flex flex-col items-center absolute left-4 top-10 gap-2">
                              <p className="invisible group-hover:visible relative text-xs z-20 text-slate-100">
                                 {' '}
                                 change Profile Banner
                              </p>
                              <Cameraswitch className="relative  z-20 hover:cursor-pointer text-slate-100 hover:text-slate-400" />

                              <input
                                 type="file"
                                 id="banner-upload"
                                 onChange={addOrChangeProfileBanner}
                                 className="hidden"
                              />
                           </label>
                        </div>
                     )}
                     <div className="text-5xl flex items-center gap-4">
                        {changeprofile ? (
                           <label className="group">
                              {profilePicUrl === '' ? (
                                 <Person className="text-5xl hover:cursor-pointer border-2 group-hover:text-slate-400 rounded-full w-20 h-20" />
                              ) : (
                                 <img
                                    src={profilePicUrl}
                                    alt="profileBanner"
                                    className="z-10 object-cover rounded-full w-20 border-2 bg-gray-900 hover:cursor-pointer group-hover:opacity-90 h-20"
                                 />
                              )}
                              <p className="hidden group-hover:flex absolute bottom-14 ml-5 text-xs hover:cursor-pointer">
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
                           <img
                              src={profilePicUrl}
                              alt="profileBanner"
                              className="z-10 object-cover rounded-full w-20 border-2 bg-gray-900 h-20"
                           />
                        )}

                        <h2> {userName}</h2>
                     </div>
                     <p>Member since: {joinDate}</p>
                  </div>
                  {paramusername === username && (
                     <div>
                        <Link href="/account">
                           <Settings className="text-4xl hover:text-slate-400 hover:cursor-pointer" />
                        </Link>
                     </div>
                  )}
               </div>
            </div>
         )}{' '}
      </div>
   );
}
