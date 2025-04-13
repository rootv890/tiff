export default function LandingPage() {
	return (
		<div className="min-h-screen bg-[#1e1f22] text-white font-sans">
			<header className="py-6 px-8 border-b border-[#2b2d31] shadow-sm">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-semibold tracking-tight">Tiff</h1>
					<nav>
						<ul className="flex space-x-6 text-sm">
							<li>
								<a
									href="#"
									className="hover:text-[#dbdee1] transition-colors"
								>
									Home
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-[#dbdee1] transition-colors"
								>
									Features
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-[#dbdee1] transition-colors"
								>
									About
								</a>
							</li>
						</ul>
					</nav>
					<button className="bg-[#5865f2] hover:bg-[#4752c4] px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-md">
						Login
					</button>
				</div>
			</header>

			<main className="max-w-6xl mx-auto py-20 px-6">
				<div className="flex flex-col md:flex-row items-center gap-16">
					<div className="md:w-1/2">
						<h2 className="text-4xl font-bold mb-4 leading-tight">
							A new way to argue with your friends.
						</h2>
						<p className="text-[#b5bac1] text-base mb-8 max-w-md">
							Connect with your friends and communities in real-time. Tiff makes
							it easy to chat, share, and debate with the people who matter
							most.
						</p>
						<div className="flex gap-4">
							<button className="bg-[#5865f2] hover:bg-[#4752c4] px-6 py-3 rounded-md font-medium text-sm transition-colors shadow-sm">
								Get Started
							</button>
							<button className="bg-[#2b2d31] hover:bg-[#3a3c41] px-6 py-3 rounded-md font-medium text-sm transition-colors border border-[#3a3c41]">
								Learn More
							</button>
						</div>
					</div>
					<div className="md:w-1/2">
						<div className="bg-[#2b2d31] rounded-xl overflow-hidden shadow-lg border border-[#3a3c41]">
							<div className="aspect-video bg-[#1e1f22] flex items-center justify-center">
								<span className="text-[#72767d]">Image Placeholder</span>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}
