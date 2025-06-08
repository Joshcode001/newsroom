import { View, Text,StyleSheet,TextInput,TouchableOpacity, ScrollView ,FlatList } from 'react-native'
import React, {useRef}  from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomBsheet from '@/src/component/CustomBsheet';
import { Image } from 'expo-image';





type sbox = { 
image: string
}


type props  = 
  {
  id: number,
  Fname: string,
  category: string,
  image: string
}

type boxt = {
  data: props[]
}





const list: props[] = [
  {
    id:1,
    Fname:"Donald Trump",
    category:"Popular People!",
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/250px-Donald_Trump_official_portrait.jpg'
  },
  {
    id:2,
    Fname:"Bola Tinubu",
    category:"Popular People!",
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Bola_Tinubu_portrait.jpg/250px-Bola_Tinubu_portrait.jpg'
  },
  {
    id:3,
    Fname:"Kamala Harris",
    category:"Popular People!",
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Kamala_Harris_official_photo.jpg/250px-Kamala_Harris_official_photo.jpg'
  },
  {
    id:4,
    Fname:"Drake",
    category:"Popular People!",
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Drake_July_2016.jpg/250px-Drake_July_2016.jpg'
  },
  {
    id:5,
    Fname:"Sean Combs",
    category:"Popular People!",
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Sean_Combs_in_2023.png/250px-Sean_Combs_in_2023.png'
  },
  {
    id:6,
    Fname:"Elon Musk",
    category:"Popular People!",
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/SpaceX_CEO_Elon_Musk_visits_N%26NC_and_AFSPC_%28190416-F-ZZ999-006%29_%28cropped%29.jpg/250px-SpaceX_CEO_Elon_Musk_visits_N%26NC_and_AFSPC_%28190416-F-ZZ999-006%29_%28cropped%29.jpg'
  },
  {
    id:7,
    Fname:"CNN",
    category:"Popular Sources!",
    image:'https://brandlogos.net/wp-content/uploads/2014/10/cnn-logo.png'
  },
  {
    id:8,
    Fname:"BBC",
    category:"Popular Sources!",
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/BBC_logo_%281997-2021%29.svg/330px-BBC_logo_%281997-2021%29.svg.png'
  },
  {
    id:9,
    Fname:"Foxnews",
    category:"Popular Sources!",
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Fox_News_Media_Logo.svg/330px-Fox_News_Media_Logo.svg.png'
  },
  {
    id:10,
    Fname:"CBS",
    category:"Popular Sources!",
    image:'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/CGTN_Africa.svg/302px-CGTN_Africa.svg.png'
  },
  {
    id:11,
    Fname:"Euronews",
    category:"Popular Sources!",
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Euronews_logo_%281993-1996%29.svg/330px-Euronews_logo_%281993-1996%29.svg.png'
  },
  {
    id:12,
    Fname:"France24",
    category:"Popular Sources!",
    image:'https://upload.wikimedia.org/wikipedia/en/thumb/6/65/FRANCE_24_logo.svg/141px-FRANCE_24_logo.svg.png'
  },
  {
    id:13,
    Fname:"Aljazeera",
    category:"Popular Sources!",
    image:'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Al_Jazeera_Media_Network_Logo.svg/163px-Al_Jazeera_Media_Network_Logo.svg.png'
  },
  {
    id:14,
    Fname:"CNBC",
    category:"Popular Sources!",
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/CNBC_World_2024.svg/250px-CNBC_World_2024.svg.png'
  },
  {
    id:15,
    Fname:"Skynews",
    category:"Popular Sources!",
    image:'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/Sky_News_logo.svg/178px-Sky_News_logo.svg.png'
  },
  {
    id:16,
    Fname:"NTA",
    category:"Popular Sources!",
    image:'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/012021/ntalogo_0.png?z7hpx5nE2hapEjAaknuP2om5WsqqTEQO&itok=LyPP0jFv'
  },
  {
    id:17,
    Fname:"btc",
    category:"Popular CryptoCoin!",
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/64px-Bitcoin.svg.png'
  },
  {
    id:18,
    Fname:"usdt",
    category:"Popular CryptoCoin!",
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/USDT_Logo.png/250px-USDT_Logo.png'
  },
  {
    id:19,
    Fname:"eth",
    category:"Popular CryptoCoin!",
    image:'https://www.shutterstock.com/image-vector/crypto-currency-golden-coin-black-260nw-721882897.jpg'
  },
  {
    id:20,
    Fname:"bnb",
    category:"Popular CryptoCoin!",
    image:'https://dtunes.ng/blog/wp-content/uploads/2023/05/th-94.jpg.webp'
  },
  {
    id:21,
    Fname:"coindesk.com",
    category:"Popular CryptoCoin!",
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/CoinDesk_logo.svg/330px-CoinDesk_logo.svg.png'
  },
  {
    id:22,
    Fname:"binance.com",
    category:"Popular CryptoCoin!",
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/330px-Binance_logo.svg.png'
  },
]




























const SearchBar = () => (
  <View style={styles.searchbox}>
    <TextInput style={styles.input} placeholder="write here" />
    <TouchableOpacity style={styles.buttonbox} >
    <FontAwesome5 name="search" size={24} color="azure" />
    </TouchableOpacity>
  </View>
)





const Sbox = ({image}:sbox) => (
<View style={styles.sbox}>
      <View style={styles.scle}>
        <Image  source={image} style={{width:80, height:80, borderRadius: '50%'}} contentFit='cover'/>
      </View>
      <Text style={styles.boxtext}>2,300 posts</Text>
      </View>
)









const Stab = ({data}:boxt) => (
  <View style={styles.stab}>
    <Text style={styles.stabtext}>{data[0].category}</Text>
    <View style={styles.scard}>
      <FlatList data={data} renderItem={({item}) => <Sbox image={item.image}/>} keyExtractor={item => String(item.id)} horizontal={true} showsHorizontalScrollIndicator={false}/>
    </View>
  </View>
)









const second = () => {
const Ref = useRef<any>(null)
const title = `Today's Global Searches`
const listp = list.filter(item =>item.category === 'Popular People!' )
const lists = list.filter(item =>item.category === 'Popular Sources!' )
const listc = list.filter(item =>item.category === 'Popular CryptoCoin!' )






  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
      <View style={styles.head}>
      <SearchBar />
    </View>

      <View style={styles.content}>
      <TouchableOpacity onPress={()=> {Ref.current.ScrollTo(-600)}}>
        <Text>second screen</Text>
        </TouchableOpacity>
    </View>
    </View>
    <CustomBsheet  Ref={Ref} title={title} >

      <View style={styles.child}>
        <ScrollView contentContainerStyle={{flexDirection: 'column', width:'100%', height:2000}} showsVerticalScrollIndicator={false}>
          <Stab data={listp}/>
          <Stab data={lists}/>
          <Stab data={listc}/>
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
  backgroundColor:'white'
  },

  head: {
    flex:1.7,
    justifyContent: "center",
  alignItems: "center",
  },

  content: {
    backgroundColor:'white',
    flex:8.3,
    justifyContent: "center",
  alignItems: "center",
  width:'100%'
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
  }
  
})