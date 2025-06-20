import { View, Text, StyleSheet, FlatList ,Pressable,TouchableOpacity, ActivityIndicator} from 'react-native'
import React,{useState, useRef, useEffect, useContext} from 'react'
import { useLocalSearchParams, Stack,useRouter } from 'expo-router'
import CountryFlag from 'react-native-country-flag'
import { Newsitem, SCREEN_WIDTH } from '.'
import AntDesign from '@expo/vector-icons/AntDesign';
import { AuthContext } from '@/src/utils/authContext'
import CustomNav from '@/src/component/CustomNav'
import  { useSharedValue, withTiming, useAnimatedRef,scrollTo,useDerivedValue} from 'react-native-reanimated'





type ttag = {
sname: string ,
icon: string 
}

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






export const CountryTagg = ({sname, icon}: ttag) => (
<View style={styles.countrytag}>
<CountryFlag isoCode={icon} size={26} />
<Text style={styles.countryn}>{sname}</Text>
</View>
)



const category = () => {
const animatedRef = useAnimatedRef<FlatList>()
const authState = useContext(AuthContext)
const [result, setResult] = useState(1)
const [isLoading, setisLoading] = useState(false)
const [nextPage, setnextPage] = useState('')
const [Post, setPost] = useState<res[]>([])
const ref = useRef(null)
const router = useRouter()
const {country,Category,icon} = useLocalSearchParams()
const {theme} = authState


let con:string = '';
let cgory:string = '';
let econ:string = '';



if (typeof country === 'string') {
con = country
}
if (typeof Category === 'string') {
cgory = Category;
}
if (typeof icon === 'string') {
econ = icon;
}








const getNNews = async (nm:string,cte:string) => {

try {
setisLoading(true)
const resp = await fetch(`https://newsdata.io/api/1/latest?country=${nm}&category=${cte}&image=1`, {
method: 'GET',
headers: {
'X-ACCESS-KEY': 'pub_69410d56c49515d9f48a36495db4edf051d57',
'User-Agent': 'Joshapp/1.0'
}
})
const json = await resp.json()
setisLoading(false)
setnextPage(json.nextPage)
setResult(json.totalResults)
setPost(json.results)





} catch(err){
console.log(err)
}

}



const scroll = useSharedValue(0)

useDerivedValue(() => {
scrollTo(
animatedRef,
scroll.value,
0,
true
);
});








useEffect(() => {

getNNews(econ, cgory);

switch(cgory) {
case 'business':
scroll.value = withTiming(0)
break;
case 'crime':
scroll.value = withTiming(0)
break;
case 'domestic':
scroll.value = withTiming(0)
break;
case 'education':
scroll.value = withTiming(420)
break;
case 'entertainment':
scroll.value = withTiming(420)
break;
case 'environment':
scroll.value = withTiming(420)
break;
case 'food':
scroll.value = withTiming(840)
break;
case 'health':
scroll.value = withTiming(840)
break;
case 'lifestyle':
scroll.value = withTiming(840)
break;
case 'politics':
scroll.value = withTiming(1260)
break;
case 'science':
scroll.value = withTiming(1260)
break;
case 'sports':
scroll.value = withTiming(1260)
break;
case 'technology':
scroll.value = withTiming(1680)
break;
case 'tourism':
scroll.value = withTiming(1680)
break;
}

}, [])










const Component = () => {
return (
<View style={styles.content}>
<Text style={styles.try}>{cgory} News not Available at this Hour, Please try again</Text>
</View>
)
}









return (
<View style={styles.container}>
<Stack.Screen options={{
title:'',
headerRight:() => <CountryTagg  sname={con} icon={econ}/>,
headerLeft: () => <Pressable onPress={()=> router.dismissTo('/')}>
<View style={styles.backbox}><AntDesign name="left" size={20} color="azure" /></View>
</Pressable>,
animation:'none'
}}/>
<View style={[styles.navbar,{backgroundColor:theme === 'dark' ? '#636262' :'#dedcdc'}]}>
<CustomNav animatedRef={animatedRef} router={router} Ref={ref} icon={econ} selectedC={con}   isC={cgory} isActive={false}   data={authState.category}/>
</View>

<View style={[styles.content, {backgroundColor:theme === 'dark' ? '#1b1c1c' :'#dedcdc'}]}>
{isLoading ? (<ActivityIndicator animating={true} color='#15389A' size={30}/>) : (
<FlatList data={Post} renderItem={
({item}) => <Newsitem title={item.title} theme={theme}
source_icon={item.source_icon}
 image_url={item.image_url} description={item.description} 
pubDate={item.pubDate} article_id={item.article_id}/>
} keyExtractor={item => item.article_id} ListFooterComponent={()=>  (result === 0 ? <Component /> :<View style={[styles.foot,{backgroundColor:theme === 'dark' ? '#1b1c1c' :'white'}]}>
<TouchableOpacity disabled={nextPage === null}
onPress={() => {
router.push({
pathname: '/pagec/[page]',
params:{
country:con,
category: cgory,
page:nextPage,
icon:econ,
slidenum:scroll.value
}

})
}}>
<Text style={{color: theme === 'dark' ?'azure':'#1b1c1c' }}>Load More...</Text>

</TouchableOpacity>
</View> )}/>
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
width:200,
height:30,
justifyContent: 'flex-end',
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
width:SCREEN_WIDTH,
justifyContent: 'center',
alignItems:'center',



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


text:{
color:'azure'
},


try: {
color:'#2E3C63',
textAlign: 'center',
fontSize:15,
alignItems:'center',
paddingTop:400
},
desc: {
width:400,
padding:40,
fontSize:20,
letterSpacing:2,
color:'azure'
},

})





export default category