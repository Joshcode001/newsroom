import { Text, View ,StyleSheet,TouchableOpacity, Modal,FlatList,ActivityIndicator} from "react-native";
import { Stack,useRouter,useLocalSearchParams } from "expo-router";
import React, {useState, useEffect,useRef, useContext} from "react";
import { Notifybar,Countrybar, CountryTag, Searchbar, Newsitem} from '..'
import { AuthContext } from "@/src/utils/authContext";
import { useAnimatedRef } from 'react-native-reanimated'
import CustomNav from "@/src/component/CustomNav";
import { colors } from "@/src/utils/authContext";




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







const fifth = () => {
const Acolor = colors
const animatedRef = useAnimatedRef<FlatList>()
const authState = useContext(AuthContext)
const [isLoading, setisLoading] = useState(false)
const {country, category, page}= useLocalSearchParams()
const Ref = useRef('')
const router = useRouter()
const [Post, setPost] = useState<res[]>([])
const [isActive, setisActive] = useState(true)
const [nextPage, setnextPage] = useState('')
const [Search, setSearch] = useState('')
const [IsModal, setIsModal] = useState('a')
const [selectedC, setSelectedC] = useState({
name: 'Select Country',
icon: 'wo'
})

let bcon:string = '';
let bates:string = '';
let belect:string = ''

if (typeof country === 'string') {
bcon = country
}
if (typeof category === 'string') {
bates = category;
}
if (typeof page === 'string') {
belect = page;
}






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






const getNewss = async (cty:string, cte:string, pn:string) => {
try {
setisLoading(true)
const resp = await fetch(`https://newsdata.io/api/1/latest?country=${cty}&category=${cte}&image=1&page=${pn}`, {
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
} catch(err) {
console.log(err) 
}
}

useEffect(() => {
getNewss(bcon,bates,belect);
}, [])




return (
<View style={styles.container}>
<Stack.Screen options={{
title: '',
headerRight: ()=> <Notifybar  onPressb={notifymod}/>,
headerLeft: () => <Countrybar onPressc={cpick} cicon={selectedC.icon} cname={selectedC.name}/>,
animation:'none',
}}/>
<View style={[styles.navbar,{backgroundColor:theme === 'dark' ? '#636262' :'#dedcdc'}]}>
<CustomNav animatedRef={animatedRef} router={router} isActive={isActive}   data={authState.category}
selectedC={selectedC.name} Ref={Ref} icon={selectedC.icon}/>
</View>
<View style={[styles.content, {backgroundColor:theme === 'dark' ? '#1b1c1c': '#dedcdc'}]}>
{isLoading ? (<ActivityIndicator animating={true} color='#15389A' size={60}/>) : (
<FlatList data={Post} renderItem={
({item}) => <Newsitem title={item.title}  theme={theme}
source_icon={item.source_icon}
 image_url={item.image_url} description={item.description} 
pubDate={item.pubDate} article_id={item.article_id}/>
} keyExtractor={item => item.article_id}
ListFooterComponent={()=> <View style={[styles.foot,{backgroundColor:theme === 'dark' ? '#383838' :'white'}]}>
<TouchableOpacity  disabled={nextPage === null}
onPress={() => {
router.push({
pathname: '/page/[page]',
params:{
country:bcon,
category: bates,
page:nextPage
}

})
}}>
<Text style={{color: theme === 'dark' ?'azure':'#1b1c1c' }}>Load More...</Text>
</TouchableOpacity>
</View> }/>
)}
<View style={styles.desc}>
</View>
</View>


<Modal visible={IsModal === 'b'} animationType="slide"
onRequestClose={()=> {setIsModal('a')}} presentationStyle="pageSheet">
<View style={[styles.centeredView,{backgroundColor:theme === 'dark' ? '#2e2e2d' :'#cccccc'}]}>
<Searchbar  search={Search} setSearch={setSearch} theme={theme}/>
<View style={[styles.modalView, {backgroundColor:theme === 'dark' ? Acolor.dark.tertiary :  Acolor.light.tertiary}]}>
<FlatList  data={newData} renderItem={({item}) => 
<CountryTag theme={theme} cname={item.name} icon={item.icon} onPressc={
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
);
}





export default fifth






const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
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
width:500,
justifyContent: 'center',
alignItems:'center',
paddingTop:10,


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



linkbox: {
justifyContent:'space-evenly',
alignItems:'center',
width:450,
backgroundColor:'grey',
flexDirection:'row',
paddingBottom:70,
paddingTop:70
},

descbox: {
justifyContent:'center',
alignItems: 'center',
width:700,
backgroundColor:'grey'
},



desc: {
width:400,
padding:40,
fontSize:20,
letterSpacing:2,
color:'azure'
},
flink: {
width:100
},

linkcon: {
width: 700,
justifyContent:'center',
alignItems:'center'
},

















})