import {queryOptions} from '@tanstack/react-query';

import {getEntriesByModelType} from '../messages/getEntriesByModelType';
import {ModelType} from '../types/ModelType';

export default queryOptions({
	queryKey: ['code'],
	queryFn() {
		return getEntriesByModelType(ModelType.Code);
	},
});
