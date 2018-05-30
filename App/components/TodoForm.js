import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) @client {
      id
    }
  }
`;

const conainerStyle = {
  marginVertical: 50,
  marginHorizontal: 5,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
};
export default class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }
  render () {
    return (
      <Mutation mutation={ADD_TODO}>
        {addTodo => {
          return (
              <View style={conainerStyle}>
                <TextInput
                  autoCorrect={false}
                  placeholder={'Add your todo'}
                  value={this.state.inputValue}
                  style={{ flex: 0.6, borderColor: 'black', borderWidth: 1 }}
                  onChangeText={inputValue => this.setState({ inputValue })}
                  underlineColorAndroid="transparent"
                  keyboardAppearance="dark"
                />
                <TouchableOpacity
                  style={{ flex: 0.3 }}
                  onPress={() => {
                    addTodo({ variables: { text: this.state.inputValue } }).then((res) => {
                      this.setState({ inputValue: '' });
                    });
                  }}
                >
                  <Text style={{ backgroundColor: 'green', textAlign: 'center' }}>Add Todo</Text>
                </TouchableOpacity>
              </View>
          );
        }}
      </Mutation>
    );
  }
};
// export default TodoForm;