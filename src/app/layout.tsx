import type { Metadata } from "next";
import "../index.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
	title: "Sri Ram Mohan Nyshadham - Portfolio",
	description:
		"Senior Mobile & Full-Stack Developer specializing in React, Next.js, NestJS, and GCP",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<Toaster />
					<Sonner />
					{children}
				</Providers>
			</body>
		</html>
	);
}
