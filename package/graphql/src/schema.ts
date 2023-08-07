import gql from 'graphql-tag';

export const schema = gql`
  type Query {
    urls: [Url!]!
  }

  type Mutation {
    createUrl(url: String!): Url!
  }

  type Url {
    id: String!
    url: String!
  }
`;
