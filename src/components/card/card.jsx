import "./card.css"
import Button from "../button/button.jsx"
import { useState } from "react"

const Card = props => {
    const [ count, setCount ] = useState(0)

    const {course, onAddItem, onRemoveItem }= props

    const handleIncrement = () => {
        setCount( prev => prev + 1)
        onAddItem(course)
    }

    const handleDecrement = () => {
        setCount( prev => prev - 1)
        onRemoveItem(course)
    }


    return (
        <div className="card">
            <span className={`${ count !== 0 ? "card_badge" : "card_badge_hidden" }`}>{count}</span>

            <div className="img_container">
                <img src={course.Image} alt={course.title} width={"100%"} height={"230px"}/>
            </div>

            <div className="card_body">
                <h2 className="card_title">{course.title}</h2>
                <div className="card_price">{course.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD"
                })}</div>
            </div>


            <div className="hr"></div>

            <div className="btn_container">
                <Button title={"+"}  type={"add"} onClick = { handleIncrement } />
                { count !== 0 && (
                    <Button title={"-"}  type={"remove"} onClick = { handleDecrement } />
                )}
            </div>

        </div>
    )
}

export default Card