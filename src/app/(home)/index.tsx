import { Text, View ,StyleSheet,Pressable,TouchableOpacity, Modal,FlatList,TextInput} from "react-native";
import { Stack } from "expo-router";
import React, {useState} from "react";
import Octicons from '@expo/vector-icons/Octicons';
import CountryFlag from "react-native-country-flag";













const data = [
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












const Notifybar = ({onPressb}: ntag) => (
  <View style={styles.notify}>
<Pressable onPress={onPressb}>
    <Octicons name="bell" size={20} color="azure" />
</Pressable>
  </View>
)


const Countrybar = ({onPressc, cname, cicon}: ctag) => (
  <View style={styles.countrybar}>
    <CountryFlag isoCode={cicon} size={15} />
    <Pressable onPress={onPressc}>
      <Text style={styles.text}>{cname}</Text>
    </Pressable>
  </View>
)


const CountryTag = ({cname, icon,onPressc}: ctag2) => (
    <TouchableOpacity style={styles.ctag} onPress={onPressc}>
      <CountryFlag isoCode={icon} size={20} />
      <Text style={styles.cntag}>{cname}</Text>
    </TouchableOpacity>
  )

  const Searchbar = ({setSearch, search}: stag) => (
    <View style={styles.sbox}>
      <TextInput placeholder="search by name" onChangeText={text => setSearch(text)} value={search} style={styles.input} />
    </View>
  )







export default function Index() {
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

  

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: '',
        headerRight: ()=> <Notifybar  onPressb={notifymod}/>,
        headerLeft: () => <Countrybar onPressc={cpick} cicon={selectedC.icon} cname={selectedC.name}/>
      }}/>
      
      <View>
        <Text>First screen.</Text>
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
                })
                closeModal();
                setSearch('')
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
  backgroundColor:'#66676F',
  width:200,
  height:30,
  justifyContent: 'center',
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
    backgroundColor:'#66676F',
  width:100,
  height:30,
  justifyContent: 'center',
  alignItems:'center',
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
      
    
  }
})