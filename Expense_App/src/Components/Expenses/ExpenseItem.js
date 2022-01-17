import React,{useState} from "react";
import "./ExpenseItem.css";
import "./EditExpense.css"
import ExpenseDate from "./ExpenseDate"
import Card from "../UI/Card";
import removeImg from "./remove.jpg";
import editImg from "./pencil.png";

const ExpenseItem = (props) => {
  const [editExpense, setEditExpense] = useState(false);
  const [enteredTitle,setEnteredTitle] = useState("");
  const [enteredAmount,setEnteredAmount] = useState("");
  const [enteredDate,setEnteredDate] = useState("")
    
  const onDelete=()=>{
    props.onDelete()
  }
    const onEdit = () =>{
        setEnteredTitle(props.title)
        setEnteredAmount(props.amount)
        setEnteredDate(props.date)
        setEditExpense(true)
    }

const onCancel =() =>{
    setEditExpense(false);
}
//EDIT EXPENSE from here!
const titleChangeHandler = (event) =>{
    setEnteredTitle(event.target.value);
}

const amountChangeHandler = (event) =>{
    setEnteredAmount(event.target.value);
}
const dateChangeHandler = (event) =>{
    setEnteredDate(event.target.value);
}

const submitHandler = (event) =>{
    event.preventDefault();
    if(titleInvalid || amountInvalid || dateInvalid ){
        return;
    }else{
        props.onEdit(props.id,enteredTitle,enteredAmount,enteredDate);
        setEditExpense(false);
    }
  }

  const titleInvalid = enteredTitle === "";
  const amountInvalid = enteredAmount === "" || enteredAmount <0;
  const dateInvalid = enteredDate === "";
  const errorStyle = {color:"red", fontSize:"13px"};

  const titleInput =
      <div className="edit-expense__control">
          <label>Title</label>
          <input 
              type="text" 
              value={enteredTitle} 
              onChange={titleChangeHandler} 
          />
          {titleInvalid && <p style={errorStyle}>Please enter a valid title.</p>}
      </div>
  
  const amountInput = 
      <div className="edit-expense__control">
          <label>Amount (€ )</label>
          <input 
              type="number" 
              value={enteredAmount} 
              onChange={amountChangeHandler} 
              min="0.01" 
              step="0.01" 
          />
          {amountInvalid && <p style={errorStyle}>Please enter a valid amount.</p>}
      </div>

  const dateInput = 
      <div className="edit-expense__control">
          <label>Date</label>
          <input 
              type="date" 
              value={enteredDate} 
              onChange={dateChangeHandler} 
              min="2021-01-01"
              max="2024-31-12" 
          />
          {dateInvalid && <p style={errorStyle}>Please enter a valid date.</p>}
      </div>
  //display amount variable!
  const decimalAmount= +props.amount;
  return (
    <li>
      <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">{decimalAmount.toFixed(2)}€</div>
        <button onClick={onEdit}><img alt="edit" src={editImg} /></button>
        <button onClick={onDelete}><img alt="delete" src={removeImg} /></button>
      </div>
      </Card>
      {editExpense ?
      <div className="edit-container">
            <form onSubmit={submitHandler}>
                <div className="edit-expense">
                    <div className="edit-expense__controls">
                        {titleInput}
                        {amountInput}
                        {dateInput}
                        <div className="edit-expense__actions">
                            <button type="button" onClick={onCancel}>Cancel</button>
                            <button type="submit">Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
      :null
      }
    </li>
  );
}

export default ExpenseItem;
