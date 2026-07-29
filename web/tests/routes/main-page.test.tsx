import {screen} from '@testing-library/react';
import {expect, test} from 'vitest';

import {renderWithFileRoutes} from '../util/file-route-utils';

test('main page', async () => {
	renderWithFileRoutes('/');

	expect(await screen.findByText('UndertaleModTool on the Web')).toBeVisible();
	expect(screen.getByText('Select GameMaker data file')).toBeVisible();
});
