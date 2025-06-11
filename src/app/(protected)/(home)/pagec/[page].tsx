import { View, Text, StyleSheet, FlatList ,Pressable,TouchableOpacity,ActivityIndicator} from 'react-native'
import React,{useState, useRef, useEffect, useContext} from 'react'
import { useLocalSearchParams, Stack,useRouter } from 'expo-router'
import { Navbar, Newsitem } from '..'
import AntDesign from '@expo/vector-icons/AntDesign';
import { CountryTagg } from '../[category]' 
import { AuthContext } from "@/src/utils/authContext";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'






type res = {
title: string,
sourcen: string,
source_icon: string,
pubDate: string,
image_url: string,
description: string,
link: string,
article_id: string
}









const page = () => {
const authState = useContext(AuthContext)
const ScrollRef = useRef<FlatList>(null)
const [isLoading, setisLoading] = useState(false)
const [nextPage, setnextPage] = useState('')
const [Post, setPost] = useState<res[]>([])
const ref = useRef(null)
const router = useRouter()
const {country,category,page,icon} = useLocalSearchParams()



let con:string = '';
let cgory:string = '';
let pag:string = ''
let econ:string = ''
if (typeof country === 'string') {
con = country
}
if (typeof category === 'string') {
cgory = category;
}
if (typeof page === 'string') {
pag = page;
}
if (typeof icon === 'string') {
econ = icon;
}







const getNNews = async (nm:string,cte:string,pn:string) => {
try {
setisLoading(true)
const resp = await fetch(`https://newsdata.io/api/1/latest?country=${nm}&category=${cte}&image=1&page=${pn}`, {
method: 'GET',
headers: {
'X-ACCESS-KEY': 'pub_69410d56c49515d9f48a36495db4edf051d57',
'User-Agent': 'Joshapp/1.0'
}
})
const json = await resp.json()
setisLoading(false)
setnextPage(json.nextPage)
setPost(json.results)

} catch(err){
console.log(err)
}

}

useEffect(() => {
getNNews(econ,cgory,pag);
}, [])




const lth = useSharedValue(0)

const anistyle = useAnimatedStyle(()=> {
return{
transform:[{translateX:lth.value}]
}
}, [])














return (
<View style={styles.container}>
<Stack.Screen options={{
title:'',
headerRight:() => <CountryTagg  sname={con} icon={econ}/>,
headerLeft: () => <Pressable onPress={()=> router.back()}>
<View style={styles.backbox}><AntDesign name="left" size={20} color="azure" /></View>
</Pressable>,
animation:'none',

}}/>
<View style={styles.navbar}>
<Navbar  ScrollRef={ScrollRef} router={router} anistyle={anistyle} Ref={ref} icon={econ} selectedC={con}  isC={cgory} isActive={false} data={authState.category}/>
</View>

<View style={styles.content}>
{isLoading ? (<ActivityIndicator animating={true} color='#15389A' size={20} />) : (
<FlatList data={Post} renderItem={
({item}) => <Newsitem title={item.title} sourcen={item.sourcen}
source_icon={item.source_icon}
link={item.link} image_url={item.image_url} description={item.description} 
pubDate={item.pubDate} article_id={item.article_id}/>
} keyExtractor={item => item.article_id} ListFooterComponent={()=> <View style={styles.foot}>
<TouchableOpacity disabled={nextPage === null}
onPress={() => {
router.push({
pathname: '/pagec/[page]',
params:{
country:con,
category: cgory,
page:nextPage,
icon:econ,
}

})
}}>
<Text>Load More...</Text>

</TouchableOpacity>
</View> }/>
)}
</View>
<View style={styles.desc}>
</View>
</View>
)
}








const styles = StyleSheet.create({
container:{
flex: 1,
justifyContent: "center",
alignItems: "center",
},
countrytag: {
backgroundColor:'#66676F',
width:200,
height:30,
justifyContent: 'center',
alignItems:'center',
flexDirection: 'row',
columnGap: 10
},
countryn: {
color:'azure'
},
navbar: {
flex: 0.8,
backgroundColor:'#dcdcdc',
width:500,
justifyContent: 'center',
alignItems:'center',
paddingTop:10,


},

content: {
flex: 9.2,
backgroundColor:'#EDEDED',
width:700,
maxHeight:2000,
justifyContent: 'center',
alignItems:'center',
alignContent:'center'

},
foot: {
backgroundColor:'white',
width:700,
height:50,
justifyContent: 'center',
alignItems:'center'
},

backbox: {
width:100,
height:30,
justifyContent:'center',
alignItems:'flex-start',
},
desc: {
width:400,
padding:40,
fontSize:20,
letterSpacing:2,
color:'azure'
},

})















export default page