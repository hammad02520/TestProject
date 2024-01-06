import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomeScreen from './screen/HomeScreen';
import AddPost from './screen/AddPost';
import FormScreen from './screen/FormScreen';
import * as Font from 'expo-font';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Screens = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'MyFont': require('./fontsfamily/ProductSansRegular.ttf'),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  useEffect(() => {
    const checkFormSubmission = async () => {
      try {
        const formSubmittedValue = await AsyncStorage.getItem('formSubmitted');
        setFormSubmitted(formSubmittedValue === 'true');
      } catch (error) {
        console.error('Error checking form submission status:', error);
      }
    };

    checkFormSubmission();
  }, []);

  if (!fontLoaded) return null;

  const HomeStack = () => {
    return (
      <Tab.Navigator
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" color={color} size={size} />
            ),
            tabBarActiveTintColor: '#442445',
          }}
        />
        <Tab.Screen
          name="Add Post"
          component={AddPost}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="plus" color={color} size={size} />
            ),
            tabBarActiveTintColor: '#442445',
          }}
        />
      </Tab.Navigator>

    );
  };

  return (
    <Stack.Navigator>
      {!formSubmitted && <Stack.Screen name="Form Data" component={FormScreen} />}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="HomeStack"
        component={HomeStack}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Screens />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
