import BasicLoadingMessage from './BasicLoadingMessage';
import ContentViewWithPadding from './ContentViewWithPadding';

type Props = React.ComponentProps<typeof BasicLoadingMessage>;

export default function ContentViewLoading(props: Props) {
	return (
		<ContentViewWithPadding>
			<BasicLoadingMessage {...props} />
		</ContentViewWithPadding>
	);
}
