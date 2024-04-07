import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers";
import Nav from "../components/Nav";

const Main = () => {
    const { userName } = useLoaderData()
    return ( 
            <>
            <div className="layout">
            <Nav userName={userName}/>
            <main>
            <Outlet/>
            </main>
            </div>
            </>
     );
}
 
export const mainLoader=()=>{
    const userName = fetchData('userName')
    return { userName }
}
export default Main;