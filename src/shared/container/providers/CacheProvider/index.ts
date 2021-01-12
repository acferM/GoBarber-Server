import { container } from 'tsyringe';

import ICacheProvider from './models/ICacheProvider';
import RedisCacheProvider from './implementations/RedisCacheProvider';

const providers = {
  redis: new RedisCacheProvider(),
};

container.registerInstance<ICacheProvider>('CacheProvider', providers.redis);
