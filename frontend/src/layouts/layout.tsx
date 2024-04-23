import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

type Props = {
	children: React.ReactNode;
	showHero?: boolean;
};

// Layout component that optionally includes a hero section and wraps children with common page elements
const layout = ({ children, showHero = false }: Props) => {
	return (
		// Main layout structure with flexible column, full minimum screen height
		<div className="flex flex-col min-h-screen">
			<Header />
			{/* Optionally renders the Hero component based on
			showHero prop */}
			{showHero && <Hero />}
			<div className="container mx-auto flex-1 py-10">
				{children}
			</div>
			<Footer />
		</div>
	);
};

export default layout;
