/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      // EITHER allow specific hostnames (simple)
      domains: ['yt3.ggpht.com', 'i.ytimg.com', 'ytimg.com'],
  
      // AND/OR use remotePatterns for more flexible matching (recommended)
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.yt3.ggpht.com',
          pathname: '/**'
        },
        {
          protocol: 'https',
          hostname: 'i.ytimg.com',
          pathname: '/**'
        }
      ]
    }
  };
  
  export default nextConfig;
  