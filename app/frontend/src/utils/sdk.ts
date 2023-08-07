import { getSdk } from '@package/graphql/frontend.sdk';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('http://localhost:4000/graphql');
export const sdk = getSdk(client);
