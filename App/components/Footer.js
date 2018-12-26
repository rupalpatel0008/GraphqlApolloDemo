import React from 'react';
import { Text, View } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Link from './Link';

const GET_VISIBILITY_FILTER = gql`
  {
    visibilityFilter @client
  }
`;

const FilterLink = ({ filter, children }) => (
  <Query query={GET_VISIBILITY_FILTER}>
    {({ data, client }) => {
      return (
        <Link
          onClick={() => client.writeData({ data: { visibilityFilter: filter } })}
          active={data.visibilityFilter === filter}
        >
          {children}
        </Link>
      );
    }
    }
  </Query>
);

const Footer = () => (
  <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
    <Text>
      Show: <FilterLink filter="SHOW_ALL">All</FilterLink>
      {', '}
      <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
      {', '}
      <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
    </Text>
  </View>
);

export default Footer;