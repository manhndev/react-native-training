
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';

import { uploadPhoto } from '../../actions/photo';
import { navigate, resetRoute } from '../../actions/nav';

import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { Hoshi } from 'react-native-textinput-effects';

import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F6'
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width *4/7,
  },
  buttonView:{
    paddingTop: 40,
    alignItems: 'center',

  },
  button: {
    height: 47,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: '#EF5350',
  },
  buttonText: {
    fontSize: 15,
    color: '#FFF'
  },
});

class UploadDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      description: '',
      visible: false,
    };

  }

  onSubmitPhoto() {
    const { accessToken } = this.props;
    const { text, description } = this.state;
    const image = this.props.navigation.state.params.image;

    if (text != '' && description != '') {
      this.setState({
        visible: true,
      });
      this.props.uploadPhoto(image, text, description, accessToken).then(() => {
        this.setState({
          visible: false,
        });
        const backAction = NavigationActions.back({
          key: null,
        })
        this.props.navigation.dispatch(backAction)
      })
    } else {
      alert('Enter Title and Description')
    }
  }

  render() {
    const image = this.props.navigation.state.params.image;
    return (
      <ScrollView style={styles.container}>
        <View>
          <Image source={image} style={styles.image}/>
            <Hoshi
              label={'Title'}
              borderColor={'#b76c94'}
              backgroundColor={'#F9F7F6'}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />

            <Hoshi
              label={'Description'}
              borderColor={'#b76c94'}
              backgroundColor={'#F9F7F6'}
              onChangeText={(description) => this.setState({description})}
              value={this.state.description}
            />
          <View style={ styles.buttonView } >
            <TouchableOpacity
              style= {styles.button}
              onPress= { () => this.onSubmitPhoto() }>
                <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
          </View>
          <Spinner
            visible={this.state.visible}
            animation={"fade"} />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.photo.photos,
  accessToken: state.user.accessToken
});

const mapDispatchToProps = dispatch => ({
  navigate: (route) => dispatch(navigate(route)),
  uploadPhoto: (avatarSource, text, description, accessToken) => dispatch(uploadPhoto(avatarSource, text, description, accessToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadDetails);
