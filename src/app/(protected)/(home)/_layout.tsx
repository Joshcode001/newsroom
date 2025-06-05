import { Stack} from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{
    headerStyle:{
      backgroundColor:'#222831',
      
    }
  }}>
    <Stack.Screen name='index' options={{
      title:'Home'
    }}></Stack.Screen>
    <Stack.Screen name='page/[page]' options={{
      title:'page b'
    }}></Stack.Screen>
    <Stack.Screen name='[category]' options={{
      title:'Page C'
    }}></Stack.Screen>
    <Stack.Screen name="pagec/[page]" options={{
      title:''
    }}></Stack.Screen>

  </Stack>

}