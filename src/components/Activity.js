/*
* @Author: valentinegalkin
* @Date:   2018-05-20 21:56:16
* @Last Modified by:   Valentin
* @Last Modified time: 2018-05-23 15:42:07
* @flow
*/

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies
import Background from './Background';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  closeBtn: {
    marginTop: 50,
  },
  closeText: {
    fontSize: 20,
    alignSelf: 'flex-end',
  },
});

class Activity extends Component {
  static propTypes = {
    startX: PropTypes.number,
    startY: PropTypes.number,
    startW: PropTypes.number,
    startH: PropTypes.number,
    src: PropTypes.number,
    activeId: PropTypes.number,
    onClose: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      id: props.activeId
    };
  }

  close = () => {
    this.setState(() => (
      {
        id: null
      }
    ), () => {
      setTimeout(this.props.onClose, 200);
    });
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <Background
          {...this.props}
          activeId={this.state.id}
        />

        <TouchableOpacity
          onPress={this.close}
          style={styles.closeBtn}
        >
          <Text
            style={styles.closeText}
          >
            Close
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Activity;
