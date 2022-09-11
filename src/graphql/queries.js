import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      edges {
        node {
          name
          reviewCount
          stargazersCount
          watchersCount
          id
          ownerName
          createdAt
          ratingAverage
          forksCount
          openIssuesCount
          url
          ownerAvatarUrl
          description
          language
          userHasReviewed
          fullName
        }
      }
    }
  }
`;

export const AUTHORIZE = gql`
  query {
    me {
      id
      username
    }
  }
`;
