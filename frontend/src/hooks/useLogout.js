import { useAuthContext } from "./useAuthContext";
import { useUserContext } from "./useUserContext";
import { useNavigate } from "react-router-dom"; 
export const useLogout = ()=>
{
    const {dispatch} = useAuthContext()
    const {dispatch: usersDispatch} = useUserContext()
    const navigate = useNavigate()
    const logout =()=>
    {
        //remove user from storage
        //localStorage.removeItem('realUser')
        localStorage.removeItem('item')
        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        usersDispatch({type:'SET_USERS',payload: null})
        navigate("/");
    }
    return {logout}
}