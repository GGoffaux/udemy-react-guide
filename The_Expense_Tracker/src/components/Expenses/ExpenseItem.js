import React from 'react';
import ExpenseDate from './ExpenseDate';
import "./ExpenseItem.css";
import Card from "../UI/Card";

const ExpenseItem = (props) => {
  
  const expenseAmount = props.amount;

  const expenseTitle = props.title;

  return (
    <Card className="expense-item">
      <ExpenseDate date = {props.date}/>
      <div className="expense-item__description">
        <h2>{expenseTitle}</h2>
        <div className="expense-item__price">${expenseAmount}</div>        
      </div>
    </Card>
  );
}

export default ExpenseItem;
