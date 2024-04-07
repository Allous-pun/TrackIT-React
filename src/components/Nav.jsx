import { Form, NavLink, redirect } from "react-router-dom";
 import {GiExpense} from 'react-icons/gi'
 import {GrTrash} from 'react-icons/gr';
import { deleteData } from "../helpers";
import { toast } from 'react-toastify';
import {motion} from 'framer-motion';
import { useState } from "react";


const Nav = ( {userName} ) => {
    return ( 
          <>
           <nav>
             <NavLink to={'/'} aria-label="Home">
                  <div style={{display:"flex",alignItems:"start"}}>
                 <motion.span
                 initial={{y:-100}}
                 animate={{y:0}}
                 transition={{type:'spring',delay:1,duration:1.2,stiffness:180}}
                  >
                 <GiExpense/>
                 </motion.span> 

                <motion.span
                 initial={{opacity:0,scale:0}}
                 animate={{opacity:1,scale:1}}
                 transition={{duration:0.3}}
                  >
                 TrackIt
                 </motion.span></div> 
             </NavLink>
             { userName &&
                  (
                    <Form method="post" action="/logout" onSubmit={(e)=>{if(!confirm('Delete User and all Data ?')) e.preventDefault()}}>
                        <button type="submit" className="btn btn--warning">
                            <span><GrTrash/> </span>
                        </button>
                    </Form>
                )
             }
           </nav>
          </>
     );
}

export const logoutAction = ()=>{
         deleteData({
            key:"userName"
         })
         deleteData({
            key:"budgets"
         })
         deleteData({
            key:"expenses"
         })

        //  toast.promise({pending,error,sucess})
         toast.success('User deleted!')

     return  redirect('/')
}
 
export default Nav;
