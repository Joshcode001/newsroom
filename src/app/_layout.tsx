import { Tabs} from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';


export default function RootLayout() {
  return <Tabs screenOptions={{
    tabBarActiveTintColor:'tomato',
    tabBarInactiveTintColor: 'grey',
  }}>
    <Tabs.Screen name='(home)' options={{
      title:'Home',
      tabBarLabel:'Home',
      tabBarIcon: ({color}) => <MaterialCommunityIcons name="home" size={24} color={color} />,
      headerShown:false
    }}></Tabs.Screen>
    <Tabs.Screen  name='second' options={{
      title:'Search',
      tabBarLabel: 'Search',
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
