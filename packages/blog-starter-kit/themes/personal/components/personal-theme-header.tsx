import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { PublicationNavbarItem } from '../generated/graphql';
import { useAppContext } from './contexts/appContext';
import { GithubSVG, LinkedinSVG, XSVG } from './icons/svgs';
import { ToggleTheme } from './toggle-theme';

const socialLinks = [
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/pchristou/', Icon: LinkedinSVG },
	{ label: 'X', href: 'https://x.com/pchristou_', Icon: XSVG },
	{ label: 'GitHub', href: 'https://github.com/pchristou', Icon: GithubSVG },
];

function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}

export const PersonalHeader = () => {
	const { publication } = useAppContext();

	const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
	const visibleItems = navbarItems.slice(0, 2);
	const hiddenItems = navbarItems.slice(2);

	const navList = (
		<ul className="flex list-none flex-row items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
			{visibleItems.map((item) => (
				<li key={item.url}>
					<a
						href={item.url}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-black dark:hover:text-white"
					>
						{item.label}
					</a>
				</li>
			))}

			{hiddenItems.length > 0 && (
				<li>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<button className="hover:text-black dark:hover:text-white">More</button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Portal>
							<DropdownMenu.Content
								className="flex flex-col items-stretch gap-1 rounded-lg border bg-white text-sm text-neutral-600 shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
								sideOffset={5}
								align="end"
							>
								{hiddenItems.map((item) => (
									<DropdownMenu.Item asChild key={item.url}>
										<a
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
											className="block w-full p-2 hover:text-black dark:hover:text-white"
										>
											{item.label}
										</a>
									</DropdownMenu.Item>
								))}
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
				</li>
			)}
		</ul>
	);

	return (
		<header className="flex items-center justify-between">
			<h1>
				<Link
					className="font-sans text-2xl font-bold text-black dark:text-white"
					href="/"
					aria-label={`${publication.author.name}'s blog home page`}
				>
					{publication.title}
				</Link>
			</h1>
			<nav className="flex items-center gap-5">
				{navList}
				<ul className="flex list-none flex-row items-center gap-3 text-neutral-600 dark:text-neutral-400">
					{socialLinks.map(({ label, href, Icon }) => (
						<li key={href}>
							<a
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={label}
								className="hover:text-black dark:hover:text-white"
							>
								<Icon className="h-5 w-5" />
							</a>
						</li>
					))}
				</ul>
				<ToggleTheme />
			</nav>
		</header>
	);
};
