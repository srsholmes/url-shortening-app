import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Mutation = {
  __typename?: 'Mutation';
  createUrl: Url;
};

export type MutationCreateUrlArgs = {
  url: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  urls: Array<Url>;
};

export type Url = {
  __typename?: 'Url';
  id: Scalars['String']['output'];
  shortUrl: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GetUrlsQueryVariables = Exact<{ [key: string]: never }>;

export type GetUrlsQuery = {
  __typename?: 'Query';
  urls: Array<{
    __typename?: 'Url';
    id: string;
    url: string;
    shortUrl: string;
  }>;
};

export type CreateUrlMutationVariables = Exact<{
  url: Scalars['String']['input'];
}>;

export type CreateUrlMutation = {
  __typename?: 'Mutation';
  createUrl: { __typename?: 'Url'; id: string; url: string; shortUrl: string };
};

export const GetUrlsDocument = gql`
  query GetUrls {
    urls {
      id
      url
      shortUrl
    }
  }
`;
export const CreateUrlDocument = gql`
  mutation CreateUrl($url: String!) {
    createUrl(url: $url) {
      id
      url
      shortUrl
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    GetUrls(
      variables?: GetUrlsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetUrlsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUrlsQuery>(GetUrlsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetUrls',
        'query',
      );
    },
    CreateUrl(
      variables: CreateUrlMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CreateUrlMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateUrlMutation>(CreateUrlDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateUrl',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
