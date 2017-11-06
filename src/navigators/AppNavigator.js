
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, View, BackHandler } from 'react-native';
import { addNavigationHelpers, StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';

import ListTab from '../components/MainScreen/ListTab';
import UserTab from '../components/MainScreen/UserTab';
import PhotoTab from '../components/UploadPhotoScreen';
import PhotoScreen from '../components/PhotoScreen';
import UploadDetails from '../components/UploadPhotoScreen/UploadDetails';
import AuthenticationScreen from '../components/AuthenticationScreen';

import Icon from 'react-native-vector-icons/Ionicons';

const tabConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: '#FF5A60',
    inactiveTintColor: '#3A3A3A',
    labelStyle: {
      fontSize: 10,
      fontWeight: 'bold'
    },
    tabStyle: {
      paddingBottom: 10,
      borderTopWidth: 1,
      borderTopColor: 'lightgray',
      backgroundColor: 'white'
    },
    style: {
      backgroundColor: 'white',
    },
  },
}

export const MainScreen = TabNavigator({
  List: {
    screen: ListTab,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({focused, tintColor}) => <Icon name={'md-home'} size={30} color={tintColor}/>
    }
  },
  Add: {
    screen: PhotoTab,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({focused, tintColor}) => <Icon name={'md-add-circle'} size={30} color={tintColor}/>
    }
  },
  User: {
    screen: UserTab,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({focused, tintColor}) => <Icon name={'md-person'} size={30} color={tintColor}/>
    }
  },
}, tabConfig);

export const AppNavigator = StackNavigator({
  AuthenticationScreen: {
    screen: AuthenticationScreen,
    navigationOptions: {
      header: null,
    }
  },
  Main: {
    screen: MainScreen,
    navigationOptions: {
      title: null,
    }
  },
  Photo: {
    screen: PhotoScreen,
    navigationOptions: (props) => ({
      title: props.navigation.state.params.item.title,
    })
  },
  UploadDetails: {
    screen: UploadDetails,
    navigationOptions: (props) => ({
      title: "Photo",
    })
  },
});

class AppWithNavigationState extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#007B7F"/>
        <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

const mapDispatchToProps = dispatch => ({
  dispatch: (action) => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);
