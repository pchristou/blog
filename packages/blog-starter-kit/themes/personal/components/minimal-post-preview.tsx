import Link from 'next/link';
import { User } from '../generated/graphql';
import { DateFormatter } from './date-formatter';

type Author = Pick<User, 'name'>;

type Props = {
	title: string;
	date: string;
	excerpt: string;
	author: Author;
	slug: string;
	commentCount: number;
};

export const MinimalPostPreview = ({ title, date, excerpt, slug }: Props) => {
	const postURL = `/${slug}`;
	const firstLine = excerpt?.split('\n')[0] ?? '';

	return (
		<article>
			<h2 className="mb-1 text-2xl font-extrabold">
				<Link href={postURL} className="text-[#d23669] hover:underline">
					{title}
				</Link>
			</h2>
			<p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">
				<DateFormatter dateString={date} />
			</p>
			{firstLine && (
				<p className="text-base text-neutral-700 dark:text-neutral-300">
					{firstLine}
				</p>
			)}
		</article>
	);
};
