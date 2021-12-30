import {h} from 'preact';
import { useEffect, useCallback, useRef, useState } from 'preact/hooks';
const LIMIT = 10;

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {Array<T>} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 * @property {() => Promise<void>} fetchMore
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T[]>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useInfiniteFetch(apiPath, fetcher) {
  const internalRef = useRef({ isLoading: false, offset: 0 });

  const [result, setResult] = useState({
    data: [],
    error: null,
    isLoading: true,
  });

  const fetchMore = useCallback(() => {
    const { isLoading, offset } = internalRef.current;
    if (isLoading) {
      return;
    }

    setResult((cur) => ({
      ...cur,
      isLoading: true,
    }));
    internalRef.current = {
      isLoading: true,
      offset,
    };

    const promise = fetcher(apiPath, {limit: LIMIT, offset: offset});

    promise.then((allData) => {
      setResult((cur) => ({
        ...cur,
        data: [...cur.data, ...allData],
        isLoading: false,
      }));
      // console.log('result', result, allData, LIMIT, offset, apiPath);
      internalRef.current = {
        isLoading: false,
        offset: offset + LIMIT,
      };
    });

    promise.catch((error) => {
      setResult((cur) => ({
        ...cur,
        error,
        isLoading: false,
      }));
      internalRef.current = {
        isLoading: false,
        offset,
      };
    });
  }, [apiPath, fetcher]);

// const allPosts = {
//   isLoading: Boolean,
//   data: Array,
//   offset: Number
// };

  const fetchPosts = useCallback(() => {
    const { isLoading, offset } = internalRef.current;
    if (isLoading) {
      return;
    }
    setResult((cur) => ({
      ...cur,
      isLoading: true,
    }));
    internalRef.current = {
      isLoading: true,
      offset,
    };

    const promise = fetcher(apiPath);
    if (!window.allPosts?.data ) {
      promise.then((allData) => {
        window.allPosts = {data: allData};
        // console.log('data', allData, offset, LIMIT);
        setResult((cur) => ({
          ...cur,
          data: [...cur.data, ...allData],
          isLoading: false,
        }));
        internalRef.current = {
          isLoading: false,
          offset: offset + LIMIT,
        };
      })
      promise.catch((error) => {
        setResult((cur) => ({
          ...cur,
          error,
          isLoading: false,
        }));
        internalRef.current = {
          isLoading: false,
          offset,
        };
      });
    } else {
      const allData = window.allPosts.data;
        setResult((cur) => ({
          ...cur,
          data: [...cur.data, ...allData.slice(offset, offset + LIMIT)],
          isLoading: false,
        }));
        internalRef.current = {
          isLoading: false,
          offset: offset + LIMIT,
        };
    }
  }, [apiPath, fetcher]);


  useEffect(() => {
    setResult(() => ({
      data: [],
      error: null,
      isLoading: true,
    }));
    internalRef.current = {
      isLoading: false,
      offset: 0,
    };

    fetchMore();
  }, [fetchMore]);

  return {
    ...result,
    fetchMore,
    fetchPosts
  };
}
