import { createClient } from 'urql';

export const GqlClient = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_END_POINT || '',
  fetchOptions: { headers: { 'x-api-key': process.env.NEXT_PUBLIC_GRAPHQL_API_KEY || '' },
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

export const CreateRouletteMutation = `
  mutation ($createRouletteInput: CreateRouletteInput!) {
    createRoulette(input: $createrouletteinput) {
      id
      name
      description
      candidates
    }
  }
`

export const UpdateRouletteMutation = `
  mutation ($updateRouletteInput: UpdateRouletteInput!) {
    updateRoulette(input: $updateRouletteinput) {
      id
      name
      description
      candidates
    }  
  }
`

export const DeleteRouletteMutation = `
  mutation ($deleteRouletteInput: DeleteRouletteInput!) {
    deleteRoulette(input: $deleteRouletteInput) {
      id
      name
    }  
  }
`
