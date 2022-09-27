import { expect } from 'vitest';
import { Crypto } from '@peculiar/webcrypto';
import * as domMatchers from 'vitest-dom/matchers';
import 'vitest-dom/extend-expect';
import 'bootstrap/dist/js/bootstrap';

import './index.scss';

expect.extend(domMatchers);

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
globalThis.crypto = new Crypto();
