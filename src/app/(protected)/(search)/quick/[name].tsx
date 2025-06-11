import { View, Text, StyleSheet, Pressable, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState} from 'react'
import { useLocalSearchParams , useRouter} from 'expo-router'
import { Image } from 'expo-image'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Newsitem } from '../../(home)';




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









const name = () => {
const router = useRouter()
const {name, category, image} = useLocalSearchParams()
const [isLoading, setIsLoading] = useState(false)
const [nextPage, setnextPage] = useState('')
const [result, setresult] = useState<res[]>([])

let names:string = ''
let cate:string = ''
let img:string = ''

if (typeof name === 'string' ) {
names = name
}
if (typeof category === 'string' ) {
cate =category
}
if (typeof image === 'string' ) {
img = image
}







const getPdata = async (prop: string) => {
setIsLoading(true)
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
setIsLoading(false)
} catch (err) {
console.log(err)
}
}



const getCdata = async (prop: string) => {
setIsLoading(true)
try {
const data = await fetch(`https://newsdata.io/api/1/crypto?image=1&coin=${prop}`, {
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




const getDdata = async (prop: string) => {
setIsLoading(true)
try {
const data = await fetch(`https://newsdata.io/api/1/latest?image=1&domain=${prop}`, {
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
getPdata(names)
} else if (category === 'Popular Sources!') {
getDdata(names)
} else if (category === 'Popular CryptoCoins!') {
getCdata(names)
}

},[])











return (
<View style={styles.container}>
<View style={styles.head}>
<Pressable onPress={()=> router.back()}>
<View style={styles.backbox}><AntDesign name="left" size={22} color="azure" /></View>
</Pressable>
<View style={styles.scle}>
<Image  source={img} style={{width:80, height:80, borderRadius: '50%'}} contentFit='cover'/>
</View>
</View>
<View style={styles.content}>
{(isLoading) ? (<ActivityIndicator />) : 
<FlatList data={result}  renderItem={({item}) => (
<Newsitem title={item.title} sourcen={item.sourcen}
source_icon={item.source_icon}
link={item.link} image_url={item.image_url} description={item.description} 
pubDate={item.pubDate} article_id={item.article_id}/>)} keyExtractor={item => item.article_id}
ListFooterComponent={()=> (
<View style={styles.foot}>
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
<Text>Load More...</Text>
</TouchableOpacity>
</View>)}
/>}
</View>
<View style={styles.desc}>
</View>
</View>
)
}















export default name











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
backgroundColor:'rgba(0, 0, 0, 0.8)',
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
},
})