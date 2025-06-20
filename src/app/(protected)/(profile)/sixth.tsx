import { View, Text, StyleSheet , ScrollView, Switch, TouchableOpacity} from 'react-native'
import React, {useContext} from 'react'
import { colors } from '@/src/utils/authContext'
import { AuthContext } from '@/src/utils/authContext'
import { SCREEN_WIDTH } from '../(home)'
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';




type col = {
light:{
primary: string,
secondary:string,
tertiary: string,
accent: string,
tint:string,
base: string
},
dark:{
primary: string,
secondary:string,
tertiary: string,
accent: string,
tint:string,
base: string
}
}


const settings = () => {



const {theme, toggleTheme, isSys, useSystem} = useContext(AuthContext)
const Acolor:col = colors









return (
<ScrollView showsVerticalScrollIndicator={false}>
<View style={[styles.container,{backgroundColor: theme === 'dark' ? Acolor.dark.base: Acolor.light.base}]}>
<View style={styles.subcont}>
<Text style={[styles.mtxt, {color:  theme === 'dark' ? Acolor.light.primary : Acolor.dark.primary }]}>Theme Switch</Text>
<View style={[styles.cont,{backgroundColor:theme === 'dark' ? Acolor.dark.primary: Acolor.light.primary}]}>
<Text style={[styles.ctxt,{color:  theme === 'dark' ? Acolor.light.primary : Acolor.dark.primary}]}>Dark Mode</Text>
<Switch  value={theme === 'dark'} onValueChange={() => toggleTheme(theme ==='light' ? 'dark': 'light')}/>
</View>
</View>



<View style={styles.subcont}>
<Text style={[styles.mtxt,{color:  theme === 'dark' ? Acolor.light.primary : Acolor.dark.primary}]}>Theme Settings</Text>
<TouchableOpacity onPress={()=> toggleTheme('light')}>
<View style={[styles.cont,{backgroundColor:theme === 'dark' ? Acolor.dark.primary: Acolor.light.primary}]}>
<View style={styles.label}>
{(theme === 'dark') ? (<Foundation name="lightbulb" size={14} color='white'  />):(<Foundation name="lightbulb" size={14} color='black'  />)}

<Text style={[styles.ctxt,{color:  theme === 'dark' ? Acolor.light.primary : Acolor.dark.primary}]}>Light</Text>
</View>
{((theme === 'light' && !isSys) ? (<FontAwesome5 name="check-circle" size={20} color="#252526" />): (<FontAwesome5 name="circle" size={20} color="grey" />))}
</View>
</TouchableOpacity>





<TouchableOpacity onPress={()=> toggleTheme('dark')}>
<View style={[styles.cont,{backgroundColor:theme === 'dark' ? Acolor.dark.primary: Acolor.light.primary}]}>
<View style={styles.label}>
{((theme === 'dark') ? (<MaterialIcons name="dark-mode" size={14} color="white" />) : (<MaterialIcons name="dark-mode" size={14} color="black" />))}

<Text style={[styles.ctxt,{color:  theme === 'dark' ? Acolor.light.primary : Acolor.dark.primary}]}>Dark</Text>
</View>
{((theme === 'dark' && !isSys) ? (<FontAwesome5 name="check-circle" size={20} color="azure" />): (<FontAwesome5 name="circle" size={20} color="grey" />))}

</View>
</TouchableOpacity>



<TouchableOpacity onPress={() => useSystem()}>
<View style={[styles.cont,{backgroundColor:theme === 'dark' ? Acolor.dark.primary: Acolor.light.primary}]}>
<View style={styles.label}>
{((theme === 'dark') ? (<MaterialCommunityIcons name="theme-light-dark" size={12} color="white" />):(<MaterialCommunityIcons name="theme-light-dark" size={12} color="black" />))}

<Text style={[styles.ctxt,{color:  theme === 'dark' ? Acolor.light.primary : Acolor.dark.primary}]}>System</Text>
</View>
{((isSys && (theme === 'dark' || 'light')) ? (<FontAwesome5 name="check-circle" size={20} color="grey" />): (<FontAwesome5 name="circle" size={20} color="grey" />))}

</View>
</TouchableOpacity>
</View>
</View>
</ScrollView>
)
}

export default settings








const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'flex-start',
alignItems:'center',
width:SCREEN_WIDTH,
height:1500,
flexDirection:'column'
},

subcont: {
justifyContent:'center',
alignItems:'center',
width:'88%',
paddingTop:30

},
cont: {
flexDirection:'row',
justifyContent:'center',
alignItems:'center',
marginBottom:10,
width:'100%',
columnGap:210,
padding:16,
borderRadius:15
},
label:{
flexDirection:'row',
columnGap:5,
justifyContent:'center',
alignItems:'center',
marginRight:60
},

mtxt:{
fontSize:18,
alignSelf:'flex-start',
fontWeight:'bold',
marginBottom:14,
},
ctxt: {
fontSize:15
}

})