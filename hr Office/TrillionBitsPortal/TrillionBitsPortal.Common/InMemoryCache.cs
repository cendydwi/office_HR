using System;
using System.Runtime.Caching;
using System.Linq;

namespace TrillionBitsPortal.Common
{
    public class InMemoryCache : ICacheService
    {
        private static ICacheService _cacheService;
        private ObjectCache _cache;
        private readonly int DefaultCacheDurationInMin = 60;
        static InMemoryCache()
        {
            _cacheService = new InMemoryCache();
        }
        private InMemoryCache()
        {
            _cache = MemoryCache.Default;
        }
        public TValue Get<TValue>(string cacheKey, Func<TValue> getItemCallback) where TValue : class
        {
            TValue item = _cache.Get(cacheKey) as TValue;
            if (item == null)
            {
                item = getItemCallback();
                var policy = new CacheItemPolicy();
                policy.AbsoluteExpiration = DateTime.Now.AddMinutes(DefaultCacheDurationInMin);
                _cache.Set(cacheKey, item, policy);
            }
            return item;
        }

        public TValue Get<TValue, TId>(string cacheKeyFormat, TId id, Func<TId, TValue> getItemCallback) where TValue : class
        {
            string cacheKey = string.Format(cacheKeyFormat, id);
            TValue item = _cache.Get(cacheKey) as TValue;
            if (item == null)
            {
                item = getItemCallback(id);
                var policy = new CacheItemPolicy();
                policy.AbsoluteExpiration = DateTime.Now.AddMinutes(DefaultCacheDurationInMin);
                _cache.Set(cacheKey, item, policy);
            }
            return item;
        }

        public T Get<T>(string cacheID) where T : class
        {
            T item = _cache.Get(cacheID) as T;
            return item;
        }

        public void Set<T>(string cacheID, T data) where T : class
        {
            var policy = new CacheItemPolicy();
            policy.AbsoluteExpiration = DateTime.Now.AddMinutes(DefaultCacheDurationInMin);
            _cache.Set(cacheID, data, policy);
        }

        public void Remove(string cacheId)
        {
            _cache.Remove(cacheId);
        }

        public void RemoveAll(string cacheInitial)
        {
            var cacheIdList = _cache.Where(x => x.Key.StartsWith(cacheInitial)).ToList();
            foreach (var x in cacheIdList)
            {
                _cache.Remove(x.Key);
            }
        }

        public static ICacheService CacheService
        {
            get
            {
                return _cacheService;
            }
        }
    }

    public interface ICacheService
    {
        TValue Get<TValue>(string cacheKey, Func<TValue> getItemCallback) where TValue : class;
        TValue Get<TValue, TId>(string cacheKeyFormat, TId id, Func<TId, TValue> getItemCallback) where TValue : class;
        T Get<T>(string cacheID) where T : class;
        void Set<T>(string cacheID, T data) where T : class;
        void Remove(string cacheId);
        void RemoveAll(string cacheInitial);
    }
}
