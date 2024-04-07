import React from 'react'
import { calculateSpent, deleteItem, formatCurrency, formatProgressBar, getMatchingItems } from '../helpers'
import { Form,Link, redirect } from 'react-router-dom'
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FormattedNumber } from 'react-intl';

// deleteBudgetAction
export const deleteBudgetAction =({params})=>{
    try{
       deleteItem({
        key: "budgets",
        id: params.id
       })

       const associatedExpenses = getMatchingItems({
        category : "expenses",
        key: "budgetId",
        value: params.id
       })

       associatedExpenses.forEach((expense)=>{
          deleteItem({
            key : "expenses",
            id : expense.id
          })
       })
       toast.success("Budget Deleted!")
       return redirect('/')
    }
    catch(error){
        throw Error("There was a problem deleting this Budget!")
    }
}
const BudgetItem = ({budget,showButton=false}) => {
    const { id,name,amount,color} = budget
    const spent = calculateSpent(id)
  return (
       <>
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay:0.5,duration:1}} className="budget" style={{"--accent": color}}>
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Budgeted</p>
            </div>
             <progress max={amount} value={spent}>
                  {formatProgressBar(spent / amount)}
             </progress>
             <div className="progress-text">
                <small>{formatCurrency(spent)} spent</small>
                <small>{formatCurrency(amount - spent)} available</small>
             </div>
                 {
                    showButton ? (
                        <Form method='post' action='delete' onSubmit={(e)=>{
                            if(!confirm("Are you sure you want to remove budget?")){e.preventDefault()}
                            }}>
                            <button type='submit' className='btn'>Delete Budget</button>
                        </Form>
                    ) : (
                        <Link to={`/budgets/${id}`} className='btn' >
                            <span>View Budget</span>
                        </Link>
                    )
                 }
        </motion.div>
       </>
  )
}

export default BudgetItem
