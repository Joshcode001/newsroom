import { Text, View ,StyleSheet,Pressable,TouchableOpacity, Modal,FlatList,TextInput, ScrollView,ActivityIndicator} from "react-native";
import { Stack,useRouter,  } from "expo-router";
import React, {useState, useEffect,useRef, RefObject} from "react";
import Octicons from '@expo/vector-icons/Octicons';
import CountryFlag from "react-native-country-flag";
import {Image} from 'expo-image' ;
import { formatRFC7231} from "date-fns"

















  export const data = [
  {name: 'NIGERIA', icon: 'ng'},
  {name: 'UNITED STATES', icon: 'us'},
  {name: 'UNITED KINGDOM', icon: 'gb'},
  {name: 'UNITED ARAB EMIRATES', icon: 'ae'},
  {name: 'ARGENTINA', icon: 'ar'},
  {name: 'AUSTRALIA', icon: 'au'},
  {name: 'BELGIUM', icon: 'be'},
  {name: 'BRAZIL', icon: 'br'},
  {name: 'CAMEROON', icon: 'cm'},
  {name: 'CANADA', icon: 'ca'},
  {name: 'CHINA', icon: 'cn'},
  {name: 'COTE D IVOIRE', icon: 'ci'},
  {name: 'EGYPT', icon: 'eg'},
  {name: 'FRANCE', icon: 'fr'},
  {name: 'GABON', icon: 'ga'},
  {name: 'GERMANY', icon: 'de'},
  {name: 'GHANA', icon: 'gh'},
  {name: 'INDIA', icon: 'in'},
  {name: 'ISRAEL', icon: 'il'},
  {name: 'ITALY', icon: 'it'},
  {name: 'JAMAICA', icon: 'jm'},
  {name: 'JAPAN', icon: 'jp'},
  {name: 'KENYA', icon: 'ke'},
  {name: 'MALI', icon: 'ml'},
  {name: 'MEXICO', icon: 'mx'},
  {name: 'MONACO', icon: 'mc'},
  {name: 'MOROCCO', icon: 'ma'},
  {name: 'NETHERLANDS', icon: 'nl'},
  {name: 'NORWAY', icon: 'no'},
  {name: 'PORTUGAL', icon: 'pt'},
  {name: 'QATAR', icon: 'qa'},
  {name: 'RUSSIA', icon: 'ru'},
  {name: 'PHILIPPINES', icon: 'ph'},
  {name: 'SAUDI ARABIA', icon: 'sa'},
  {name: 'SENEGAL', icon: 'sn'},
  {name: 'NEW ZEALAND', icon: 'nz'},
  {name: 'SINGAPORE', icon: 'sg'},
  {name: 'SOUTH AFRICA', icon: 'za'},
  {name: 'SPAIN', icon: 'es'},
  {name: 'SWEDEN', icon: 'se'},
  {name: 'SWITZERLAND', icon: 'ch'},
  {name: 'TANZANIA', icon: 'tz'},
  {name: 'TOGO', icon: 'tg'},
  {name: 'UGANDA', icon: 'ug'},
  {name: 'ZIMBABWE', icon: 'zw'},
  {name: 'ZAMBIA', icon: 'zm'},
  {name: 'URUGUAY', icon: 'uy'},
  {name: 'UKRAINE', icon: 'ua'},
  {name: 'THAILAND', icon: 'th'},
  {name: 'SIERRA LEONE', icon: 'sl'},


]









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
ScrollRef: RefObject<ScrollView | null>,




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









