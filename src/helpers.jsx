// intentional delay upon form submission
  export const waait =()=> new Promise(res =>( setTimeout(res,Math.random() * 3000)))

// local Storage
// fetch Data
export const fetchData=(key)=>{
    return JSON.parse(localStorage.getItem(key))
}

// delete Data
export const deleteData=({key})=>{
    return localStorage.removeItem(key)
}

// generating random colors for the budget
const generateColors = ()=>{
    const existingBudgetsLength = fetchData('budgets')?.length ?? 0 
    return `${existingBudgetsLength * 50} 75% 50%`
}

// creating budget 
export const createBudget=({name,amount})=>{
    const newBudget = {
        id: crypto.randomUUID(),
        name : name,
        amount : +amount,
        createdAt : Date.now(),
        color : generateColors()
    }
    const existingBudgets = fetchData('budgets') ?? []
    return localStorage.setItem('budgets',JSON.stringify([...existingBudgets,newBudget]))
}

// creating Expense
export const addExpense=({name,amount,budgetId})=>{
    const newExpense = {
        id: crypto.randomUUID(),
        name : name,
        amount : +amount,
        createdAt : Date.now(),
        budgetId : budgetId
    }
    const existingExpenses = fetchData('expenses') ?? []
    return localStorage.setItem('expenses',JSON.stringify([...existingExpenses,newExpense]))
}

// getMatchingItems
export const getMatchingItems=({category,key,value})=>{
      const data = fetchData(category) ?? []
      return data.filter((eachBudget)=> eachBudget[key] == value)
}

// delete expense Item
export const deleteItem=({key,id})=>{
    const existingData = fetchData(key);
    if(id){
        const newData = existingData.filter((eachBudget)=>eachBudget.id !== id )
        return localStorage.setItem(key,JSON.stringify(newData))
    }
}

// Calculate spent
export const calculateSpent=(budgetId)=>{
   const expenses = fetchData("expenses") ?? []
   const budgetSpent = expenses.reduce((acc,expense)=>{
    //   check if expense.budgetId === budgetId
           if(expense.budgetId !== budgetId) return acc

    // add the amount to my total
      return acc += expense.amount
   },0)
   return budgetSpent;
}

// formatting ProgressBar
export const formatProgressBar=(amount)=>{
    return amount.toLocaleString(undefined,{
        style : "percent",
        minimumFractionDigits: 0 
    })
}

// formatting Currency
export const formatCurrency = (amount)=>{
    return amount.toLocaleString(undefined,{
        style : "currency",
        currency : "Ksh"
    })
}

// formatting Date
export const formatDate =(epoch)=>{
    return new Date(epoch).toLocaleDateString()
}
