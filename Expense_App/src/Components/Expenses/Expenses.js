import React , {useState} from "react";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

const Expenses = (props) => {
  const [filteredYear,setFilteredYear]= useState("All");
  
  const filterChangeHandler=(selectedYear) =>{
    setFilteredYear(selectedYear)
  }

  const filteredExpenses= props.items.filter((expense) =>{
  
    const year = expense.date.slice(0,4);
    
    if(filteredYear==="All"){
      return (year==="2021"
      ||year==="2022"
      ||year==="2023"
      ||year==="2024"
      )
    } else {
      return year===filteredYear
    }
  });

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter 
          onChangeFilter={filterChangeHandler} 
          selected={filteredYear}
        />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList items={filteredExpenses} delete={props.delete} edit={props.edit} />
      </Card>
    </div>
  );
}

export default Expenses;