import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";

export const expensesLoader =()=>{
  const expenses = fetchData('expenses')
    return { expenses }
}

export const expenseAction = async ({request})=>{

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

}
const ExpensePage = () => {
    const {expenses} = useLoaderData()
    return ( 
            <>
            <div className="grid-lg">
            <h3>All Expenses</h3>
            {
             expenses && expenses.length > 0 ?
             <div className="grid-md">
                <h2>Recent Expenses <small className="expenseList">{expenses.length} expenses</small></h2>
                <Table expenses={expenses}/>
                
             </div> : <p>No Expenses Found</p>
            }
            

            </div>

            </>
     );
}
 
export default ExpensePage;