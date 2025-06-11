
import React from 'react'
import { Stack } from 'expo-router'
import { AuthProvider } from '../utils/authContext'

export default function RootLayout() {
  return <AuthProvider>
    <Stack screenOptions={{
    headerShown:false
  }}>
    <Stack.Screen name='login' options={{
      title:'login'
    }}/>
    <Stack.Screen  name= '(protected)' options={{
      title:''
    }}/>
  </Stack>
  </AuthProvider>
}