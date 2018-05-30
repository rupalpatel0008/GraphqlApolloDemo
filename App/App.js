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
import { defaults, resolvers } from './resolver';
import { Footer, Link, Todo, TodoForm, TodoDelete, TodoList, PostList } from './components';

const typeDefs = `
  type Todo {
    id: Int!
    text: String!
    completed: Boolean!
  }
  type Mutation {
    addTodo(text: String!): Todo
    toggleTodo(id: Int!): Todo
    deleteTodo(id: Int!): Todo
  }
  type Query {
    visibilityFilter: String
    todos: [Todo]
  }
`;

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
    // Our local state link
    const stateLink = withClientState({ resolvers, defaults, cache, typeDefs });
    this.client = new ApolloClient({
      cache,
      link: ApolloLink.from([
        stateLink,
        new HttpLink({
          uri: 'http://localhost:8080/graphql'
        })
      ]),
    });
  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        {/* <PostList /> */}
        <View style={{ flex: 1 }}>
          <TodoForm />
          <TodoDelete />
          <TodoList />
          <Footer />
        </View>
      </ApolloProvider>
    );
  }
}
