import { Link, useLoaderData } from "react-router-dom";
import { addExpense, createBudget, deleteItem, fetchData, waait } from "../helpers";
import Intro from "../components/Intro";
import { toast } from 'react-toastify';
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import {motion} from 'framer-motion';


export const formAction = async ({request})=>{
   await  waait()
    const data = await request.formData()
    const {_action,...formData} = Object.fromEntries(data)

    if(_action === 'newUser'){
        try{
            localStorage.setItem('userName',JSON.stringify(formData.userName))
           return toast.success(`Welcome ${formData.userName}`)
        }
        catch(error){
            throw Error('There was a problem creating your account!')
        }
    }

    if(_action === 'createBudget'){
        try{
            createBudget({
                name : formData.newBudget,
                amount : formData.newBudgetAmount
            })
          return toast.success('Budget Created!')
        }
        catch(error){
             throw Error('There was a problem creating a new Budget!')
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
    if(_action === 'deleteExpense'){
        try{
            deleteItem({key:"expenses", id:formData.expenseId})
              return toast.success(`Expense deleted!`)
        }
        catch(error){
           throw Error('There was a problem deleting your Expense!')
        }
    }
}

export const dashboardLoader=()=>{
    const userName = fetchData('userName');
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses")
    return { userName,budgets,expenses}
}

const Dashboard = () => {
    const { userName,budgets,expenses} = useLoaderData()
    const date = new Date()
    const day = date.getDay()
    const dayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];



    return ( 
            <>
             { userName ? <div className="dashboard">
                <div className="welcome-holder" style={{display:"flex",justifyContent:"space-between",width:"100%"}}> <motion.div initial={{x:400,opacity:0}} animate={{x:0,opacity:1}} transition={{type:'spring',duration:1}} className="name"><h2 style={{alignSelf:"center"}}>Welcome,</h2><span className="userName">{userName}</span></motion.div> { budgets && <motion.div initial={{y:-100,opacity:0}} animate={{y:0,opacity:1}} transition={{type:'spring',duration:0.9,stiffness:110}} className="time"><span className="username">{dayList[day]}</span></motion.div>}</div> 
                <div className="grid-sm">
                    {   
                      budgets && budgets.length > 0 ? 
                        <div className="grid-lg">
                        <div className="flex-lg">
                            <AddBudgetForm/>
                            <AddExpenseForm budgets={budgets}/>
                        </div>
                        <h2>Allocated Budgets</h2>
                          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5,staggerChildren:1}}className="budgets">
                            {
                                budgets.map((budget)=>(
                                   <BudgetItem  key={budget.id} budget={budget}/>
                                ))
                            }
                          </motion.div>
                          {
                             expenses && expenses.length > 0 && (
                                <div className="grid-md">
                                    <h2>Recent Expenses</h2>
                                    <Table expenses={expenses.sort((a,b)=>b.createdAt - a.createdAt).slice(0,6)}/>
                                    { expenses.length > 5 && (
                                        <Link to={'expenses'} className="btn btn--dark">
                                            See All Expenses
                                        </Link>
                                                    ) }
                                </div>
                                )
                          }
                    </div>
                      : (
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.6}} className="grid-sm">
                            <p>Manage your finances anywhere, anytime with ease.</p>
                            <p>Create a budget to get started!</p>
                            <AddBudgetForm/>
                        </motion.div>
                      )
                    
                }
                </div>
             </div> : <Intro/> }
            </>
     );
}




 
export default Dashboard;