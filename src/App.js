import { Component, useState } from "react"
import { useEffect } from "react"

const App = () =>{
const [card,setCard] = useState("")
const [loading,setLoading] = useState(false)
const [error,setError] = useState({
    error:false,
    message:""
})
const getter = async() =>{
    try{
    setLoading(true)
    const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php/")
    if(response.status !== 200){
    throw new Error("not working")
    }
    const data = await response.json()
    setCard(data.data)
    setLoading(false)
    }catch (error) {
    setError({error:true,message:error.message})
    }
}
useEffect(()=>{
    getter()
},[])

if(error.error){
    return <h1>{error.message}</h1>
}
if(!card || loading){
    return <h1>loading...</h1>
}
return (
<div className="heada">
    <h1>Random Yu-Gi-Oh! Card Generator</h1>
    <Card card={card}/>
</div>
)
}

const Card = ({card}) =>{
    const [item,setItem] = useState("")
    const random = () =>{
        const num = Math.floor(Math.random()*11624)
        setItem(card[num])
    }
    useEffect(()=>{
        random()
    },[])
    if(!card){
        return null
    }
    if(!item){
        return null
    }
    return (
        <div className="main">
            <h2>Card Name: {item.name}</h2>
            <h3>Type: {item.type}</h3>
            <p>Description: {item.desc}</p>
            <div className="imag">
            {item.card_images.map((img,index)=>{
                return <img key={index} src={img.image_url}/>
            })}
            </div>
            <div>
            <button onClick={random}>Show another Card</button>
            </div>
        </div>
    )
}

export default App
