import { beforeEach, describe, expect, test } from 'vitest';
import '../../src/server';
import { MongoClient } from 'mongodb';
import {
  DATABASE_NAME,
  MONGO_DB_OPTIONS,
  MONGO_DB_URL,
} from '../../src/server';

describe('GraphqQL Server', () => {
  beforeEach(async () => {
    // Clear the data const client = new MongoClient(MONGO_DB_URL, MONGO_DB_OPTIONS);
    const client = new MongoClient(MONGO_DB_URL, MONGO_DB_OPTIONS);
    await client.connect();
    const db = client.db(DATABASE_NAME);
    await db.dropDatabase();
  });

  test('It can create a shorted url', async () => {
    const url = 'https://www.google.com';
    const query = `
      mutation CreateUrl($url: String!) {
        createUrl(url: $url) {
          id
          url
          shortUrl
        }
      }
    `;
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { url } }),
    });
    const json = await response.json();
    expect(json.data.createUrl.url).toBe(url);
    expect(json.data.createUrl.shortUrl).toContain('https://pbid.io/');
    expect(json.data.createUrl.id).toHaveLength(8);
  });

  test('It can get all urls', async () => {
    const query = `
      query GetUrls {
        urls {
          id
          url
          shortUrl
        }
      }
    `;
    // First, make sure there are no entries
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const json1 = await response.json();
    expect(json1.data.urls).toHaveLength(0);

    // Now create an entry
    const createQuery = `
      mutation CreateUrl($url: String!) {
        createUrl(url: $url) {
          id
          url
          shortUrl
        }
      }
    `;

    await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: createQuery,
        variables: { url: 'https://www.google.com' },
      }),
    });

    // Now make sure there is one entry coming back as an array
    const response1 = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const json2 = await response1.json();
    expect(json2.data.urls).toHaveLength(1);
    expect(json2.data.urls[0].url).toBe('https://www.google.com');
    expect(json2.data.urls[0].shortUrl).toContain('https://pbid.io/');
    expect(json2.data.urls[0].id).toHaveLength(8);
  });
});
