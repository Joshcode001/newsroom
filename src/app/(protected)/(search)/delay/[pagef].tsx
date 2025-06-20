import { View, Text, StyleSheet, Pressable, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState, useContext} from 'react'
import { useLocalSearchParams , useRouter} from 'expo-router'
import { Image } from 'expo-image'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Newsitem } from '../../(home)';
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








const pagef = () => {
const router = useRouter()
const {name, category, image, pagef} = useLocalSearchParams()
const [isLoading, setIsLoading] = useState(false)
const [nextPage, setnextPage] = useState('')
const [result, setresult] = useState<res[]>([])
const {theme} = useContext(AuthContext)





let names:string = ''
let cate:string = ''
let img:string = ''
let page:string = ''

if (typeof name === 'string' ) {
names = name
}
if (typeof category === 'string' ) {
cate = category
}
if (typeof image === 'string' ) {
img = image
}

if (typeof pagef === 'string' ) {
page = pagef
}











const getPdata = async (prop: string, pn:string) => {
setIsLoading(true)
try {
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
setIsLoading(false)
} catch (err) {
console.log(err)
}
}



const getCdata = async (prop: string, pn:string) => {
setIsLoading(true)
try {
const data = await fetch(`https://newsdata.io/api/1/crypto?image=1&coin=${prop}&page=${pn}`, {
method: 'GET',
headers: {
'X-ACCESS-KEY': 'pub_69410d56c49515d9f48a36495db4edf051d57',
'User-Agent': 'Joshapp/1.0'
}
})
const json = await data.json()
console.log(json)
setnextPage(json.nextPage)
setresult(json.results)
setIsLoading(false)
} catch (err) {
console.log(err)
}
}




const getDdata = async (prop: string, pn:string) => {
setIsLoading(true)
try {
const data = await fetch(`https://newsdata.io/api/1/latest?image=1&domain=${prop}&page=${pn}`, {
method: 'GET',
headers: {
'X-ACCESS-KEY': 'pub_69410d56c49515d9f48a36495db4edf051d57',
'User-Agent': 'Joshapp/1.0'
}
})
const json = await data.json()
setnextPage(json.nextPage)
setresult(json.results)
setIsLoading(false)
} catch (err) {
console.log(err)
}
}





useEffect(() => {
if (category === 'Popular People!') {
getPdata(names, page)
} else if (category === 'Popular Sources!') {
getDdata(names, page)
} else if (category === 'Popular CryptoCoins!') {
getCdata(names, page)
}

},[])

















return (
<View style={styles.container}>
<View style={[styles.head, {backgroundColor:theme === 'dark' ? '#021526':'#20394f' }]}>
<Pressable onPress={()=> router.dismissTo('/second')}>
<View style={styles.backbox}><AntDesign name="left" size={22} color="azure" /></View>
</Pressable>
<View style={styles.scle}>
<Image  source={img} style={{width:80, height:80, borderRadius: '50%'}} contentFit='cover'/>
</View>
</View>
<View style={[styles.content, {backgroundColor:theme === 'dark' ? '#1b1c1c' :'#dedcdc'}]}>
{(isLoading) ? (<ActivityIndicator />) : 
<FlatList data={result}  renderItem={({item}) => (
<Newsitem title={item.title} theme={theme}
source_icon={item.source_icon}
 image_url={item.image_url} description={item.description} 
pubDate={item.pubDate} article_id={item.article_id}/>)} keyExtractor={item => item.article_id}
ListFooterComponent={()=> (
<View style={[styles.foot,{backgroundColor:theme === 'dark' ? '#383838' :'white'}]}>
<TouchableOpacity disabled={nextPage === null} onPress={()=> {
router.push({
pathname: '/(protected)/(search)/delay/[pagef]',
params: {
name:name,
category: cate,
pagef:nextPage,
image: img
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
)
}




export default pagef















const styles = StyleSheet.create({

container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
width:'100%',
backgroundColor:'#EDEDED'
},

head: {
flexDirection:'row',
flex:1.7,
justifyContent: "space-between",
alignItems: "flex-end",
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

scle:{
width: 80,
height: 80,
borderRadius:'50%',
backgroundColor:'white',
margin:10,
},

backbox: {
width:100,
height:30,
alignSelf:'center',
marginBottom:33,
marginLeft: 15
},

foot: {
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
},
})