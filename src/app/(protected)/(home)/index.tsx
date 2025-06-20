import { Text, View ,StyleSheet,Pressable,TouchableOpacity, Modal,FlatList,TextInput,ActivityIndicator,Dimensions} from "react-native";
import { Stack,useRouter,  } from "expo-router";
import React, {useState, useEffect,useRef,  useContext} from "react";
import Octicons from '@expo/vector-icons/Octicons';
import CountryFlag from "react-native-country-flag";
import {Image} from 'expo-image' ;
import { formatRFC7231} from "date-fns"
import { AuthContext } from "@/src/utils/authContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import  { useAnimatedRef} from 'react-native-reanimated'
import CustomNav from "@/src/component/CustomNav";
import { colors } from "@/src/utils/authContext";


export const SCREEN_WIDTH = Dimensions.get('window').width



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
onPressc: () => void,
theme: string

}
type stag = {
setSearch: (text: string) => void,
search: string,
theme: string
}


type res = {
title: string,
source_icon: string,
pubDate: string,
image_url: string,
description: string,
article_id: string,
theme: string
}

type ttag = {
date: string,
theme: string
}








export const TimeAgo = ({date, theme}: ttag) => {
const newdate = formatRFC7231(date)
return (
<View>
<Text style={[styles.colorb,{color:theme === 'dark' ? 'azure': '#353535'}]}>{newdate}</Text>
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





export const CountryTag = ({cname, icon,onPressc, theme}: ctag2) => (
<TouchableOpacity style={styles.ctag} onPress={onPressc}>
<CountryFlag isoCode={icon} size={20} />
<Text style={[styles.cntag, {color:theme === 'dark' ? 'grey':'#D2E2D7'}]}>{cname}</Text>
</TouchableOpacity>
)





export const Searchbar = ({setSearch, search, theme}: stag) => (
<View style={[styles.sbox, {backgroundColor: theme === 'dark' ? '#130b26' : '#2a223d'}]}>
<TextInput placeholder="search by name" onChangeText={text => setSearch(text)} value={search}
style={[styles.input, {backgroundColor: theme === 'dark' ? '#130b26' : '#2a223d'}]} />
</View>
)






export const Newsitem = ({title, source_icon, pubDate, image_url, description, theme}:res) => (
<View>
<View style={styles.tbox}>
<Text style={[styles.title, {color:theme === 'dark' ? 'azure' :'#1C2910' }]}>{title}</Text>
</View>
<Image source={image_url} style={styles.image} />
<View style={[styles.descbox,{backgroundColor:theme === 'dark' ? '#1b1c1c' :'#dedcdc'}]}>
<Text style={[styles.desc, {color:theme === 'dark' ? 'azure' :'#1C2910' }]}>{description}</Text>
</View>
<View style={styles.linkcon}>
<View style={[styles.linkbox,{backgroundColor:theme === 'dark' ? '#1b1c1c' :'#dedcdc'}]}>
<Image source={source_icon} style={styles.image2} contentFit="contain"/>
<TimeAgo date={pubDate} theme ={theme}/>
</View>
</View>
</View>
)





export default function Index() {



const Acolor = colors
const animatedRef = useAnimatedRef<FlatList>()
const authState = useContext(AuthContext)
const Ref = useRef('')
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
const theme = authState.theme

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
}, [])






return (
<GestureHandlerRootView style={{flex: 1}}>
<View style={styles.container}>
<Stack.Screen options={{
title: '',
headerRight: ()=> <Notifybar  onPressb={notifymod}/>,
headerLeft: () => <Countrybar onPressc={cpick} cicon={selectedC.icon} cname={selectedC.name}/>
}}/>
<View style={[styles.navbar,{backgroundColor:theme === 'dark' ? '#636262' :'#dedcdc'}]}>
<CustomNav animatedRef={animatedRef} router={router} isActive={isActive} data={authState.category} 
selectedC={selectedC.name} Ref={Ref}    icon={selectedC.icon}/>
</View>
<View style={[styles.content, {backgroundColor:theme === 'dark' ? '#1b1c1c' :'#dedcdc'}]}>
{isLoading ? (<ActivityIndicator animating={true} color='#15389A' size={40}/>) : 
<FlatList  data={Post} renderItem={
({item}) => <Newsitem title={item.title}  theme={theme}
source_icon={item.source_icon}
image_url={item.image_url} description={item.description} 
pubDate={item.pubDate} article_id={item.article_id}/>
} keyExtractor={item => item.article_id}
ListFooterComponent={()=> <View style={[styles.foot,{backgroundColor:theme === 'dark' ? '#383838' :'white'}]}>
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
<Text style={{color: theme === 'dark' ?'azure':'#1b1c1c' }}>Load More...</Text>
</TouchableOpacity>
</View> }/>
}
<View style={styles.desc}>
</View>
</View>


<Modal visible={IsModal === 'b'} animationType="slide"
onRequestClose={()=> {setIsModal('a')}} presentationStyle="pageSheet">
<View style={[styles.centeredView,{backgroundColor:theme === 'dark' ? '#2e2e2d' :'#cccccc'}]}>
<Searchbar  search={Search} setSearch={setSearch} theme={theme}/>
<View style={[styles.modalView, {backgroundColor:theme === 'dark' ? Acolor.dark.tertiary :  Acolor.light.tertiary}]}>
<FlatList  data={newData} renderItem={({item}) => 
<CountryTag theme={theme} cname={item.name} icon={item.icon}
onPressc={
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
<View style={[styles.centeredView,{backgroundColor:theme === 'dark' ? '#2e2e2d' :'#cccccc'}]}>
<View style={[styles.modalView, {backgroundColor:theme === 'dark' ? Acolor.dark.tertiary :  Acolor.light.tertiary}]}>
<Text>Hi there!</Text>
</View>
</View>
</Modal>
</View>
</GestureHandlerRootView>
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
},


sbox: {
marginBottom: 40,
width: 300,
height: 50,
borderRadius:50,
justifyContent:'center',
alignItems: 'center'
},

input: {
width:200,
height: 50,
color:'azure',
fontSize:20  
},

navbar: {
flex: 0.8,
width:SCREEN_WIDTH,
justifyContent: 'center',
alignItems:'center',
alignContent:'center',
},

content: {
flex: 9.2,
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
alignItems:'center',

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
padding:30
},

linkbox: {
justifyContent:'space-evenly',
alignItems:'center',
width:450,
flexDirection:'row',
paddingBottom:70,
paddingTop:70
},

descbox: {
justifyContent:'center',
alignItems: 'center',
width:700,

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