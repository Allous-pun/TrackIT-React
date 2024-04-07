import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";
import { HiCash } from "react-icons/hi";
import {motion} from 'framer-motion'

const AddBudgetForm = () => {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state == 'submitting'
    const myRef = useRef()

    useEffect(()=>{
        if(!isSubmitting){
           myRef.current.reset()
        }
    },[isSubmitting])
    return ( 
           <>
           <div className="form-wrapper">
            <h2 className="h3">Create Budget</h2>
            <fetcher.Form method="post" className="grid-sm" ref={myRef}>
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Name</label>
                    <input type="text" name="newBudget" id="newBudget" placeholder="e.g., Utilities " required  />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input type="number" step={0.01} name="newBudgetAmount" id="newBudgetAmount" placeholder="e.g., Ksh. 1550" required inputMode="decimal" />
                </div>
                <input type="hidden" name="_action" value={'createBudget'} />
                 <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.5}} type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? (
                        <div class="loader">
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                        <div class="bar4"></div>
                        <div class="bar5"></div>
                        <div class="bar6"></div>
                        <div class="bar7"></div>
                        <div class="bar8"></div>
                        <div class="bar9"></div>
                        <div class="bar10"></div>
                        <div class="bar11"></div>
                        <div class="bar12"></div>
                    </div>): ( <div style={{display:"flex",alignItems:"center"}}><span>Create Budget</span><HiCash/></div>)
                    }
                 </motion.button>
            </fetcher.Form>
           </div>
           </>
     );
}
 
export default AddBudgetForm;
