import './App.css'
import { getData } from './constants/db'
import Card from './components/card/card'
import Cart from './components/cart/cart'
import { useState } from 'react'
import { useEffect } from 'react'

const courseData = getData()

const telegram = window.Telegram.WebApp

function App() {
  const [ cartItems, setCartItems ] = useState([])

  useEffect( () => {
    telegram.ready()
  })


  const onAddItem = item => {
    const existItem = cartItems.find( c => c.id == item.id)
    console.log("Exist_item", existItem)

    if( existItem ){
      const newData = cartItems.map( c => c.id == item.id ? 
        {...existItem, quantity: existItem.quantity + 1} :
        c
      )
      console.log("Exist item bor", newData)
      setCartItems(newData)
    }
    else{
      const newData = [ ...cartItems, {...item, quantity: 1}]
      console.log("Exist item yo'q", newData)
      setCartItems(newData)
    }
  }

  const onRemoveItem = item => {
    const existItem = cartItems.find( c => c.id == item.id)
    console.log("Exist item", existItem)
    if( existItem.quantity == 1 ){
      const newData = cartItems.filter( c => c.id !== item.id)
      setCartItems(newData)
      console.log("1talik cart o'chdi", newData)
    }
    else{
      const newData = cartItems.map( c => c.id == existItem.id ? { ...existItem, quantity: existItem.quantity -1 } : c)
      setCartItems(newData)
      console.log("Cart 1taga kamaydi", newData)
    }
  }


  const onCheckout = () => {
    telegram.MainButton.text = "Sotib olish :)"
    telegram.MainButton.show()
  }



  return (<>
    <h1 className='main_title'>MDEV kurslari</h1>

    <Cart cartItems={cartItems} onCheckout={onCheckout} />

    <div className='cards_container'>
      {courseData.map( course => (
        <Card key={course.id} course={course} onAddItem={onAddItem}  onRemoveItem={onRemoveItem} />
      ))}
    </div>
  </>
  )
}

export default App
