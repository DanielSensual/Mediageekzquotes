import '@/app/globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
    title: 'ProducerOS — AI-Powered Proposals for Video Production',
    description: 'Multi-tenant video production proposal platform for conventions, weddings, social media, and more.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
