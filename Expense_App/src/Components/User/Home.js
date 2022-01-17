import React,{useState,useEffect} from "react";
import Expenses from "../Expenses/Expenses";
import NewExpense from "../NewExpense/NewExpense";

const Home = () => {
    const [expenses,setExpenses]=useState([]);

    const getData=()=>{
        fetch('http://localhost:53535/api/expenses')
            .then((response) => response.json())
            .then((data) => {
                setExpenses(data);
            },(error)=>{
                console.log("Login to get data!");
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const addExpenseHandler = expense =>{
        setExpenses(prevExpenses =>{
            return(
                [expense, ...prevExpenses]
            )
        });
    }

    const onDelete=(id) =>{
        fetch('http://localhost:53535/api/expenses/' + id, {
        method: 'DELETE'
        }).then((result) => {
        result.json().then((data) =>{
            console.log('removed');
            getData();
        })  
        }).catch(err => {
            console.error(err)
        });
    }

    const onEdit=(id,title,amount,date)=>{
        fetch('http://localhost:53535/api/expenses',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body: JSON.stringify({ 
                id:id,
                Title:title,
                Amount:amount,
                date:date
            })
        }).then(res=>res.json())
        .then((data)=>{
            console.log(data);
            getData();
        },
        (error)=>{
            console.log('Failed');
        });  
    }

    return (
        <div>
            <NewExpense onAddExpense={addExpenseHandler} data={getData} />
            <Expenses items={expenses} delete={onDelete} edit={onEdit} />  
        </div>
    );
}

export default Home;