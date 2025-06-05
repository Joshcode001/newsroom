import { Stack} from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name='fourth' options={{
      title: 'account'
    }}></Stack.Screen>
    <Stack.Screen name='sixth' options={{
      title: 'profile'
    }}></Stack.Screen>
    <Stack.Screen name='seventh' options={{
      title: 'subscription'
    }}></Stack.Screen>
  </Stack>
}