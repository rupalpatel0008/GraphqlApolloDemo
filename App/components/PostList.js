import React from 'react';
import { Alert, Text, View } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PostUpvoter from './PostUpvoter';

const styles = {
  outer: { paddingTop: 32, paddingLeft: 10, paddingRight: 10 },
  wrapper: { height: 40, marginBottom: 15, flexDirection: 'row' },
  header: { fontSize: 20 },
  subtextWrapper: { flex: 1, flexDirection: 'row' },
  votes: { color: '#999' },
}

const GET_POSTS = gql`
  query allPosts{
    posts {
      id
      title
      votes
      author {
        id
        firstName
        lastName
      }
    }
  }
`;

const PostList = () => {
  // console.log(GET_POSTS)
  // return <Text>PostList</Text>
  return <Query query={GET_POSTS}>
    {({loading, error, data}) => {
      //Show an alert if there is an error
      if (error) {
        Alert.alert("Error", "Could not fetch posts");
        console.log(error);
        return null;
      }

      // Show a loading screen if the query is not yet finished
      if (loading) {
        return (
          <Text>Please Wait</Text>
        )
      }
      const { posts } = data;
      console.log(posts);
      let newPosts = posts.slice();
      newPosts.sort((x,y)=> y.votes - x.votes);
      console.log(newPosts);
      // Render the list
      return (
        <View style={styles.outer}>
          {newPosts.map(post => {
            console.log('post = ', post);
            return (
              <View key={post.id} style={styles.wrapper}>
                <View>
                  <Text style={styles.header}>{post.title}</Text>
                  <View style={styles.subtextWrapper}>
                    <Text>
                      by {post.author.firstName} {' '}
                      {post.author.lastName} {' '}
                    </Text>
                    <Text style={styles.votes}>{post.votes} votes</Text>
                  </View>
                </View>
                <PostUpvoter postId={post.id} />
              </View>
            )
          })}
        </View>
      );
    }}
  </Query>
};

export default PostList;
