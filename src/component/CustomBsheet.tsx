import {View, Text, StyleSheet, Dimensions } from 'react-native'
import React, {useEffect, useCallback, useImperativeHandle,useContext} from 'react'
import { GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated,{useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated'
import Feather from '@expo/vector-icons/Feather';
import { AuthContext } from '../utils/authContext';





type Custom = {
Ref: any,
children: React.ReactNode,
title: string

}



export const {height: SCREEN_HEIGHT} = Dimensions.get('window')





const CustomBsheet = ({children ,Ref, title}:Custom ) => {

const translateY = useSharedValue(0)
const context = useSharedValue({y: 0})
const rotY = useSharedValue(0)
const active = useSharedValue(false)
const {theme} = useContext(AuthContext)




useEffect(() => {
translateY.value = withSpring(-(SCREEN_HEIGHT / 7),{
mass:30,
damping:30
})
},[])



const ScrollTo = useCallback((dest:number) => {
'worklet';
translateY.value = withSpring(dest)

},[])


useImperativeHandle(Ref,() => ({ScrollTo}), [])




const anistyle = useAnimatedStyle(() => {
return {
transform:[{translateY: translateY.value}]
}
})


const iconstyle = useAnimatedStyle(() => {
return {
transform:[{rotate: `${rotY.value}deg`}]
}
})

const bkdropstyle  = useAnimatedStyle(() => {
  return {
    opacity: withTiming(active.value ? 1 : 0, {duration:1000})
  }
})











const gesture = Gesture.Pan().onStart(() => {
context.value  = {y: translateY.value}
}).onUpdate((event) => {
rotY.value = 180
active.value = true
translateY.value = event.translationY + context.value.y
translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT)
if (event.translationY > 1.5 && translateY.value >= -(SCREEN_HEIGHT / 7) ) {
translateY.value = -(SCREEN_HEIGHT / 7)
active.value = false
}





}).onEnd((event) => {
if (event.translationY < -1.5 && translateY.value <= -(SCREEN_HEIGHT / 7)) {
ScrollTo(-SCREEN_HEIGHT / 1.6)


} if (event.translationY < -1.5 && translateY.value <= -(SCREEN_HEIGHT / 1.6)) {
ScrollTo(-(SCREEN_HEIGHT- 60))


} if (event.translationY > 1.5 &&  translateY.value <= -(SCREEN_HEIGHT  / 2)) {
ScrollTo(-SCREEN_HEIGHT / 1.6)


} if (event.translationY > 1.5 &&  translateY.value <= -(SCREEN_HEIGHT  / 2.6)) {
ScrollTo(-SCREEN_HEIGHT / 1.6)

} if (event.translationY >= 200  &&  translateY.value > -(SCREEN_HEIGHT  / 2.6)) {
ScrollTo( -(SCREEN_HEIGHT / 7))
rotY.value = 0
active.value = false



}
})




return (
<>
<Animated.View  style={[{...StyleSheet.absoluteFillObject, backgroundColor:'rgba(0,0,0,0.8)'}, bkdropstyle]}>

</Animated.View>
<GestureDetector gesture={gesture}>
<Animated.View style={[styles.bscontainer, anistyle, {backgroundColor:theme === 'dark' ?'#5e5e5e':'#EAE8E8'}]} ref={Ref}>
<View style={[styles.thead, {backgroundColor:theme === 'dark' ? '#20394f': '#1c568c'}]}>
<Text style={styles.ttext}>{title}</Text>
<Animated.View style={iconstyle}>
<Feather name="chevrons-up" size={15} color="azure" />
</Animated.View>
</View>
{children}
</Animated.View>
</GestureDetector>
</>
)
}












const styles = StyleSheet.create({
bscontainer: {
flex:1,
borderRadius:15,
width:'100%',
height:SCREEN_HEIGHT,
position: 'absolute',
top:SCREEN_HEIGHT,
justifyContent:'flex-start',
alignItems:'center'
},
thead: {
borderRadius:8,
flexDirection:'row',
columnGap:10,
height:50,
width:'100%',
justifyContent:'center',
alignItems:'center',
marginTop:2,
marginBottom:5
},
ttext: {
fontSize:17,
color:'azure',

}
});


export default CustomBsheet