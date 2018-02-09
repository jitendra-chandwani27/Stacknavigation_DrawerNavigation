import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation'; // 1.0.0-beta.27

const LogoTitle =(props)=> {

    return (
      <TouchableOpacity onPress={props.onPress}>
        <Image source={require('/home/ranosys/App/menu.png')} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
    );
  }


class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle onPress={()=>this.props.navigation.navigate('DrawerOpen')}/>,
    drawerLabel: 'Home',

    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('/home/ranosys/App/home.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),

    //title: "Home",
    headerRight: (
      <Button onPress={() => alert("Button Pressed")} title="Info" color="#db976d" />
    )
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Profile" onPress={() => {
          this.props.navigation.navigate('Profile', { Title: 'Profile', Name: 'Jitendra Chandwani', Age: 22, });
        }}
        />
      </View>
    );
  }
}

// Profile Screen
class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.Title : 'A Nested Details Screen',
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    }
  };
  
  render() {
    const { params } = this.props.navigation.state;
    const Name = params ? params.Name : null;
    const Age = params ? params.Age : null;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
        <Text>Name : {JSON.stringify(Name)}</Text>
        <Text>Age : {JSON.stringify(Age)}</Text>

        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
        {/* Manually back Button */}
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}


class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('/home/ranosys/App/bell-ring.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  render() {
    return (
      <Text> Notifications </Text>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const MyApp = DrawerNavigator({
  Home: { screen: HomeScreen },
  Notifications: { screen: MyNotificationsScreen },
});

const RootStack = StackNavigator({
  // Screens
  Home: { screen: MyApp },
  Profile: { screen: ProfileScreen },
},
  // Initial Screens
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#edbcb4',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);
// navigation container which contain screens
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}


