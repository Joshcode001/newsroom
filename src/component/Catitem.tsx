import { Text,StyleSheet,TouchableOpacity,FlatList, ViewToken} from "react-native";
import Animated, { AnimatedRef, useAnimatedStyle, useSharedValue, SharedValue, withTiming} from 'react-native-reanimated'
import React, {} from 'react'






type item = {
item: string,
color: string
}

type cat = {
router: any,
selectedC: string,
icon: string,
Ref: any,
isC?: string,
isActive: boolean,
category: string,
color: string,
Views: SharedValue<ViewToken<item>[]>,
item: any
}



const Catitem = ({Ref,isActive, isC,router,selectedC,icon, category, color, Views, item}:cat) => {


const rstyle = useAnimatedStyle(() => {
const isVisible = Boolean(
Views.value.filter((item) => item.isViewable).find((vitem) =>vitem.item.color === item.color )
)

return {
opacity: withTiming(isVisible ? 1 : 0.5),
transform: [{scale: withTiming(isVisible ? 1 : 0.2)}] 
}
})









return (
<TouchableOpacity style={{alignSelf:'center'}}
ref={Ref} disabled={isActive}
onPress={()=>{
Ref.current = category
router.push({
pathname: '/[category]',
params:{
country:selectedC,
Category:Ref.current,
icon:icon,
}
})
}}>
<Animated.View style={[styles.nav,{shadowColor: (isC === category) ? '#E51807': '#000'}, {backgroundColor:color}, rstyle]}>
<Text style={styles.coloaz}>{category}</Text>
</Animated.View>
</TouchableOpacity>
)
}











const styles = StyleSheet.create({
nav: {
width:100,
justifyContent:'center',
alignItems: 'center',
marginHorizontal:20,
borderRadius: 20,
height:45,
shadowColor: '#000',
shadowOffset: {
width: 6,
height: 4,
},
shadowOpacity: 0.50,
shadowRadius: 4,
elevation: 10,
},

coloaz: {
color:'azure'
},


})








export default Catitem