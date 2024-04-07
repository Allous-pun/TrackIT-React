import { useNavigate, useRouteError,Link } from "react-router-dom";

const Error = () => {
    const error = useRouteError()
    const navigate = useNavigate()
    return ( 
           <>
             <div className="error">
                <h3>Oops!.We've got a problem!</h3>
                <h4>{error.message}</h4>
                <div className="flex-md">
                    <button className="btn btn--dark" onClick={()=>{navigate(-1)}}>
                        <span>Go back</span>
                    </button>
                    <Link to='/'>
                        <span className="btn btn--dark">Go Home</span>
                    </Link>
                </div>
             </div>
           </>
     );
}
 
export default Error;