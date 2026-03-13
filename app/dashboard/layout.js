import '@/app/globals.css';
import '../product/product.css';
import './dashboard.css';

export const metadata = {
    title: 'Dashboard — Video Quoter',
    description: 'Manage your quotes, rates, and subscription.',
};

export default function DashboardLayout({ children }) {
    return children;
}
