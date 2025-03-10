import { ReactNode } from "react";
import Head from "next/head";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Head>
				<title>Pokerd</title>
				<meta name="Pokerd" content="Pokerd" />
			</Head>
			<div>
				<main className="bg-primary-bg">{children}</main>
			</div>
		</>
	);
};

export default Layout;
