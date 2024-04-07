import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { addExpense, deleteItem, getMatchingItems } from '../helpers';
import BudgetItem from '../components/BudgetItem';
import AddExpenseForm from '../components/AddExpenseForm';
import Table from '../components/Table';
import { toast } from 'react-toastify';

// loader
export const budgetPageLoader = async ({params})=>{
    const { id } = params;
    const budget = getMatchingItems({
        category: "budgets",
        key: "id",
        value: id
    })[0];
    if(!budget){
        throw Error(`This Budget doesn't exists!`)
    }
    const expenses = getMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: id
    });
    return {budget,expenses}
}

// action
export const budgetPageAction = async ({request})=>{

    const data = await request.formData()
    const {_action,...formData} = Object.fromEntries(data)

    if(_action === 'deleteExpense'){
        try{
              deleteItem({key:"expenses", id:formData.expenseId})
              return toast.success(`Expense deleted!`)
        }
        catch(error){
           throw Error('There was a problem deleting your Expense!')
        }
    }

    if(_action === 'addExpense'){
        try{
            addExpense({
                name : formData.newExpense,
                amount : formData.newExpenseAmount,
                budgetId : formData.newExpenseBudget
            })
              return toast.success(`Expense ${formData.newExpense} created!`)
        }
        catch(error){
           throw Error('There was a problem creating a new Expense!')
        }
    }

}

const BudgetPage = () => {
    const { budget,expenses } = useLoaderData();
   
  return (
       <>
        <div className="grid-lg"style={{"--accent":budget.color}} >
            <h1 className="h2">
                <span className="accent">{budget.name} </span>
                 Overview
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showButton={true}/>
                <AddExpenseForm budgets={[budget]} />
            </div>
            {
                expenses && expenses.length > 0 && (
                    <div className="grid-md">
                        <h2>
                            <span className="accent">{budget.name} Expenses</span>
                        </h2>
                        <Table expenses={expenses} showBudget={false}/>
                    </div>
                )
            }
        </div>
       </>
  )
}

export default BudgetPage
