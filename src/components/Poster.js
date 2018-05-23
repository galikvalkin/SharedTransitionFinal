// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies
import resolveAssetSource from 'resolveAssetSource';

const { width } = Dimensions.get('window');

const maxWidth = width / 3;

const styles = StyleSheet.create({
  image: {
    borderRadius: 5,
  },
  photoAccount: {
    borderRadius: 5,
    borderWidth: 2,
    overflow: 'hidden',
  },
});

export default class Poster extends Component {
  static contextTypes = {
    onImageRef: PropTypes.func
  };

  static propTypes = {
    src: PropTypes.number,
    id: PropTypes.number,
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      width: 0,
      height: 0
    };
  }

  componentWillMount() {
    if (this.props.src) {
      const source = resolveAssetSource(this.props.src);

      this.setState(() => ({
        width: source.width || maxWidth,
        height: source.height || 50
      }));
    }
  }

  render() {
    const { src, id } = this.props;
    const height = this.state.height * (maxWidth / this.state.width);

    return (
      <View style={styles.photoAccount}>
        <Image
          ref={ref => (this.context.onImageRef && this.context.onImageRef(id, ref, src))}
          style={[styles.image, { width: maxWidth, height }]}
          source={src}
        />
      </View>
    );
  }
}
