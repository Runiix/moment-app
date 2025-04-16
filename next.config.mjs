/** @type {import('next').NextConfig} */

const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'image.tmdb.org',
         },
         {
            protocol: 'https',
            hostname: 'hgckvlxkvpdfxgmwpozr.supabase.co',
         },
      ],
      unoptimized: true,
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'umvtbsrjbvivfkcmvtxk.supabase.co',
         },
      ],
   },
};

export default nextConfig;
