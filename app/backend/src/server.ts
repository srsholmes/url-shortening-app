import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { schema } from '@package/graphql/src/schema';
import cors from 'cors';
import { Document, MongoClient, WithId } from 'mongodb';
import { customAlphabet } from 'nanoid';
import { Url } from '@package/graphql/types';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8);

const MONGO_DB_OPTIONS = {
  auth: { username: 'root', password: 'rootpassword' },
};
const MONGO_DB_URL: string = 'mongodb://localhost:27017';

async function addRecordToMongoDB(url: string): Promise<Url> {
  const urlToInsert = { url, id: nanoid() };
  const client = new MongoClient(MONGO_DB_URL, MONGO_DB_OPTIONS);

  try {
    await client.connect();
    const db = client.db('databaseName');
    const collection = db.collection('collectionName');
    const existingRecord = await collection.findOne({ id: urlToInsert.id });

    if (!existingRecord) {
      await collection.insertOne(urlToInsert);
      return urlToInsert;
    } else {
      // Try again
      await addRecordToMongoDB(url);
      return;
    }
  } catch (error) {
    console.error('Error occurred while adding record to MongoDB:', error);
  } finally {
    await client.close();
  }
}

async function getRecordsFromMongoDB(): Promise<WithId<Document>[]> {
  const client = new MongoClient(MONGO_DB_URL, MONGO_DB_OPTIONS);
  try {
    await client.connect();
    const db = client.db('databaseName');
    const collection = db.collection('collectionName');
    return await collection.find().toArray();
  } catch (error) {
    console.error('Error occurred while adding record to MongoDB:', error);
  } finally {
    await client.close();
  }
}

const root = {
  urls: async () => {
    const urls = await getRecordsFromMongoDB();
    return urls.map((doc) => ({
      id: doc.id,
      url: `https://pbid.io/${doc.id}`,
    }));
  },
  createUrl: async ({ url }: { url: string }) => {
    const isValidUrl = url.match(/^(ftp|http|https):\/\/[^ "]+$/);
    if (!isValidUrl) {
      throw new Error('Invalid URL');
    }

    const result = await addRecordToMongoDB(url);
    return {
      id: result.id,
      url: `https://pbid.io/${result.id}`,
    };
  },
};

const app = express();
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs: schema }),
    rootValue: root,
    graphiql: true,
  }),
);

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');
