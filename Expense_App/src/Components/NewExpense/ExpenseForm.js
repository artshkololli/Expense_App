import React , {useState} from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) =>{
    const [enteredTitle,setEnteredTitle] = useState('');
    const [enteredAmount,setEnteredAmount] = useState('');
    const [enteredDate,setEnteredDate] = useState('');

    const getItems=()=>{
        props.getItems();
    }

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
        const decimalAmount = +enteredAmount;

        const expenseData={
            Title:enteredTitle,
            Amount:decimalAmount.toFixed(2),
            date:enteredDate
        }
        
        if(titleInvalid || amountInvalid || dateInvalid ){
            return;
        }else{
            fetch('http://localhost:53535/api/expenses',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                body: JSON.stringify({ 
                    Title:enteredTitle,
                    Amount:enteredAmount,
                    date:enteredDate
                })
            }).then(res=>res.json())
            .then((result)=>{
                console.log("Added")
                getItems();
            },
            (error)=>{
                console.log('Failed');
            });
        }

        props.onSaveExpenseData(expenseData);
        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');
    }


    const titleInvalid = enteredTitle === "";
    const amountInvalid = enteredAmount === "" || enteredAmount <=0;
    const dateInvalid = enteredDate === "";
    const errorStyle = {color:"red", fontSize:"13px"};

    const titleInput =
        <div className="new-expense__control">
            <label>Title</label>
            <input 
                type="text" 
                value={enteredTitle} 
                onChange={titleChangeHandler} 
            />
            {titleInvalid && <p style={errorStyle}>Please enter a valid title.</p>}
        </div>
    
    const amountInput = 
        <div className="new-expense__control">
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
        <div className="new-expense__control">
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

    return(
        <div>
            <form onSubmit={submitHandler}>
                <div className="new-expense__controls">
                    {titleInput}
                    {amountInput}
                    {dateInput}
                </div>
                <div className="new-expense__actions">
                    <button type="button" onClick={props.onCancel}>Cancel</button>
                    <button type="submit">Add Expense</button>
                </div>
            </form>
        </div>
    )
}

export default ExpenseForm;