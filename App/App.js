/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import PostList from './PostList';


export default class App extends Component {
  constructor(...args) {
    super(...args);

    // const networkInterface = createNetworkInterface('http://localhost:8080/graphql');
    // this.client = new ApolloClient({
    //   networkInterface,
    //   dataIdFromObject: r => r.id,
    // });
    // this.client = new ApolloClient({ 
    //   uri: 'http://localhost:8080/graphql',
    //   cache
    // });
    // console.log('this.client = ', this.client);
    const cache = new InMemoryCache();
    const stateLink = withClientState({
      cache,
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, { isConnected }, { cache }) => {
            const data = {
              networkStatus: {
                __typename: 'NetworkStatus',
                isConnected
              },
            };
            cache.writeData({ data });
            return null;
          },
        },
      }
    });
    this.client = new ApolloClient({
      link: ApolloLink.from([
        stateLink,
        new HttpLink({
          uri: 'http://localhost:8080/graphql'
        })
      ]),
      cache
    });
  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        <PostList />
        {/* <View/> */}
      </ApolloProvider>
    );
  }
}
