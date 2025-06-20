import { View, Text, StyleSheet,Pressable } from 'react-native'
import React , {useContext}from 'react'
import { AuthContext } from '@/src/utils/authContext'

const fourth = () => {
const authState = useContext(AuthContext)

return (
<View style={styles.container}>
<View style={styles.content}>
<Text>fourth screen</Text>
<Pressable onPress={authState.LogOut}>
<Text style={styles.box}>LOG OUT</Text>
</Pressable>
</View>
</View>
)
}

export default fourth





const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",

},
content:{
justifyContent:'center',
alignItems:'center',
backgroundColor:'grey',
textAlign:'center',
width:400,
height:400
},
box:{
backgroundColor:'teal',
color:'azure'
}
})