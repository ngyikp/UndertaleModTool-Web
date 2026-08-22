import {Anchor} from '@mantine/core';
import {createLink, type LinkComponent} from '@tanstack/react-router';

// https://tanstack.com/router/latest/docs/guide/custom-link
const CreatedLinkComponent = createLink(Anchor);

const MantineAnchorWithRouter: LinkComponent<typeof Anchor<'a'>> = (props) => {
	return <CreatedLinkComponent {...props} />;
};

export default MantineAnchorWithRouter;
