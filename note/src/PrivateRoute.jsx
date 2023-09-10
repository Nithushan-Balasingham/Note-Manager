import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return userInfo ? <Outlet /> : <navigate to='/' replace />;
};
export default PrivateRoute;