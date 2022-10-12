import gql from 'graphql-tag';

export const placeFragment = {
  place: gql`
    fragment PlaceFr on Place {
      id
      postedBy {
        login
        htmlUrl
      }
      createdAt
      content
    }
  `,
};
