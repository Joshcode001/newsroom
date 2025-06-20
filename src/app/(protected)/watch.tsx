import { View, Text, StyleSheet,TouchableOpacity, ActivityIndicator, FlatList,Alert} from 'react-native'
import React, { useEffect, useState, useCallback, useRef, useImperativeHandle, RefObject} from 'react'
import YoutubePlayer from "react-native-youtube-iframe";
import { SCREEN_WIDTH } from './(home)';
import { SCREEN_HEIGHT } from '@/src/component/CustomBsheet';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



type tv = {
id: string,
}

type seltor ={
item: bnit
}


type data = {
etag: string,
id: string,
kind: string,
snippet:{
channelId:string,
channelTitle:string,
description: string,
playlistId:string,
position: number,
publishedAt:string,
resourceId:{
kind:string,
videoId:string,
},
thumbnails:{
default:[Object],
high:[Object],
maxres:[Object],
medium:[Object],
standard:[Object]
},
title:string,
videoOwnerChannelId:string,
videoOwnerChannelTitle:string
}
}



type init = [
{
videoId:string,
title: string
}
]


type bnit = {
videoId:string,
title: string
}







const Head = () => (
<View style={styles.head}>
<Text style={styles.text}>JoshTV<MaterialCommunityIcons name="television-classic" size={24} color="#FF7D29" /> {'   '} 
<FontAwesome5 name="sync-alt" size={16} color="#FFAAAA" />{'    '}
<MaterialCommunityIcons name="youtube-tv" size={25} color="#B22222" />  
YouTube
</Text>
</View>
)








const watch = () => {
const [playing, setPlaying] = useState(false);
const [isloading, setisloading] = useState(false)
const [isBead, setisBead] = useState('a')
const [isReadi, setisReadi] = useState('a')
const [vidId, setvidId] = useState('uPz9AbfufTQ')
let dataa:data[] = []
let reducedata:bnit[] = []
let newdata:bnit[]= [{videoId:'',title: ''}]
const [datta, setdatta]= useState([{videoId:'',title: ''}])
const plyid ={
a:'PLVqMyQeaH7TG8RGUgoyiTbiBJ8iS0nTtr',
b:'PLVqMyQeaH7TEPft-iJUPXyTCWN_kHQZK6'
}



const Navbar = () => (
<View style={styles.navbar}>
<TouchableOpacity style={(isReadi === 'b') ? styles.buttonb : styles.button}
onPress={() => {
setisReadi('b')
getNews(plyid.a)}}>
<Text style={{marginLeft:130,fontSize:15,color:(isReadi === 'b') ? 'azure': 'black'}}>Live News & Events</Text>
</TouchableOpacity>

<TouchableOpacity style={(isReadi === 'c') ? styles.buttonb : styles.button}
onPress={() => {
setisReadi('c')
getNews(plyid.b)}}>
<Text style={{marginRight:160,fontSize:15, color:(isReadi === 'c') ? 'azure': 'black'}}>Latest Sport Highlights</Text>
</TouchableOpacity>
</View>
)






const getid = async () => {
if (dataa.length !== 0) {
const initial:init = [{videoId:'',title: ''}]
const newArray = (acc:init, value:data) => {
acc.push({
videoId: value.snippet.resourceId.videoId,
title: value.snippet.title
})
return acc
} 
reducedata =  dataa.reduce(newArray,initial)
newdata =  reducedata.slice(1)
setdatta(newdata)
}
}



const Selector = ({item}:seltor) => (
<View style={styles.seltor}>
<TouchableOpacity onPress={()=>{
setisBead(item.videoId)
setvidId(item.videoId)
Play()
} }
style={[styles.selt,{shadowColor: (isBead === item.videoId) ? '#0118D8': '#000'}]}>
<Text style={styles.seltxt} >{item.title  }</Text>
</TouchableOpacity>
</View>
)


const onStateChange = useCallback((state:any) => {
if (state === "ended") {
setPlaying(false);
Alert.alert("video has finished playing!");
}
}, []);

const Play = useCallback(() => {
setPlaying(true);
}, []);




const Jtv = useCallback(({id}:tv) => {
return (
<View style={styles.vid}>
<YoutubePlayer
height={400}
videoId={id}
play={playing}
onChangeState={onStateChange}

/>
</View>
)
},[vidId]) 









const getNews = async (id:string) => {
setisloading(true)

try {
const resp = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyClGkLBYzkFrsS5GPD0WBHNsfZ-5-Itblw&part=snippet&playlistId=${id}&maxResults=49`)
const json =await  resp.text()
const data = await JSON.parse(json)
dataa = await  data.items
await getid()


setisloading(false)



} catch(err){
console.log(err)
}


}






useEffect(() => {
setisReadi('b')
getNews(plyid.a)
}, [])




return (
<View style={styles.container}>
<View style={styles.header}>
<Head />
</View>
<View style={styles.nav}>
<Navbar />
</View>
<View style={styles.content}>
<Jtv id={vidId} />
</View>
<View style={styles.contnt}>
{
isloading ? <ActivityIndicator /> : 
<FlatList showsVerticalScrollIndicator={false}  data={datta} renderItem={({item}) => <Selector item={item} />}/>

}


</View>
<View style={styles.desc}>
</View>
</View>
)

}

export default watch







const styles = StyleSheet.create({
container: {
flex:1,
width: SCREEN_WIDTH,
height: SCREEN_HEIGHT,
justifyContent:'center',
alignItems: 'center',
},

vid: {
width: '100%',
height:250
},

header: {
flex:1,
backgroundColor:'#143D60',
justifyContent:'flex-end',
alignItems:'center',
width:'100%'
},

head: {
justifyContent:'center',
alignItems:'center',
width: '50%',
backgroundColor: '#18230F',
paddingVertical:6

},

content: {
flex:3.0,
justifyContent:'center',
alignItems:'center',
backgroundColor:'#18230F',
width:'100%',
height:'100%',
flexDirection:'column'
}, 

text: {
color:'azure',
fontSize:17
}, 

navbar: {
justifyContent:'center',
alignItems:'center',
flexDirection: 'row',
width:'100%',
height: '100%',
columnGap:2
}, 

button: {
justifyContent:'center',
alignItems:'center',
width:'100%',
backgroundColor:'#F2F2F2',
paddingVertical:10,
}, 

buttonb: {
justifyContent:'center',
alignItems:'center',
width:'100%',
backgroundColor:'#670D2F',
borderColor:'red',
paddingVertical:10,
color:'azure'
}, 

nav: {
flex:0.5,
backgroundColor:'#18230F',
width:'100%',
justifyContent:'center',
alignItems:'center',
},

contnt: {
flex:5.5,
justifyContent:'center',
alignItems:'center',
backgroundColor:'#C1C1C1',
width:'100%',
height:'100%',
flexDirection:'column'
}, 

seltor: {
justifyContent:'center',
alignItems:'flex-start',
paddingTop:30
},

selt: {
justifyContent:'center',
alignItems:'center',
backgroundColor:'#F3A26D',
marginBottom:12,
paddingVertical:10,
maxWidth:370,
borderRadius:10,
shadowColor: '#000',
shadowOffset: {
width: 7,
height: 6,
},
shadowOpacity: 0.50,
shadowRadius: 4,
elevation: 10,
},
seltxt:{
fontWeight:'condensedBold',
fontSize:18,
padding:15,
color:'azure'
},

desc: {
width:'100%',
height:100,
backgroundColor:'#C1C1C1'
}
})