import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const containerStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'flex-end',
};

const UPVOTE_POST = gql`
  mutation upvotePost($postId: Int!) {
    upvotePost(postId: $postId) {
      id
      votes
    }
  }
`;

const PostUpvoter = ({ postId }) => {
  return (
    <Mutation mutation={UPVOTE_POST}>
      {(upvotePost, { data }) => {
        return <TouchableOpacity
          style={containerStyle}
          onPress={() => upvotePost({ variables: { postId }})}
        >
          <Text>
            Upvote
          </Text>
        </TouchableOpacity>
      }}
      </Mutation>
  );
};

export default PostUpvoter;