import BasicErrorAlert from './BasicErrorAlert';
import ContentViewWithPadding from './ContentViewWithPadding';

type Props = React.ComponentProps<typeof BasicErrorAlert>;

export default function ContentViewAlert(props: Props) {
	return (
		<ContentViewWithPadding>
			<BasicErrorAlert {...props} />
		</ContentViewWithPadding>
	);
}
