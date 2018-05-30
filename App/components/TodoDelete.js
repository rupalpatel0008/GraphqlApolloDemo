import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const DELETE_TODO = gql`
  mutation deleteTodo($todo: String!) {
    deleteTodo(todo: $todo) @client {
      todo
    }
  }
`;

const conainerStyle = {
  marginVertical: 10,
  marginHorizontal: 5,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
};
export default class TodoDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }
  render () {
    return (
      <Mutation mutation={DELETE_TODO}>
        {deleteTodo => {
          return (
              <View style={conainerStyle}>
                <TextInput
                  autoCorrect={false}
                  placeholder={'Add id of todo'}
                  value={this.state.inputValue}
                  style={{ flex: 0.6, borderColor: 'black', borderWidth: 1 }}
                  onChangeText={inputValue => this.setState({ inputValue })}
                  underlineColorAndroid="transparent"
                  keyboardAppearance="dark"
                />
                <TouchableOpacity
                  style={{ flex: 0.3 }}
                  onPress={() => {
                    deleteTodo({ variables: { todo: this.state.inputValue } }).then((res) => {
                      this.setState({ inputValue: '' });
                    });
                  }}
                >
                  <Text style={{ backgroundColor: 'red', textAlign: 'center' }}>Delete Todo</Text>
                </TouchableOpacity>
              </View>
          );
        }}
      </Mutation>
    );
  }
};