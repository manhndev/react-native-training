
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';

import { normalizeMessage } from '../../utils';
import { navigate } from '../../actions/nav';
import { getPhotos } from '../../actions/photo';
import { addPhoto } from '../../actions/photo';
import Card from './Card/Card';
import RNActionCable from 'react-native-actioncable';
import ActionCableProvider, { ActionCable } from 'react-actioncable-provider';

const cable = RNActionCable.createConsumer('ws://192.168.1.157:3000/cable')

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: 'white'
  },
  item: {
    backgroundColor: 'white',
    padding: 0,
    marginBottom: 10,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width *4/7,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 10,
    color: '#555'
  },
  description: {
    paddingLeft: 10,
  }
});

class ListTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      items : this.props.items
    };
    // cable.subscriptions.create('PhotosChannel', {
    //   received(data) {
    //     //this.props.addPhoto(normalizeMessage(data.message));
    //     console.log(data)
    //   }
    // })
  }


  onReceived = (data) => {
    var item = normalizeMessage(data.message)
    this.setState({
			items: [
				item,
				...this.state.items
			]
		})


	}

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.getPhotos().then(() => {
      this.setState({refreshing: false});
    });
  }

  componentWillMount() {
    this.props.getPhotos().then(() => {
      this.setState({
        items : this.props.photos,
      })
    });
  }

  onPress(item) {
    this.props.navigate({ routeName: "Photo", params: { item: item } });
  }

  render() {
    //const { items } = this.state;
    return (
      <ActionCableProvider cable={cable}>
        <ActionCable channel={{channel: 'PhotosChannel'}} onReceived={this.onReceived} />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        style={styles.container}
        data={ this.state.items }
        renderItem={({item}) =>
          <Card item={item} />
        }
        keyExtractor={(item, index) => item.id}
      />
     </ActionCableProvider>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.photo.photos,
  accessToken: state.user.accessToken
});

const mapDispatchToProps = dispatch => ({
  navigate: (route) => dispatch(navigate(route)),
  getPhotos: () => dispatch(getPhotos()),
  addPhoto: (data) => dispatch(addPhoto(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListTab);
