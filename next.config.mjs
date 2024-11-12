/** @type {import('next').NextConfig} */
const nextConfig = {
     eslint:{
        ignoreDuringBuilds: true,
     },
    images:{
       
        unoptimized:true,
        domains:['picsum.photos.com','lozvbgblszssvycgynsh.supabase.co','img.clerk.com',
        'images.unsplash.com']
    }
};

export default nextConfig;
