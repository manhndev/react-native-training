import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10
  },
  icon: {
    padding: 6,
    color: '#EC407A',
  }
});

export default class CardFunc extends Component {


  render() {
    const { item, onPress, isFavorite } = this.props;
    var favorite;
    if (isFavorite) {
      favorite = <Icon name={'md-heart'} size={24} style={ styles.icon } />;
    } else {
      favorite = <Icon name={'md-heart-outline'} size={24} style={ styles.icon } />;
    }

    return (
      <View style={styles.container} >
      <TouchableOpacity onPress={ () => onPress() }>
        {favorite}
      </TouchableOpacity>
        <Icon name={'md-share'} size={24} style={ styles.icon } />
      </View>
    )
  }
}

CardFunc.propTypes = {
  item: PropTypes.object.isRequired,
};
