import React from 'react';
import {StyleSheet, Text} from 'react-native';
import colors from '../../res/colors.json';

function AppText(props: any) {
  return <Text style={[styles.txtLabel, props.style]}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  txtLabel: {
    fontSize: 18,
    color: colors.black,
  },
});

export default AppText;
