import React,{createContext,useState, PropsWithChildren, useEffect} from "react";
import { useRouter } from "expo-router";

type props  = {
_id: string,
fname: string,
category: string,
image: string,
total: string
}

type item = {
item: string,
color: string
}

type dat = {
name: string,
icon: string
}


type Auth = {
isLoggedIn: boolean,
LogIn: () => void,
LogOut: () => void,
listp: props[],
lists: props[],
listc: props[],
listt: props[],
category: item[],
data:dat[]
}


export const AuthContext = createContext({
isLoggedIn: false,
LogIn: () => {},
LogOut: () => {},
listp:  [] as props[],
lists: [] as props[],
listc: [] as props[],
listt: []  as props[],
category: [] as item[],
data :[] as dat[]
})



export function AuthProvider ({children}:PropsWithChildren) {
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [list, setlist] = useState<props[]>()
const router = useRouter()



let listp: props[] = [];
let lists: props[] = [];
let listc: props[] = [];
let listt: props[] = [];


if (list) {
listp = list.filter(item =>item.category === 'Popular People!' )
lists = list.filter(item =>item.category === 'Popular Sources!' )
listc = list.filter(item =>item.category === 'Popular CryptoCoins!' )
listt = list.filter(item =>item.category === 'Popular Teams!' )
}




const category:item[] = [{
item:'business',
color:'#052214'
},
{
item:'crime',
color:'#250434'
},
{
item:'domestic',
color:'#16212B'
},
{
item:'education',
color:'#322E07'
},
{
item:'entertainment',
color:'#391248'
},
{
item:'environment',
color:'#09037D'
},
{
item:'food',
color:'#7D0A03'
},
{
item:'health',
color:'#7D0360'
},
{
item:'lifestyle',
color:'#696200'
},
{
item:'politics',
color:'#00c5ff'
},
{
item:'science',
color:'#ffa5f2'
},
{
item:'sports',
color:'#7765c1'
},
{
item:'technology',
color:'#5f5f00'
},
{
item:'tourism',
color:'#ff76d9'
},
]


const data:dat[] = [
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















const getData = async () => {
try {
const data = await fetch('https://b248-102-91-71-230.ngrok-free.app/data/initdata')
const json = await data.json()
setlist(json)
} catch (err) {
console.log(err)
}

}



const LogIn = () => {
setIsLoggedIn(true)
router.replace('/')
}


const LogOut = () => {
setIsLoggedIn(false)
}



useEffect(() => {
getData()
},[])




return (
<AuthContext.Provider value={{isLoggedIn, LogIn, LogOut, listc, listp, lists, listt, category, data}}>
{children}
</AuthContext.Provider>
)
}