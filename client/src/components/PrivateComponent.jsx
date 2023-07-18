
import {Navigate,Outlet} from 'react-router-dom'

const PrivateComponent=()=>{
    const auth = localStorage.getItem('token')
    return auth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateComponent

const AdminPrivate = ()=>{
    const auth = localStorage.getItem('admin')
    return auth ? <Outlet />:<Navigate to='/admin/login'/>
}

export {AdminPrivate}