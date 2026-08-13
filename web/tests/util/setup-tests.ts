import '@testing-library/jest-dom/vitest';
import {
	// eslint-disable-next-line testing-library/no-manual-cleanup
	cleanup as cleanupTestingLibrary,
	configure as configureTestingLibrary,
} from '@testing-library/react';
import {afterEach, vi} from 'vitest';

vi.mock(import('../../src/CustomMantine'));

configureTestingLibrary({reactStrictMode: true});

// https://testing-library.com/docs/react-testing-library/setup#auto-cleanup-in-vitest
afterEach(() => {
	cleanupTestingLibrary();
});
