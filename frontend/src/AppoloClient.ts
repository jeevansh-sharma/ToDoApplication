import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql', 
    headers: {
      Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '', 
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
