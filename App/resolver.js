import gql from 'graphql-tag';

export const defaults = {
  todos: [],
  visibilityfilter: 'SHOW_ALL',
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
      const newTodo = {
        id: nextTodoId++,
        text,
        completed: false,
        __typename: 'TodoItem',
      };
      const data = {
        todos: previous.todos.concat()
      };
      cache.writeData({ data });
      return newTodo;
    },
    toggleTodo: (_, variables, { cache }) => {

    }
  }
};