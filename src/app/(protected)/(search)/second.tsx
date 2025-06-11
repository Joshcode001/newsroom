import { View, Text,StyleSheet,TextInput,TouchableOpacity, ScrollView ,FlatList, ActivityIndicator, Keyboard} from 'react-native'
import React, {useRef, useState, useContext}  from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomBsheet from '@/src/component/CustomBsheet';
import { Image } from 'expo-image';
import { Newsitem } from '../(home)';
import { Router, useRouter } from 'expo-router';
import { AuthContext } from '@/src/utils/authContext';





type sbox = { 
image: string,
total: string,
name: string,
router: Router,
cate: string
}


type props  = 
{
_id: string,
fname: string,
category: string,
image: string,
total: string
}

type boxt = {
data: props[],
title: string,
router: Router
}

type sbar = {
setsearch : React.Dispatch<React.SetStateAction<string>>,
search: string,
getSdata: (prop: string) => Promise<void>,
setisLoading: React.Dispatch<React.SetStateAction<boolean>>

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






export const SearchBar = ({setsearch, search, getSdata, setisLoading}: sbar) => (
<View style={styles.searchbox}>
<TextInput style={styles.input} placeholder="write here"  value={search} onChangeText={text => setsearch(text)} 
onFocus={() =>{ setsearch('')
setisLoading(true)
}} />
<TouchableOpacity style={styles.buttonbox} disabled={search === ''}
onPress={() => {
getSdata(search)
Keyboard.dismiss()
}}>
<FontAwesome5 name="search" size={24} color="azure" />
</TouchableOpacity>
</View>
)





const Sbox = ({image, total, name, router, cate}:sbox) => (
<TouchableOpacity onPress={() => {
router.push({
pathname:'/(protected)/(search)/quick/[name]',
params:{
name:name,
category: cate,
image: image
}
})
}}>
<View style={styles.sbox}>
<View style={styles.scle}>
<Image  source={image} style={{width:80, height:80, borderRadius: '50%'}} contentFit='cover'/>
</View>
<Text style={styles.boxtext}>{total} pages</Text>
</View>
</TouchableOpacity>

)









export const Stab = ({data, title, router}:boxt) => (
<View style={styles.stab}>
<Text style={styles.stabtext}>{title}</Text>
<View style={styles.scard}>
<FlatList data={data} renderItem={({item}) => <Sbox image={item.image} total={item.total} router={router} name={item.fname} cate={item.category} />} keyExtractor={item => item._id} horizontal={true} showsHorizontalScrollIndicator={false}/>
</View>
</View>
)









const second = () => {
const authState = useContext(AuthContext)
const router = useRouter()
const [result, setresult] = useState<res[]>([])
const [isLoading, setisLoading] = useState(false)
const [isDom, setisDom] = useState(true)
const [nextPage, setnextPage] = useState('')
const [search, setsearch] = useState('')
const Ref = useRef<any>(null)
const title = `Today's Global Searches`




const getSdata = async (prop: string) => {
setisDom(false)
setisLoading(true)
try {
const data = await fetch(`https://newsdata.io/api/1/latest?image=1&qInTitle=${prop}`, {
method: 'GET',
headers: {
'X-ACCESS-KEY': 'pub_69410d56c49515d9f48a36495db4edf051d57',
'User-Agent': 'Joshapp/1.0'
}
})
const json = await data.json()
setnextPage(json.nextPage)
setresult(json.results)
setisLoading(false)
} catch (err) {
console.log(err)
}
}






return (
<GestureHandlerRootView style={{flex: 1}}>
<View style={styles.container}>
<View style={styles.head}>
<SearchBar search={search} setsearch={setsearch} getSdata={getSdata} setisLoading={setisLoading} />
</View>

<View style={styles.content}>

{
(isDom) ? (<Text>Joshua's Search Engine</Text>) :
(isLoading) ? (<ActivityIndicator />) : 
(result.length === 0) ? (<Text>{search} is not Trending at this Hour, Check Later</Text>) :
(<FlatList data={result}  renderItem={({item}) => (
<Newsitem title={item.title} sourcen={item.sourcen}
source_icon={item.source_icon}
link={item.link} image_url={item.image_url} description={item.description} 
pubDate={item.pubDate} article_id={item.article_id}/>)} keyExtractor={item => item.article_id}
ListFooterComponent={()=> (
<View style={styles.foot}>
<TouchableOpacity disabled={nextPage === null} onPress={()=> {
router.push({
pathname: '/(protected)/(search)/[paged]',
params: {
props:search,
paged:nextPage

}
})
}}>
<Text>Load More...</Text>
</TouchableOpacity>
</View>)}
/>)

}




</View>
<View style={styles.desc}>
</View>
</View>
<CustomBsheet  Ref={Ref} title={title} >
<View style={styles.child}>
<ScrollView contentContainerStyle={{flexDirection: 'column', width:'100%', height:2000}} showsVerticalScrollIndicator={false}>
<Stab data={authState.listp} router={router} title='Popular People!' />
<Stab data={authState.lists} router={router} title='Popular Sources!' />
<Stab data={authState.listc} router={router} title='Popular CryptoCoins!' />
<Stab data={authState.listt} router={router} title='Popular Teams!' />
</ScrollView>
</View>
</CustomBsheet>
</GestureHandlerRootView>
)
}


export default second



















const styles = StyleSheet.create({

container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
width:'100%',
backgroundColor:'#EDEDED'
},

head: {
flex:1.7,
justifyContent: "center",
alignItems: "center",
backgroundColor:'#222831',
width:'100%'
},

content: {
backgroundColor:'#EDEDED',
flex:8.3,
justifyContent: "center",
alignItems: "center",
width:700,
maxHeight:2000,
alignContent:'center'
},

searchbox: {
flexDirection:'row',
justifyContent: "center",
alignItems: "flex-end",
width:400,
height:150,
columnGap:10,
paddingBottom:20
},

input: {
justifyContent: "center",
alignItems: "center",
backgroundColor:'#B0ADAD',
width:310,
height:50,
borderRadius:50,
textAlign:'center',
color:'azure',
fontSize:22,
marginRight:8
},


button: {
justifyContent: "center",
alignItems: "center",
},

buttonbox: {
justifyContent: "center",
alignItems: "center",
backgroundColor:'#7fd1ae',
padding:10,
marginBottom:2
},

child: {
height:900,
width:'100%',
backgroundColor:'#E7E7E7',
justifyContent:'center',
alignItems:'center',
marginTop:30
},


scard:{
width: '100%',
height: 200,
justifyContent:'center',
alignItems:'center',
}, 

scle:{
width: 80,
height: 80,
borderRadius:'50%',
backgroundColor:'white',
margin:10,
},

stab: {
marginRight:8,
width: 400,
height: 300,
justifyContent:'flex-end',
alignItems:'center',
flexDirection:'column',
rowGap:20,
marginTop:10,
backgroundColor:'#5e5e5e',
borderRadius:25,
marginBottom:20,
shadowColor: '#000',
shadowOffset: {
width: 8,
height: 6,
},
shadowOpacity: 0.50,
shadowRadius: 4,
elevation: 10
},

stabtext: {
fontSize: 26,
color: 'azure',
alignSelf:'flex-start',
paddingLeft:6
},

sbox:{
width: 100,
flexDirection:'column',
justifyContent:'center',
alignItems:'center',
},

boxtext: {
fontSize:10,
color:'azure', 
},


foot: {
backgroundColor:'white',
width:700,
height:50,
justifyContent: 'center',
alignItems:'center',
marginBottom:5
},

desc: {
width:400,
padding:40,
fontSize:20,
letterSpacing:1,
color:'black',
marginBottom:50
},




})