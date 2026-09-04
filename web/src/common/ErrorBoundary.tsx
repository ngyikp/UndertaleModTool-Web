import {Component} from 'react';

type Props = Readonly<{
	children: React.ReactNode;
	fallback: React.ReactNode | ((error: Error) => React.ReactNode);
}>;

type State = Readonly<{
	error: Error | null;
}>;

export default class ErrorBoundary extends Component<Props, State> {
	override state: State = {
		error: null,
	};

	static getDerivedStateFromError(error: Error): State {
		return {error};
	}

	override render() {
		if (this.state.error) {
			if (typeof this.props.fallback === 'function') {
				return this.props.fallback(this.state.error);
			}

			return this.props.fallback;
		}

		return this.props.children;
	}
}
