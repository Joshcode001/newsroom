import { Tabs,Redirect} from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { AuthContext } from "@/src/utils/authContext";
import { useContext } from "react";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";




export default function RootLayout() {
const authState = useContext(AuthContext)


    if (!authState.isLoggedIn) {
        return <Redirect href='/login'/>
    }




  return <Tabs screenOptions={{
    tabBarActiveTintColor:'#40514E',
    tabBarInactiveTintColor: '#C5C5C5',
    tabBarStyle:{position: 'absolute'},
    tabBarBackground:() => (
      <BlurView  tint="dark" intensity={60} style={StyleSheet.absoluteFill}/>
    )
  }}>
    <Tabs.Screen name='(home)' options={{
      title:'Home',
      tabBarLabel:'Home',
      tabBarIcon: ({color}) => <MaterialCommunityIcons name="home" size={24} color={color} />,
      headerShown:false,
      popToTopOnBlur:true
    }}></Tabs.Screen>
    <Tabs.Screen  name='second' options={{
      title:'Search',
      tabBarLabel: 'Search',
      headerShown:false,
      tabBarIcon: ({color}) => <MaterialCommunityIcons name="search-web" size={24} color={color} />
    }}></Tabs.Screen>
    <Tabs.Screen  name='third' options={{
      title:'Videos',
      tabBarLabel: 'Watch',
      tabBarIcon: ({color}) => <Entypo name="folder-video" size={24} color={color} />
    }}></Tabs.Screen>
    <Tabs.Screen  name='(profile)' options={{
      title:'Profile',
      tabBarLabel: 'Profile',
      tabBarIcon: ({color}) => <MaterialCommunityIcons name="account" size={24} color={color} />
    }}></Tabs.Screen>
  </Tabs>;
}
