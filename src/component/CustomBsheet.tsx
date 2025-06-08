import {View, Text, StyleSheet, Dimensions } from 'react-native'
import React, {useEffect, useCallback, useImperativeHandle, useState} from 'react'
import { GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated,{useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'
import Feather from '@expo/vector-icons/Feather';





  type Custom = {
  Ref: any,
  children: React.ReactNode,
  title: string

}



const {height: SCREEN_HEIGHT} = Dimensions.get('window')





const CustomBsheet = ({children ,Ref, title}:Custom ) => {

const translateY = useSharedValue(0)
const context = useSharedValue({y: 0})
const rotY = useSharedValue(0)




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











  const gesture = Gesture.Pan().onStart(() => {
    context.value  = {y: translateY.value}
  }).onUpdate((event) => {
      rotY.value = 180
    translateY.value = event.translationY + context.value.y
    translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT)
    if (event.translationY > 1.5 && translateY.value >= -(SCREEN_HEIGHT / 7) ) {
        translateY.value = -(SCREEN_HEIGHT / 7)
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
      
        
        
    }
  })




  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bscontainer, anistyle]} ref={Ref}>
        <View style={styles.thead}>
                <Text style={styles.ttext}>{title}</Text>
                <Animated.View style={iconstyle}>
                  <Feather name="chevrons-up" size={15} color="azure" />
                </Animated.View>
              </View>
        {children}
      </Animated.View>
    </GestureDetector>
  )
}












const styles = StyleSheet.create({
  bscontainer: {
    flex:1,
    backgroundColor: '#EAE8E8',
  borderRadius:15,
    width:'100%',
    height:SCREEN_HEIGHT,
    position: 'absolute',
    top:SCREEN_HEIGHT,
    justifyContent:'flex-start',
    alignItems:'center'
  },
thead: {
  borderRadius:15,
    flexDirection:'row',
    columnGap:10,
    height:50,
    width:'100%',
    backgroundColor:'#dbb5b2',
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