import styles from './page.module.css';
import { Urls } from '@/components/Urls/Urls';
import { sdk } from '@/utils/sdk';

export default async function Home() {
  const data = await getData();
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 className={styles.title}> Welcome to the URL Shortening App</h1>
        <Urls urls={data.urls} />
      </div>
    </main>
  );
}

async function getData() {
  const res = await sdk.GetUrls();
  return {
    urls: res.urls,
  };
}
