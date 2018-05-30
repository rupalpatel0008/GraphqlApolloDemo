import React from 'react';
import { Text } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const TOGGLE_TODO = gql`
  mutation toggleTodo($id: Int!) {
    toggleTodo(id: $id) @client
  }
`;

const Todo = ({ id, completed, text }) => {
  return <Mutation mutation={TOGGLE_TODO}>
    {toggleTodo => (
      <Text
        onPress={() => toggleTodo({ variables: { id }})}
        style={{
          padding: 5,
          textDecorationLine: completed ? 'line-through' : 'none',
        }}
      >
        {text}
      </Text>
    )}
  </Mutation>
};

export default Todo;