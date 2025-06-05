import { View, Text, StyleSheet,Pressable ,StatusBar} from 'react-native'
import React, {useContext}from 'react'
import { AuthContext } from '../utils/authContext'

const login = () => {
  const authState = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      <View style={styles.content}>
        <Text>Login Screen</Text>
          <Pressable onPress={authState.LogIn}>
            <Text style={styles.box}>LOGIN</Text>
          </Pressable>
      </View>
    </View>
  )
}

export default login








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