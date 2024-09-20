import { useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

export function PublicLayout() {
  const isAuth = useSelector(({auth}) => auth.isAuth);
  const location = useLocation();

  if (isAuth) return <Navigate to="/protected" state={{ from: location }} replace />;

  return (
    <div>
      <Outlet />
    </div>
  );
}

export function PrivateLayout() {
  const isAuth = useSelector(({auth}) => auth.isAuth);
  const location = useLocation();
  if (!isAuth) return <Navigate to="/login" state={{ from: location }} replace />;

  return (
    <div>
      <Outlet />
    </div>
  );
}
