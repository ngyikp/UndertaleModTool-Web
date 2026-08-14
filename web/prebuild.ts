// This would be the 'prebuild' script in package.json
// but it doesn't work -__-

import {stat} from 'node:fs/promises';
import {resolve} from 'node:path';

await stat(resolve(import.meta.dirname, 'public/dotnet/'));
