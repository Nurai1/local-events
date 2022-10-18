import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://api.8base.com/cl930s18t00bn0amg9iy9es7n',
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export default new ApolloClient({
  link: httpLink,
  cache,
});
