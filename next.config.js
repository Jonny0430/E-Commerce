const nextConfig = {
	images: {
	  remotePatterns: [
		{
		  protocol: 'https',
		  hostname: 'utfs.io',
		  pathname: '**',
		},
	  ],
	},
  };
  
  module.exports = nextConfig;
  