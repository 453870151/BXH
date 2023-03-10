import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

export const client = new ApolloClient({
  link: new HttpLink({
    // uri: 'https://api.thegraph.com/subgraphs/name/keeganlee/bxhlending',
    uri: 'https://n9.hg.network/subgraphs/name/bxhlendingv1/bsc',
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})
