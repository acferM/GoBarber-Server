import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
  [ley: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  async recover<T>(key: string): Promise<T | null> {
    const data = this.cache[key];
    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data);

    return parsedData as T;
  }

  async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }

  async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(key =>
      key.startsWith(`${prefix}:`),
    );

    keys.forEach(key => {
      delete this.cache[key];
    });
  }
}
