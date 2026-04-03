import Link from 'next/link';
import { useAppContext } from './contexts/appContext';
import { ToggleTheme } from './toggle-theme';

export const PersonalHeader = () => {
	const { publication } = useAppContext();

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
				<Link
					href="/apps"
					className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
				>
					apps
				</Link>
				<ToggleTheme />
			</nav>
		</header>
	);
};
