import { View ,StyleSheet,FlatList, ViewToken, Dimensions} from "react-native";
import Animated, { AnimatedRef,  useSharedValue} from 'react-native-reanimated'
import React, {} from 'react'
import Catitem from "./Catitem";
const SCREEN_WIDTH = Dimensions.get('window').width




type item = {
item: string,
color: string
}

type natag = {
router: any,
selectedC: string,
icon: string,
Ref: any,
isC?: string,
isActive: boolean,
data: item[],
animatedRef:AnimatedRef<FlatList<any>>

}






const CustomNav = ({ router,selectedC,Ref, icon,  isC, isActive, data, animatedRef}:natag) => {



const Views = useSharedValue<ViewToken<item>[]>([])





return (

<View style={styles.navcon}>
<Animated.FlatList onViewableItemsChanged={({viewableItems}) => {Views.value = viewableItems}}  data={data} ref={animatedRef} renderItem={({item}) => <Catitem  item={item} Views={Views} router={router} selectedC={selectedC} Ref={Ref} icon={icon} isC={isC} isActive={isActive} category={item.item} color={item.color}/>} showsHorizontalScrollIndicator={false} horizontal={true}  />
</View>

)
}










export default CustomNav









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

navcon:{
justifyContent:'center',
alignItems:'center',
alignContent:'center',
width:SCREEN_WIDTH,
height:'100%'
}
})