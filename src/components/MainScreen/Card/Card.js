import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import CardInfo from './CardInfo';
import CardFunc from './CardFunc';
import { favorite } from '../../../actions/photo';

const DEFAULT_SIZE = 12;
const IMAGE_SIZE = 40;
const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    },
    marginBottom: DEFAULT_SIZE,
    marginRight: DEFAULT_SIZE,
    marginLeft: DEFAULT_SIZE,
  },
  container: {
    flex: 1,
  },
  content: {
    marginTop: 4,
    height: Dimensions.get('window').width *4/7,
  },
});

class Card extends Component {

  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      item : item,
      isFavorite: item.isFavorite
    }
  }

  onFavorite() {
    this.setState({ isFavorite: !this.state.isFavorite })
    this.props.favorite(this.props.item.id)
  }

  render() {
    const { item } = this.props;
    return (
      <View style={ styles.card }>
          <View>
            <View style={styles.container}>
              <Image source={{ uri: item.image }} style={styles.content} />
              <CardFunc
                onPress = { () => { this.onFavorite() } }
                item={item}
                style={styles.cardInfo}
                isFavorite={this.state.isFavorite} />
              <CardInfo item={item} style={styles.cardInfo}/>
            </View>
          </View>
      </View>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  favorite: (photoID) => dispatch(favorite(photoID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
