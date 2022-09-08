import React, { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";
import Card from "../UI/Card";
import ExpensesChart from "./ExpensesChart";
import "./Expenses.css";

const Expenses = (props) => {

  const [selectedYear, setSelectedYear] = useState("2020");

  const selectedYearHandler = (newSelectedYear) => {
    setSelectedYear(newSelectedYear);
  };

  const filtererdItems = props.items.filter((expense)=>{return expense.date.getFullYear().toString() === selectedYear});

  return (
    <li>
      <Card className="expenses">
        <ExpensesFilter
          selected={selectedYear}
          onChangeSelectedYear={selectedYearHandler}
        />
        <ExpensesChart expenses={filtererdItems}/>
        <ExpensesList items = {filtererdItems}/>
      </Card>
    </li>        
  );
};

export default Expenses;
