import { fetchJSON } from "../utils/fetchers";
/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {T | null} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T>} fetcher
 * @returns {ReturnValues<T>}
 */
export default function () {
    const promise = fetchJSON('/api/v1/me');

    return promise.then((data) => {
        return data
    }).catch(err => {
        return null
    });

}
