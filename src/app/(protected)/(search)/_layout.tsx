import React from 'react'
import { Stack } from 'expo-router'



export default function RootLayout() {
return <Stack screenOptions={{
headerShown:false,
animation:'none',
}}>
<Stack.Screen  name='second' options={{
title:''
}}/>
<Stack.Screen  name='[paged]' options={{
title:'' }}/>
<Stack.Screen  name='quick/[name]' options={{
title:''
}}/>
<Stack.Screen  name='delay/[pagef]' options={{
title:''
}}/>
</Stack>
}