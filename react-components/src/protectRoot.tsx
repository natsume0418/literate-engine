import React, { useEffect, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from './redux/CertificationSlice';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false && window.performance.navigation.type !== 1) {
      navigate('/NotFound');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;




