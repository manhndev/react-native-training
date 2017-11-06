
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { loginWithFacebook } from '../../actions/user';
import { resetRoute } from '../../actions/nav';
import Spinner from 'react-native-loading-spinner-overlay';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#007B7F'
  },
  title: {
    fontSize: 27,
    color: '#E2E2E2',
    marginBottom: 100,
    alignSelf: 'center',
  },
  button: {
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#E2E2E2',
  },
  buttonText: {
    fontSize: 15,
  },
  icon: {
    marginRight: 15,
  },
});

class AuthenticationScreen extends Component {

  constructor(props) {
    super();
    this.state = {
      visible: false
    };
  }

  componentWillMount() {
    const { resetRoute, accessToken } = this.props;
    if (accessToken) {
      resetRoute({ routeName: 'Main'});
    }
  }

  onFBAuth() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken()
          .then(data => {
            this.setState({
              visible: true
            });
            this.props.loginWithFacebook(data.accessToken.toString()).then(() => {
              this.setState({
                visible: false
              });
            })
          })
        }
      },
      function(error) {
        alert('Login fail with error: ' + error);
      }
    );
  }

  render() {
    const { accessToken, login, logout } = this.props;

    return (
      <View style= {styles.container} >
        <Text style= { styles.title }>Say hello NUS Insta</Text>
        <TouchableOpacity
          style= {styles.button}
          onPress= { () => this.onFBAuth() }>
            <Icon name="logo-facebook" size= {25} color="#007B7F" style={styles.icon} ></Icon>
            <Text style={styles.buttonText}>Login with Facebook</Text>
        </TouchableOpacity>
        <Spinner
          visible={this.state.visible}
          animation={"fade"} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken
});

const mapDispatchToProps = dispatch => ({
  loginWithFacebook: (facebookAccessToken) => dispatch(loginWithFacebook(facebookAccessToken)),
  resetRoute: (route) => dispatch(resetRoute(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationScreen);
