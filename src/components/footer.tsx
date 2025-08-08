export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t">
			<div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-6 gap-4">
				<p className="text-sm text-muted-foreground">
					© {currentYear} Sri Ram Mohan Nyshadham. All rights reserved.
				</p>
				<a href="#top" className="text-sm story-link">
					Back to top
				</a>
			</div>
		</footer>
	);
}
