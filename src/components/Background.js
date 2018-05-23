/*
* @Author: valentinegalkin
* @Date:   2018-05-20 20:58:07
* @Last Modified by:   Valentin
* @Last Modified time: 2018-05-23 15:42:01
* @flow
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
  },
});

export default class Background extends Component {
  static propTypes = {
    startX: PropTypes.number,
    startY: PropTypes.number,
    startW: PropTypes.number,
    startH: PropTypes.number,
    src: PropTypes.number,
    activeId: PropTypes.number,
  };

  constructor(props: Object) {
    super(props);

    const {
      startX, startY, startW, startH
    } = this.props;

    this.startX = startX;
    this.startY = startY;
    this.startW = startW;
    this.startH = startH;

    this.animated = new Animated.Value(0);

    this.animate(1);
  }

  componentWillReceiveProps(nextProps: Object) {
    if (!this.props.activeId && nextProps.activeId) {
      this.startX = nextProps.startX;
      this.startY = nextProps.startY;
      this.startW = nextProps.startW;
      this.startH = nextProps.startH;
      this.animate(1);
    } else if (this.props.activeId && !nextProps.activeId) {
      this.animate(0)
        .then(() => {
          this.startX = null;
          this.startY = null;
          this.startW = 0;
          this.startH = 0;
        });
    }
  }

  animate = (toValue: number) =>
    new Promise((resolve) => {
      Animated.timing(
        this.animated,
        {
          toValue,
          duration: 200,
          easing: Easing.linear,
          useNativeDrive: true
        }
      )
        .start(resolve);
    })

  render() {
    const translateInitW = this.startW || 0;
    const translateDestW = screenWidth;

    const translateInitH = this.startH || 0;
    const translateDestH = screenHeight;

    const translateInitY = this.startY || 0;
    const translateDestY = 0;

    const translateInitX = this.startX || 0;
    const translateDestX = 0;

    const width = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [translateInitW, translateDestW]
    });

    const height = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [translateInitH, translateDestH]
    });

    const translateX = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [translateInitX, translateDestX]
    });

    const translateY = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [translateInitY, translateDestY]
    });
    return (
      <Animated.Image
        style={[styles.image, {
          width,
          height,
          transform: [
            {
              translateX
            },
            {
              translateY
            },
          ]
        }]}
        source={this.props.src}
      />
    );
  }
}

