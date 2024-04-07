import { Form, useFetcher } from "react-router-dom";
import { TbMoneybag } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa";
import {
    AiOutlineArrowDown
} from "react-icons/ai";
import  illustration  from '../assets/illustration.svg'
import {motion} from 'framer-motion';

const Intro = () => {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === 'submitting'
    return (  
            <>
            <div className="intro" >
                <div>
                    <motion.h1
                    initial={{scale:0,opacity:0}}
                    animate={{scale:1,opacity:1}}
                    transition={{type:'spring',duration:0.5,stiffness:160}}
                     >
                        Administer Your <span className="accent">Finances<TbMoneybag/></span> without fuss
                    </motion.h1>
                    <motion.p
                    initial={{x:-1000}}
                    animate={{x:0}}
                    transition={{type:'spring',duration:1,}}
                    >Personal Budgeting is the key to financial freedom.Have your finances in one place. <aside style={{display:"inline-flex",alignItems:"center"}}>Get Started<AiOutlineArrowDown/></aside></motion.p>
                    <fetcher.Form method="post">
                        <input type="text" name="userName" required placeholder="Your Name" aria-label="Your Name"/>
                        <input type="hidden" name="_action" value={'newUser'}/>
                        <motion.button initial={{x:200,opacity:0}} animate={{x:0,opacity:1}} transition={{type:'spring',stiffness:120}} type='submit' className="btn btn--dark" disabled={isSubmitting}>
                            {
                           isSubmitting ? <div class="loader">
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
                       </div> : <div style={{display:"flex",alignItems:"center"}}>
                             <span>Create Account</span><FaUserPlus/>
                           </div> 
                        }
                           </motion.button>
                    </fetcher.Form>
                </div>
                <motion.div
                 initial={{opacity:0,y:50}}
                 animate={{opacity:1,y:0}}
                 transition={{type:'spring',delay:0.4,duration:1.2,stiffness:130}}
                >
                <img src={illustration} alt="person's__image" width={600} />
               
                </motion.div>

            </div>
            </>
    );
}




 
export default Intro;