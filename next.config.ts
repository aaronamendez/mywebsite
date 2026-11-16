import type { NextConfig } from "next";

// The site has no server routes, so export plain HTML to out/ and let
// Netlify serve it as static files (no Next.js runtime needed).
const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
};

export default nextConfig;
