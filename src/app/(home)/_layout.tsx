import { Stack} from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{
    headerStyle:{
      backgroundColor:'#002312',
      
    }
  }}>
    <Stack.Screen name='index' options={{
      title:'Home'
    }}></Stack.Screen>
    <Stack.Screen name='fifth' options={{
      title:'page b'
    }}></Stack.Screen>
    <Stack.Screen name='eight' options={{
      title:'Page C'
    }}></Stack.Screen>
  </Stack>

}