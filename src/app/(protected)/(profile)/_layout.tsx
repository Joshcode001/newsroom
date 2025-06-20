import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Drawer } from 'expo-router/drawer';
import { TouchableOpacity } from 'react-native';
import { colors } from '@/src/utils/authContext';
import { AuthContext } from '@/src/utils/authContext';
import { useContext } from 'react';








export default function Layout() {
const {theme} = useContext(AuthContext)
const Acolor = colors

return (
<GestureHandlerRootView style={{ flex: 1 }}>
<Drawer screenOptions={({navigation})=> ({
headerLeft: () => <TouchableOpacity style={{marginLeft:15}} onPress={()=> navigation.toggleDrawer()}>
<MaterialIcons name="settings-suggest" size={29} color="#ebebed" />
</TouchableOpacity> ,
drawerHideStatusBarOnOpen:true,
drawerStatusBarAnimation:'slide',
drawerActiveTintColor:theme === 'dark' ? 'azure' : 'blue',
drawerStyle:{
width: 300,
backgroundColor:theme === 'dark' ? '#c9c9c9' : 'white'
},
headerStyle:{
 backgroundColor: theme === 'dark' ? Acolor.dark.secondary : Acolor.light.secondary
},
drawerActiveBackgroundColor:theme === 'dark' ? '#0c5950' : '#a7dbd5'
})}>
<Drawer.Screen name='fourth' options={{
drawerLabel:'Profile',
title:'',
drawerIcon:() => <MaterialIcons name="account-circle" size={21} color="#3a1670" />


}}/>
<Drawer.Screen name='sixth'options={{
drawerLabel:'Settings',
title:'',
drawerIcon:() => <MaterialIcons name="app-settings-alt" size={21} color="#3a1670" />
}}/>
<Drawer.Screen name='seventh'options={{
drawerLabel:'Subscription',
title:'subscribe',
drawerIcon:() => <FontAwesome name="credit-card" size={21} color="#3a1670" />
}}/>
<Drawer.Screen name='eighth'options={{
drawerLabel:'Saved',
title:'My Saved',
drawerIcon:() => <MaterialIcons name='save' size={21} color="#3a1670" />
}}/>
</Drawer>
</GestureHandlerRootView>
);
}
