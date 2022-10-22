/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images:{
    domains : ['images.pexels.com','localhost',"flowbite.s3.amazonaws.com","cdn.dimasblog.my.id"],
    minimumCacheTTL:200
  }
}

module.exports = nextConfig
