'use client';

import { Url } from '@package/graphql/types';
import { useState } from 'react';
import styles from './Urls.module.css';
import { sdk } from '@/utils/sdk';

export const Urls = (props: { urls: Url[] }) => {
  const [url, setUrl] = useState<string>('');
  const [urls, setUrls] = useState<Url[]>(props.urls);
  const [error, setError] = useState<string>('');

  function submitUrl() {
    setError('');
    const res = sdk
      .CreateUrl({
        url,
      })
      .then((res) => {
        setUrls([...urls, res.createUrl]);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }

  return (
    <>
      {urls.length === 0 ? (
        <p>
          You have no URLs yet. To get started enter a URL into the input and
          press the button.
        </p>
      ) : null}
      <h2>Enter a URL to shorten:</h2>
      <input
        className={styles.input}
        type="text"
        onInput={(e) => setUrl(e.currentTarget.value)}
        value={url}
      />
      {error ? <p className={styles.error}>{error}</p> : null}
      <button className={styles.button} onClick={submitUrl}>
        Submit
      </button>
      {urls.length > 0 ? (
        <>
          <h2>Your current URLs are:</h2>
          {urls.map((url: Url) => (
            <div key={url.id}>
              <p>{url.url}</p>
            </div>
          ))}
        </>
      ) : null}
    </>
  );
};
