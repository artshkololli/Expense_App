import React, { useEffect , useState } from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css"

const ExpensesList = (props) =>{
  const [items, setItems] = useState([]);

  const getData=() =>{
    fetch('http://localhost:53535/api/expenses')
      .then((response) => response.json())
      .then((data) => {
          setItems(data);
        },(error)=>{
          console.log("Login to get data!");
        });
  }
  useEffect(getData,[])

  if(props.items.length === 0){
    return(
        <h3 className="expenses-list__fallback">Found no expenses.</h3>
    );
  }

  const totalExpenses = () =>{
    let total=0;
    props.items.map((expense) => total += +expense.Amount)
    return total.toFixed(2);
  }

  const total=totalExpenses();
  const totalStyle={color:"white" ,textAlign:"right" , paddingRight:"10px",marginTop:"10px"};
  
  return(
    <ul className="expenses-list">
        <h4 style={totalStyle}>{`Total: ${total}€`}</h4>
        {
          props.items.sort((a, b) => (a.date < b.date) ? 1 : -1).map(expense =>{
            return(
              <ExpenseItem 
              key={expense.id}
              id={expense.id}
              title={expense.Title}
              amount={expense.Amount}
              date={expense.date}
              getData={getData}
              onDelete={() =>props.delete(expense.id)}
              onEdit={props.edit}
              />
              )
          })
        }
    </ul>
  )
};

export default ExpensesList;
