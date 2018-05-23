/*
* @Author: valentinegalkin
* @Date:   2018-05-20 01:42:42
* @Last Modified by:   Valentin
* @Last Modified time: 2018-05-23 14:58:49
* @flow
*/

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies
import Poster from './Poster';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  textBlock: {
    flex: 1,
    paddingLeft: 15,
  }
});

function ListItem({
  name, src, id, onPress
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
      <Poster
        id={id}
        src={src || null}
      />
      <View style={styles.textBlock}>
        <Text style={styles.name}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

ListItem.propTypes = {
  onPress: PropTypes.func,
  name: PropTypes.string,
  src: PropTypes.number,
  id: PropTypes.number,
};

export default ListItem;
