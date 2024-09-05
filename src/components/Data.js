import { useEffect, useRef, useState } from "react";

const Data = ()=>{
    const [data, setData] = useState([]);
    const searchText = useRef("");

const getData= async ()=>{
const data = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
const json = await data.json();
setData(json);
}

useEffect(()=>{
getData();
},[])

 const searchByName=()=>{
    const filteredName = Array.isArray(data) ? data.filter((item)=>(item.name.toLowerCase().includes(searchText.current.value.toLowerCase()) || item.symbol.toLowerCase().includes(searchText.current.value.toLowerCase()) )):null ;
    setData(filteredName);
 }

 const sortByMarketCap = ()=>{
    const sortedMarketCap = [...data].sort((a,b)=>a.market_cap - b.market_cap)
    setData(sortedMarketCap)
 }

 const sortByPercentage =()=>{
    const sortedPercentage = [...data].sort((a,b)=>a.price_change_percentage_24h - b.price_change_percentage_24h)
    setData(sortedPercentage)
 }
    return (

     

        <div className="mt-20   text-white w-screen">
            <div>
         <input 
         ref={searchText}
         className="bg-black py-2 mb-10 text-white mt-12 mx-56 rounded-lg border-2 w-[40%] border-gray-500"
          type="text"
           placeholder="search"
           onChange={searchByName}
           />
          
           <button 
           onClick={sortByMarketCap}
           className="border-2  border-gray-500 p-2 ">Sort By Market Cap
           </button>

            <button 
           onClick={sortByPercentage}
           className="border-2  border-gray-500 p-2 ">Sort By percentage
           </button>
           
  </div>
          


           { Array.isArray(data)?
            data?.map((item , index)=>(
               <table className="m-auto grid grid-cols-6 gap-20 border-b-2 mt-10 w-[60%]   border-gray-200"  key = {item.id}>
                <tr className=" flex border-b">
                <img className="w-12 mr-5 " src={item.image} alt="image"/>
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6  py-4">{item.name}</td>
                <td className="px-6 py-4">{item.symbol}</td>
                <td className="px-6 py-4">{item.market_cap}</td>
                <td className="px-6 py-4" >${item.current_price}</td>
                <td className="px-6 py-4" >{item.price_change_percentage_24h}%</td>
                </tr>
                </table>
            ) ):
            null
           }
        </div>
    )
}
export default Data;