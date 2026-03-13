import '@/app/globals.css';
import './product.css';

export const metadata = {
    title: 'Video Quoter — Stop Undercharging. Start Quoting Like a Pro.',
    description: 'The pricing engine built by a 5-year production veteran. Generate polished, profitable video production quotes in 60 seconds. 12 industry verticals pre-loaded.',
    openGraph: {
        title: 'Video Quoter — Professional Video Production Quoting SaaS',
        description: 'Stop guessing your rates. Video Quoter bakes in real-world pricing logic for weddings, corporate, real estate, and 9 more verticals.',
        type: 'website',
    },
};

export default function ProductLayout({ children }) {
    return children;
}
