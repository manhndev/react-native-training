
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { login, logout } from '../../actions/user';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#555',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  menuButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 20,
  },
  menuButtonText: {
    fontSize: 20,
  },
});

class UserTab extends Component {

  state = {
    name: ''
  }

  render() {
    const { accessToken, login, logout } = this.props;
    const profile = this.props.profile || {}
    return (
      <ScrollView style = {styles.container}>
          <View style = {styles.profile}>
            <Text style = {styles.name}>{profile.email}</Text>
            <Image style = {styles.avatar} source = {{ uri: profile.avatar }} />
          </View>
          <TouchableOpacity
            onPress = {() => this.props.logout()} style = {styles.menuButton} >
            <Text>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  login: (name) => dispatch(login(name)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTab);
