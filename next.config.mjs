/** @type {import('next').NextConfig} */
const nextConfig = {
    // Allow PDFKit and other Node modules in API routes
    serverExternalPackages: ['pdfkit'],
};

export default nextConfig;
