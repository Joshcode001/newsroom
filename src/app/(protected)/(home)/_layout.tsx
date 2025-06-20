import { Stack} from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/src/utils/authContext";

export default function RootLayout() {
const {theme} = useContext(AuthContext)
return <Stack screenOptions={{
headerStyle:{
backgroundColor:theme === 'dark' ? '#041c1a': '#0d2e2b'

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