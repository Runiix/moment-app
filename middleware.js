import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req) {
   const res = NextResponse.next();

   const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
         cookies: {
            get(name) {
               return req.cookies.get(name)?.value;
            },
            set(name, value, options) {
               req.cookies.set({
                  name,
                  value,
                  ...options,
               });
               const response = NextResponse.next({
                  request: {
                     headers: req.headers,
                  },
               });
               response.cookies.set({
                  name,
                  value,
                  ...options,
               });
            },
            remove(name, options) {
               req.cookies.set({
                  name,
                  value: '',
                  ...options,
               });
               const response = NextResponse.next({
                  request: {
                     headers: req.headers,
                  },
               });
               response.cookies.set({
                  name,
                  value: '',
                  ...options,
               });
            },
         },
      }
   );

   const {
      data: { user },
   } = await supabase.auth.getUser();

   if (
      (user && req.nextUrl.pathname === '/') ||
      (user && req.nextUrl.pathname === '/loginpage')
   ) {
      return NextResponse.redirect(new URL('/home', req.url));
   }
   if (
      (!user && req.nextUrl.pathname === '/home') ||
      (!user && req.nextUrl.pathname === '/movies/:path*') ||
      (!user && req.nextUrl.pathname === '/mymovies/:path*') ||
      (!user && req.nextUrl.pathname === '/Discover') ||
      (!user && req.nextUrl.pathname === '/movielists/:path*') ||
      (!user && req.nextUrl.pathname === '/profilepage/:path*') ||
      (!user && req.nextUrl.pathname === '/impressum') ||
      (!user && req.nextUrl.pathname === '/help') ||
      (!user && req.nextUrl.pathname === '/termsofservice')
   ) {
      return NextResponse.redirect(new URL('/loginpage', req.url));
   }
   return res;
}

export const config = {
   matcher: [
      '/',
      '/loginpage',
      '/home',
      '/movies/:path*',
      '/mymovies/:path*',
      '/Discover',
      '/movielists/:path*',
      '/profilepage/:path*',
      '/impressum',
      '/help',
      '/termsofservice',
   ],
};
