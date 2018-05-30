import React from 'react';
import { Text, View } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Todo from './Todo';

// From original
const GET_TODOS = gql`
  {
    todos @client {
      id
      completed
      text
    }
    visibilityFilter @client
  }
`;

// const GET_TODOS = gql`
//   query getAllTodos {
//     todos @client {
//       id
//       text
//       completed
//     }
//     visibilityFilter @client
//   }
// `;

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      // return todos;
      throw new Error('Unknown filter: ' + filter);
  }
};

const TodoList = () => (
  <Query query={GET_TODOS}>
    {({ data: { todos, visibilityFilter } }) => {
      // console.log('todos = ', todos);
      // console.log('visibilityFilter = ', visibilityFilter);
    return (
      <View style={{ flex: 1 }}>
        <Text>List of todos</Text>
        {
          todos.length > 0 && getVisibleTodos(todos, visibilityFilter).map(todo => (
            <Todo key={todo.id} {...todo} />
          ))
        }
        {todos.length <= 0 && <Text>No todos added</Text>}
      </View>
    )}
    }
  </Query>
);

export default TodoList;