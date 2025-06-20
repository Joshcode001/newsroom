import { View, Text,StyleSheet,TextInput,TouchableOpacity, ScrollView ,FlatList, ActivityIndicator, Keyboard} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomBsheet from '@/src/component/CustomBsheet';
import { Newsitem } from '../(home)';
import React, {useRef, useState, useEffect, useContext}  from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SearchBar } from './second'
import { useRouter } from 'expo-router';
import { Stab } from './second';
import { AuthContext } from '@/src/utils/authContext';







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


type props  = {
_id: string,
Fname: string,
category: string,
image: string,
total: string
}










const paged = () => {
const authstate = useContext(AuthContext)
const router = useRouter()
const [isLoading, setisLoading] = useState(false)
const [result, setresult] = useState<res[]>([])
const [nextPage, setnextPage] = useState('')
const [search, setsearch] = useState('')
const {paged,props} = useLocalSearchParams()
const Ref = useRef<any>(null)
const title = `Today's Global Searches`
const theme = authstate.theme


let prop = ''
let page = ''

if ( typeof props === "string") {
prop = props
}
if ( typeof paged === "string") {
page = paged
}




const getNdata = async (prop:string, pn: string) => {
setisLoading(true)
try{
const data = await fetch(`https://newsdata.io/api/1/latest?image=1&qInTitle=${prop}&page=${pn}`, {
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

} catch(err) {
console.log(err)
}
}










const getSdata = async (prop: string) => {
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









useEffect(() => {
  setsearch(prop)
getNdata(prop, page)
},[])






return (
<GestureHandlerRootView>
<View style={styles.container}>
<View style={[styles.head, {backgroundColor:theme === 'dark' ? '#021526':'#20394f' }]}>
<SearchBar search={search} setsearch={setsearch} getSdata={getSdata} setisLoading={setisLoading} theme={theme} />
</View>
<View style={[styles.content, {backgroundColor:theme === 'dark' ? '#1b1c1c' :'#dedcdc'}]}>
{ isLoading ?  (<ActivityIndicator />) :
(result.length === 0) ? (<Text>{search} is not Trending at this Hour, Check Later</Text>) :
<FlatList data={result}  renderItem={({item}) => (
<Newsitem title={item.title} theme={theme}
source_icon={item.source_icon}
image_url={item.image_url} description={item.description} 
pubDate={item.pubDate} article_id={item.article_id}/>)} keyExtractor={item => item.article_id}
ListFooterComponent={()=> (
<View style={[styles.foot,{backgroundColor:theme === 'dark' ? '#383838' :'white'}]}>
<TouchableOpacity disabled={nextPage === null} onPress={()=> {
router.push({
pathname: '/(protected)/(search)/[paged]',
params: {
props:search,
paged:nextPage
}
})
}}>
<Text style={{color: theme === 'dark' ?'azure':'#1b1c1c' }}>Load More...</Text>
</TouchableOpacity>
</View>)}
/>}
</View>
<View style={styles.desc}>
</View>
</View>
<CustomBsheet  Ref={Ref} title={title} >
<View style={styles.child}>
<ScrollView contentContainerStyle={{flexDirection: 'column', width:'100%', height:2000}} showsVerticalScrollIndicator={false}>
<Stab theme={theme} data={authstate.listp} router={router} title='Popular People!' />
<Stab theme={theme} data={authstate.lists} router={router} title='Popular Sources!' />
<Stab theme={theme} data={authstate.listc} router={router} title='Popular CryptoCoins!' />
<Stab theme={theme} data={authstate.listt} router={router} title='Popular Teams!' />
</ScrollView>
</View>
</CustomBsheet>
</GestureHandlerRootView>
)
}

export default paged










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
width:'100%'
},

content: {
flex:8.3,
justifyContent: "center",
alignItems: "center",
width:700,
maxHeight:2000,
alignContent:'center'
},

foot: {
width:700,
height:50,
justifyContent: 'center',
alignItems:'center',
marginBottom:5
},

child: {
height:900,
width:'100%',
backgroundColor:'#E7E7E7',
justifyContent:'center',
alignItems:'center',
marginTop:30
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