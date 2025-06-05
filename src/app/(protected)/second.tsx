import { View, Text,StyleSheet,TextInput,TouchableOpacity  } from 'react-native'
import React  from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { GestureHandlerRootView } from 'react-native-gesture-handler';







const SearchBar = () => (
  
  <View style={styles.searchbox}>
    <TextInput style={styles.input} placeholder="write here" />
    <TouchableOpacity style={styles.buttonbox}>
    <FontAwesome5 name="search" size={24} color="azure" />
    </TouchableOpacity>
  </View>
)













const second = () => {



  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
      <View style={styles.head}>
      <SearchBar />
    </View>

    <View  style={styles.content}>
      <Text>second screen</Text>
    </View>
   
    </View>
    </GestureHandlerRootView>
  )
}

export default second



















const styles = StyleSheet.create({

container: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  width:'100%',
  backgroundColor:'white'
  },
  head: {
    flex:1.7,
    justifyContent: "center",
  alignItems: "center",
  },
  content: {
    backgroundColor:'white',
    flex:8.3,
    justifyContent: "center",
  alignItems: "center",
  width:'100%'
  },
  searchbox: {
    flexDirection:'row',
justifyContent: "center",
  alignItems: "flex-end",
  width:400,
  height:150,
  columnGap:10,
  paddingBottom:20
  },
  input: {
    justifyContent: "center",
  alignItems: "center",
  backgroundColor:'#B0ADAD',
  width:310,
  height:50,
  borderRadius:50,
  textAlign:'center',
  color:'azure',
  fontSize:22,
  marginRight:8
  },
  button: {
justifyContent: "center",
  alignItems: "center",
  },
  buttonbox: {
justifyContent: "center",
  alignItems: "center",
  backgroundColor:'#7fd1ae',
  padding:10,
  marginBottom:2
  },
  container2: {
    // flex: 1,
    backgroundColor: 'black',
  },
  contentContainer: {
    // flex: 1,
    padding: 36,
    alignItems: 'center',
    backgroundColor:'grey'
  },
})