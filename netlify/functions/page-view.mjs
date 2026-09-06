import { getDatabase } from '@netlify/database';

import { createPageViewHandler } from './_shared/page-view-core.mjs';

export default createPageViewHandler({ getDatabase });

export const config = {
  path: '/api/page-view'
};
