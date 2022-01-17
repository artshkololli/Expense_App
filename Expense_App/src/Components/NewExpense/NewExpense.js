import React , {useState,useEffect} from "react";
import ExpenseForm from "./ExpenseForm";
import { Link } from "react-router-dom";
import "./NewExpense.css";

const NewExpense = (props) =>{
    const [isEditing,setIsEditing] = useState(false);
  
    const getData=() =>{
        fetch('http://localhost:53535/api/expenses')
        .then((response) => response.json())
        .then((data) => {
            //
        },(error)=>{
            console.log("Login to get data!");
        });
    }

    useEffect(()=>{
        getData();
    },[])

    const saveExpenseDataHandler = (enteredExpenseData) =>{
        const expenseData ={
            ...enteredExpenseData,
        };
        props.onAddExpense(expenseData);
        getData();
        setIsEditing(false);

    };
    const startEditingHandler = () =>{
        setIsEditing(true);
    }

    const stopEditingHandler = () =>{
        setIsEditing(false);
    }

    const onLogout = () =>{
        localStorage.removeItem("name");
    }

    const user= localStorage.getItem("name");

    return(
        <React.Fragment>
            <div className="container">
                <div className="logout-btn">
                    <h4>{`Hello   ${user}  `}</h4>
                    <button onClick={onLogout} ><Link to="/"> LOGOUT </Link></button>
                </div>
                <div className="new-expense">
                    {!isEditing && <button onClick={startEditingHandler}>Add New Expense</button>}
                    {isEditing &&<ExpenseForm 
                        onSaveExpenseData={saveExpenseDataHandler} 
                        onCancel={stopEditingHandler} 
                        getItems={getData}
                    />}
                </div>
            </div>
        </React.Fragment>
    )
}

export default NewExpense;