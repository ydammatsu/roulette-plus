import { createClient } from 'urql';

export const GqlClient = createClient({
  url: 'https://rzrlls6gu5c4pkq3vxsks2oxe4.appsync-api.ap-northeast-1.amazonaws.com/graphql',
  fetchOptions: { headers: { 'x-api-key': 'da2-jf7b7ffhybbrjg5voegj6fsy4q' },
  },
});

export const GetAllRouletteQuery = `
  query {
    listRoulettes {
      items {
        id
        name
        description
        candidates
      }
    }
  }
`

export const GetRouletteQuery = `
  query ($name: String!) {
    listRoulettes(filter: {name: {eq: $name}}) {
      items {
        candidates
        description
        id
        name
      }
    }
  }
`;
