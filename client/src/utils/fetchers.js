import { gzip } from 'pako';

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
        mode: 'cors',
    credentials: 'same-origin',
  });
  return res.arrayBuffer();
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url, data) {
  const res = await fetch(url + '?' + Object.entries(data || {}).map(ent => `${ent[0]}=${ent[1]}`).join('&'), {
    method: 'GET',
    cache: 'no-cache',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return res && res.ok ? res.json() : null;
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body: file
  })
  return res.json();
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const jsonString = JSON.stringify(data);
  const uint8Array = new TextEncoder().encode(jsonString);
  const compressed = gzip(uint8Array);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
    mode: 'cors',
    credentials: 'same-origin',
    body: JSON.stringify(data)
  })
  return res.json();
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
