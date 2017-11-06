import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const DEFAULT_SIZE = 12;
const AVATAR_SIZE = 40;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    flex: 1,
    color: '#3F51B5',
    fontSize: 16,
  },
  description: {
    color: '#aaaaaa',
    fontSize: 12,
  },
  content: {
    alignSelf: 'center',
    resizeMode: 'cover',
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

export default function CardInfo({ item }) {
  return (
    <View style={styles.container} >
      <View style={styles.infoContainer} >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Image source={{ uri: item.owner.image }} style={styles.content} />
    </View>
  );
}

CardInfo.propTypes = {
  item: PropTypes.object.isRequired,
};
