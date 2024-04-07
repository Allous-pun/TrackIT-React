import React from 'react'
import ExpenseItem from './ExpenseItem'
import {AnimatePresence, motion} from 'framer-motion';

const Table = ({expenses,showBudget=true}) => {
  return (
       <>
       <motion.div
         initial={{y:-20,opacity:0}}
         animate={{opacity:1,y:0}}
         transition={{duration:0.3}}
        className="table">
              <table>
                <thead>
                    <tr>
                        {
                            ['Name','Amount','Date', showBudget ? 'Budget' : '',''].map((header,index)=>(
                                <th key={index}>
                                    {header}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses.map((expense)=>(
                            <AnimatePresence>
                            <motion.tr 
                            exit={{scaleY:0}}
                            initial={{opacity:0}}
                            animate={{opacity:1}}
                             drag 
                            dragConstraints={{left:0,right:0,top:0,bottom:0}}
                            dragElastic={0.8}
                            key={expense.id}>
                                <ExpenseItem expense={expense} showBudget={showBudget}/>
                            </motion.tr>
                            </AnimatePresence>
                        ))
                    }
                </tbody>
              </table>
       </motion.div>
       </>
  )
}

export default Table