export const Navbar = ({ router,selectedC,Ref, icon,  isC, isActive, ScrollRef}: natag) => (
  
  <ScrollView horizontal={true} ref={ScrollRef}  >
<TouchableOpacity  ref={Ref} disabled={isActive}
  style={[{backgroundColor:'#052214'},styles.nav,{shadowColor: (isC === 'business') ? '#E51807': '#000'}]} 
    onPress={()=>{
    
      Ref.current = 'business'
        router.push({
          pathname: '/[category]',
          params:{
            country:selectedC,
          Category:Ref.current,
            icon:icon,
            num:0
          }
        })
    }}>
      <Text style={styles.text}>Business</Text></TouchableOpacity>
    <TouchableOpacity disabled={isActive}
    style={[{backgroundColor:'#250434'},styles.nav,{shadowColor: (isC === 'crime') ? '#E51807': '#000'}]}
      onPress={()=> {
    
      Ref.current = 'crime';
        router.push({
          pathname: '/category',
          params:{
            country:selectedC,
            Category: Ref.current,
              icon:icon,
              num:0
          }
        })
      }}>
      <Text style={styles.text}>Crime</Text></TouchableOpacity>
    <TouchableOpacity disabled={isActive}
      style={[{backgroundColor:'#16212B'},styles.nav,{shadowColor: (isC === 'domestic') ? '#E51807': '#000'}]}
      onPress={()=> {
 
        Ref.current = 'domestic';
        router.push({
          pathname: '/category',
          params:{
            country:selectedC,
            Category: Ref.current,
              icon:icon,
              num:350
          }
        })
        }}>
      <Text style={styles.text}>Domestic</Text></TouchableOpacity>
    <TouchableOpacity disabled={isActive}
      style={[{backgroundColor:'#322E07'},styles.nav, {shadowColor: (isC === 'education') ? '#E51807': '#000'}]}
      onPress={()=> {

        Ref.current = 'education';
        router.push({
          pathname: '/category',
          params:{
            country:selectedC,
            Category: Ref.current,
              icon:icon,
              num:350
          }
        })
        }}>
      <Text style={styles.text}>Education</Text></TouchableOpacity>
    <TouchableOpacity disabled={isActive}
      style={[{backgroundColor:'#391248'},styles.nav,{shadowColor: (isC === 'entertainment') ? '#E51807': '#000'}]}
      onPress={()=> {
 
        Ref.current = 'entertainment';
        router.push({
          pathname: '/category',
          params:{
            country:selectedC,
            Category: Ref.current,
              icon:icon,
              num:710
          }
        })
        }}>
      <Text style={styles.text}>Entertainment</Text></TouchableOpacity>
    <TouchableOpacity disabled={isActive}
      style={[{backgroundColor:'#09037D'},styles.nav,{shadowColor: (isC === 'environment') ? '#E51807': '#000'}]}
      onPress={()=> {

        Ref.current = 'environment';
        router.push({
          pathname: '/category',
          params:{
            country:selectedC,
            Category: Ref.current,
              icon:icon,
              num:710
          }
        })
        }}>
      <Text style={styles.text}>Environment</Text></TouchableOpacity>
    <TouchableOpacity disabled={isActive}
      style={[{backgroundColor:'#7D0A03'},styles.nav,{shadowColor: (isC === 'food') ? '#E51807': '#000'}]}
      onPress={()=> {
    
        Ref.current = 'food';
        router.push({
          pathname: '/category',
          params:{
            country:selectedC,
            Category: Ref.current,
              icon:icon,
              num:1070
          }
        })
        }}>
      <Text style={styles.text}>Food</Text></TouchableOpacity>
    <TouchableOpacity disabled={isActive}
      style={[{backgroundColor:'#7D0360'},styles.nav,{shadowColor: (isC === 'health') ? '#E51807': '#000'}]}
        onPress={()=> {
      
          Ref.current = 'health';
          router.push({
          pathname: '/category',
          params:{
            country:selectedC,
            Category: Ref.current,
              icon:icon,
              num:1070
          }
        })
          }}>
      <Text style={styles.text}>Health</Text></TouchableOpacity>
    <TouchableOpacity disabled={isActive}
    style={[{backgroundColor:'#696200'},styles.nav,{shadowColor: (isC === 'lifestyle') ? '#E51807': '#000'}]}
        onPress={()=> {
    
          Ref.current ='lifestyle';
          router.push({
          pathname: '/category',
          params:{
            country:selectedC,
            Category: Ref.current,
              icon:icon,
              num:1430
          }
        })
          }}>
      <Text style={styles.text}>Lifestyle</Text></TouchableOpacity>
    <TouchableOpacity disabled={isActive}
    style={[{backgroundColor:'#00c5ff'},styles.nav,{shadowColor: (isC === 'politics') ? '#E51807': '#000'}]}
        onPress={()=>{
 
          Ref.current = 'politics';
            router.push({
          pathname: '/category',
          params:{
            country:selectedC,
            Category: Ref.current,
              icon:icon,
              num:1430
          }
        })
            }}>
      <Text style={styles.text}>Politics</Text></TouchableOpacity>
    <TouchableOpacity disabled={isActive}
      style={[{backgroundColor:'#ffa5f2'},styles.nav,{shadowColor: (isC === 'science') ? '#E51807': '#000'}]}
      onPress={()=> {
  
        Ref.current = 'science';
        router.push({
          pathname: '/category',
          params:{
            country:selectedC,
            Category: Ref.current,
              icon:icon,
              num:1800
          }
        })
        }}>
      <Text style={styles.text}>Science</Text></TouchableOpacity>
    <TouchableOpacity disabled={isActive}
      style={[{backgroundColor:'#7765c1'},styles.nav,{shadowColor: (isC === 'sports') ? '#E51807': '#000'}]}
      onPress={()=> {
 
        Ref.current = 'sports'
        router.push({
          pathname: '/category',
          params:{
            country:selectedC,
            Category: Ref.current,
              icon:icon,
              num:1800
          }
        })
        }}>
      <Text style={styles.text}>Sports</Text></TouchableOpacity>
    <TouchableOpacity disabled={isActive}
      style={[{backgroundColor:'#5f5f00'},styles.nav,{shadowColor: (isC === 'technology') ? '#E51807': '#000'}]}
      onPress={()=> {
  
        Ref.current = 'technology';
        router.push({
          pathname: '/category',
          params:{
            country:selectedC,
            Category: Ref.current,
              icon:icon,
              num:2200
          }
        })
        }}>
      <Text style={styles.text}>Technology</Text></TouchableOpacity>
    <TouchableOpacity disabled={isActive}
      style={[{backgroundColor:'#ff76d9'},styles.nav,{shadowColor: (isC === 'tourism') ? '#E51807': '#000'}]}
      onPress={()=> {

        Ref.current = 'tourism';
        router.push({
          pathname: '/category',
          params:{
            country:selectedC,
            Category: Ref.current,
            icon:icon,
            num:2200
          }
        })
        }}>
      <Text style={styles.text}>Tourism</Text></TouchableOpacity>
  </ScrollView>
  )


 























export default function Index() {
  const Ref = useRef('')
  const ScrollRef = useRef<ScrollView>(null)
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
    <View style={styles.container}>
      <Stack.Screen options={{
        title: '',
        headerRight: ()=> <Notifybar  onPressb={notifymod}/>,
        headerLeft: () => <Countrybar onPressc={cpick} cicon={selectedC.icon} cname={selectedC.name}/>
      }}/>
      <View style={styles.navbar}>
      <Navbar   router={router} isActive={isActive} 
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
  
    }


















    })