import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <Text style={{ color: 'red', padding: 5 }}>{children}</Text>;
  }
  return <Text onPress={() => onClick()} style={{ color: 'blue', padding: 5 }}>{children}</Text>;
};

export default Link;