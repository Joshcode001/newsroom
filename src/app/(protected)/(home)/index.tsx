import { Text, View ,StyleSheet,Pressable,TouchableOpacity, Modal,FlatList,TextInput,ActivityIndicator} from "react-native";
import { Stack,useRouter,  } from "expo-router";
import React, {useState, useEffect,useRef, RefObject, useContext, use} from "react";
import Octicons from '@expo/vector-icons/Octicons';
import CountryFlag from "react-native-country-flag";
import {Image} from 'expo-image' ;
import { formatRFC7231} from "date-fns"
import { AuthContext } from "@/src/utils/authContext";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'





type item = {
item: string,
color: string
}

type ctag = {
onPressc : () => void,
cicon: string,
cname: string
}

type ntag = {
onPressb : () => void
}

type ctag2 = {
cname: string,
icon: string,
onPressc: () => void

}
type stag = {
setSearch: (text: string) => void,
search: string
}

type natag = {
router: any,
selectedC: string,
icon: string,
Ref: any,
isC?: string,
isActive: boolean,
ScrollRef: RefObject<FlatList | null>,
data: item[],
anistyle: any
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
anistyle: any
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

type ttag = {
date: string
}












export const TimeAgo = ({date}: ttag) => {
const newdate = formatRFC7231(date)
return (
<View>
<Text style={styles.colorb}>{newdate}</Text>
</View>
)
}








export const Notifybar = ({onPressb}: ntag) => (
<View style={styles.notify}>
<Pressable onPress={onPressb}>
<Octicons name="bell" size={20} color="azure" />
</Pressable>
</View>
)





export const Countrybar = ({onPressc, cname, cicon}: ctag) => (
<View style={styles.countrybar}>
<Pressable onPress={onPressc}>
<CountryFlag isoCode={cicon} size={15} />
</Pressable>
<Pressable onPress={onPressc}>
<Text style={styles.text}>{cname}</Text>
</Pressable>
</View>
)





export const CountryTag = ({cname, icon,onPressc}: ctag2) => (
<TouchableOpacity style={styles.ctag} onPress={onPressc}>
<CountryFlag isoCode={icon} size={20} />
<Text style={styles.cntag}>{cname}</Text>
</TouchableOpacity>
)





export const Searchbar = ({setSearch, search}: stag) => (
<View style={styles.sbox}>
<TextInput placeholder="search by name" onChangeText={text => setSearch(text)} value={search} style={styles.input} />
</View>
)






export const Newsitem = ({title, sourcen, source_icon, pubDate, image_url, description, link}:res) => (
<View>
<View style={styles.tbox}>
<Text style={styles.title}>{title}</Text>
</View>
<Image source={image_url} style={styles.image} />
<View style={styles.descbox}>
<Text style={styles.desc}>{description}</Text>
</View>
<View style={styles.linkcon}>
<View style={styles.linkbox}>
<Image source={source_icon} style={styles.image2} contentFit="contain"/>
<TimeAgo date={pubDate}/>
<Text>{sourcen}</Text>
</View>
</View>
</View>
)













const Catitem = ({Ref,isActive, isC,router,selectedC,icon, category, color, anistyle}:cat) => (
<Animated.View style={anistyle}>
<TouchableOpacity  ref={Ref} disabled={isActive}
style={[{backgroundColor:color},styles.nav,{shadowColor: (isC === category) ? '#E51807': '#000'}]} 
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
<Text style={styles.text}>{category}</Text></TouchableOpacity>
</Animated.View>
)








export const Navbar = ({ router,selectedC,Ref, icon,  isC, isActive, ScrollRef, data, anistyle}: natag) => (
<View>
<FlatList data={data} ref={ScrollRef} renderItem={({item}) => <Catitem anistyle={anistyle} router={router} selectedC={selectedC} Ref={Ref} icon={icon} isC={isC} isActive={isActive} category={item.item} color={item.color}/>} showsHorizontalScrollIndicator={false} horizontal={true}  />
</View>

)




export default function Index() {

const lth = useSharedValue(0)

const anistyle = useAnimatedStyle(()=> {
return{
transform:[{translateX:lth.value}]
}
}, [])



const authState = useContext(AuthContext)
const Ref = useRef('')
const ScrollRef = useRef<FlatList>(null)
const router = useRouter()
const [Post, setPost] = useState<res[]>([])
const [isActive, setisActive] = useState(true)
const [nextPage, setnextPage] = useState('')
const [isLoading, setisLoading] = useState(false)
const [Search, setSearch] = useState('')
const [IsModal, setIsModal] = useState('a')
const [selectedC, setSelectedC] = useState({
name: 'Select Country',
icon: 'wo'
})



const cpick = () => {
setIsModal('b')
}
const notifymod = () => {
setIsModal('c')
}

const closeModal = () => {
setIsModal('a')
}

const data = authState.data

const newData = data.filter((item) => ((item.name).toLowerCase().includes(Search.toLowerCase())))











const getNews = async () => {
try {
setisLoading(true)
const resp = await fetch('https://newsdata.io/api/1/latest?country=wo&category=top&image=1', {
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
getNews();
lth.value = withTiming(-1590, {duration:4000})

}, [])






return (
<View style={styles.container}>
<Stack.Screen options={{
title: '',
headerRight: ()=> <Notifybar  onPressb={notifymod}/>,
headerLeft: () => <Countrybar onPressc={cpick} cicon={selectedC.icon} cname={selectedC.name}/>
}}/>
<View style={styles.navbar}>
<Navbar   router={router} isActive={isActive} data={authState.category} anistyle={anistyle}
selectedC={selectedC.name} Ref={Ref} ScrollRef={ScrollRef}   icon={selectedC.icon}/>
</View>
<View style={styles.content}>
{isLoading ? (<ActivityIndicator animating={true} color='#15389A' size={40}/>) : 
<FlatList data={Post} renderItem={
({item}) => <Newsitem title={item.title} sourcen={item.sourcen}
source_icon={item.source_icon}
link={item.link} image_url={item.image_url} description={item.description} 
pubDate={item.pubDate} article_id={item.article_id}/>
} keyExtractor={item => item.article_id}
ListFooterComponent={()=> <View style={styles.foot}>
<TouchableOpacity disabled={nextPage === null}
onPress={() => {
router.push({
pathname: '/page/[page]',
params:{
country:selectedC.icon,
category: 'top',
page:nextPage,

}

})
}}>
<Text>Load More...</Text>

</TouchableOpacity>
</View> }/>
}
<View style={styles.desc}>
</View>
</View>


<Modal visible={IsModal === 'b'} animationType="slide"
onRequestClose={()=> {setIsModal('a')}} presentationStyle="pageSheet">
<View style={styles.centeredView}>
<Searchbar  search={Search} setSearch={setSearch}/>
<View style={[styles.modalView, styles.color]}>
<FlatList  data={newData} renderItem={({item}) => 
<CountryTag cname={item.name} icon={item.icon} onPressc={
() => {
setSelectedC({
name: item.name,
icon: item.icon
});
closeModal();
setSearch('');
setisActive(false)
} }/>
} keyExtractor={item => item.icon}/>
</View>
</View>
</Modal>

<Modal visible={IsModal === 'c'} animationType="slide"
onRequestClose={()=> {setIsModal('a')}} presentationStyle="pageSheet">
<View style={styles.centeredView}>
<View style={styles.modalView}>
<Text>Hi there!</Text>
</View>
</View>
</Modal>
</View>
);
}




const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",

},

countrybar: {
width:200,
height:30,
justifyContent: 'flex-start',
alignItems:'center',
flexDirection: 'row',
columnGap: 10

},

text: {
color:'azure'
},

centeredView: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',


},

modalView: {
width:380,
height:700,
backgroundColor: 'white',
borderRadius: 30,
alignItems: 'center',
shadowColor: '#000',
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 4,
elevation: 5,
},

notify: {
width:100,
height:30,
justifyContent: 'center',
alignItems:'flex-end',
}, 

ctag: {
width: 350,
height: 80,
borderRadius: 10,
flexDirection:'row',
columnGap:30,
justifyContent: 'flex-start',
alignItems:'center',

},
cntag: {
fontSize:16,
color:'#D2E2D7'
},


color: {
backgroundColor: '#425347'
},

sbox: {
backgroundColor:'#142F22',
marginBottom: 40,
width: 300,
height: 50,
borderRadius:50,
justifyContent:'center',
alignItems: 'center'
},

input: {
backgroundColor:'#142F22',
width:200,
height: 50,
color:'azure',
fontSize:20  
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
alignItems:'center',

},

nav: {

width:100,
justifyContent:'center',
alignItems: 'center',
marginRight:40,
marginLeft: 40,
borderRadius: 50,
height:50,
shadowColor: '#000',
shadowOffset: {
width: 8,
height: 6,
},
shadowOpacity: 0.50,
shadowRadius: 4,
elevation: 10,
},

image: {
width: 700,
height: 500
},

image2: {
width: 60,
height: 60,
},

title: {
justifyContent:'center',
alignItems:'center',
textAlign:'center',
fontSize: 30,
width:450,
fontWeight:'900',
color:'#1C2910',
padding:30
},

linkbox: {
justifyContent:'space-evenly',
alignItems:'center',
width:450,
backgroundColor:'#EAEAEA',
flexDirection:'row',
paddingBottom:70,
paddingTop:70
},

descbox: {
justifyContent:'center',
alignItems: 'center',
width:700,
backgroundColor:'#EAEAEA'
},
tbox:{
width:700,
justifyContent:'center',
alignItems:'center'
},
desc: {
width:400,
padding:40,
fontSize:20,
letterSpacing:1,
color:'black'
},

flink: {
width:100
},

linkcon: {
width: 700,
justifyContent:'center',
alignItems:'center'
},
colorb:{
color: '#353535',
fontSize:16
},
auto: {
width:200,
height: 40,
backgroundColor:'grey',
position:'relative',
marginTop:10
},

navbarb: {
backgroundColor:'#dcdcdc',
width:500,
justifyContent: 'center',
alignItems:'center',
paddingTop:10,
position:'fixed'
},

















})