import gql from 'graphql-tag';
import { AsyncStorage } from 'react-native';

export const defaults = {
  todos1: [
    {
      id: 1,
      text: "Item 1",
      completed: false,
      __typename: "Todo"
    },
    {
      id: 2,
      text: "Item 2",
      completed: false,
      __typename: "Todo"
    },
    {
      id: 3,
      text: "Item 3",
      completed: false,
      __typename: "Todo"
    }
  ],
  todos: [],
  visibilityFilter: 'SHOW_ALL',
  // visibilityfilter: {
  //   __typename: 'visibilityfilter',
  //   value: 'SHOW_ALL',
  // },
};

let nextTodoId = 0;

export const resolvers = {
  /* 
  ** Each resolver function takes 4 arguments and returns some result.
  ** Syntax: fieldName: (obj, args, context, info) => result; 
  ** obj: Object containing the result from the resolver. Usually its _(ROOT_QUERY) in case of top-level query.
  ** args: Whatever data you want to pass ot the function.
  ** context: The context object, which is shared between your React components and your Apollo Client network stack.
  **          We use InMemoryCache of apollo-client which has readQuery, writeQuery, readFragment, writeFragment,
              and writeData, using which we can mutate our data.
  ** info: Information about the execution state of the query. Ususally not used(Optional)
  */
  Mutation: {
    /* 
    ** addTodo adds a todo in the todos local state
    ** returns newTodo
    ** _: obj
    ** { text }: args
    ** context: cache
    */
    addTodo: (_, { text }, { cache }) => {
      // console.log('In addTodo', text);
      const query = gql`
        query GET_TODOS {
          todos @client {
            id
            text
            completed
          }
        }
      `;
      const previous = cache.readQuery({ query });
      // console.log('previous = ', previous.todos.length > 0);
      const newTodo = {
        id: previous.todos.length > 0 ? previous.todos[previous.todos.length - 1].id + 1 : nextTodoId++,
        text,
        completed: false,
        __typename: 'TodoItem',
      };
      const data = {
        todos: previous.todos.concat(newTodo)
      };
      cache.writeData({ data });
      // console.log('data= ', data);
      // console.log('newTodo= ', newTodo);
      return newTodo;
    },
    toggleTodo: (_, variables, { cache, getCacheKey }) => {
      console.log('In toggleTodo', id)
      // Here Todo is our typename which we used to add the todos in the local state
      const id = getCacheKey({ __typename: 'TodoItem', id: variables.id })
      const fragment = gql`
        fragment completeTodo on TodoItem {
          completed
        }
      `;
      const todo = cache.readFragment({ fragment, id });
      const data = { ...todo, completed: !todo.completed };
      cache.writeData({ id, data });
      return null;
    },
    deleteTodo:(_, variables, { cache }) => {
      const query = gql`
        query GET_TODOS {
          todos @client {
            id
            text
            completed
          }
        }
      `;
      const oldTodos = cache.readQuery({ query });
      const newTodos = filterTodoById(oldTodos.todos, variables.todo);
      const data = {
        todos: newTodos
      };
      cache.writeData({ data });
      return null;
    },
    visibilityFilter: (_, { filter }, { cache }) => {
      cache.writeData({ data: { visibilityFilter: filter } });
      return null;
    },
  }
};

const filterTodoById = (todos, todoText) => {
  return todos.filter(todo => {
    return todo.text != todoText;
  });
};

const saveTodos = (todos) => {
  AsyncStorage.setItem('@Graphql-todos', JSON.stringify(todos));
};
