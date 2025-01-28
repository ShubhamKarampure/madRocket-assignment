import { useEffect } from 'react';
import { useAuth } from 'src/context/authContext'; 
import { useNavigate } from 'react-router-dom';

const LogoutUser = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logOut(); 
        navigate('/sign-in'); 
      } catch (error) {
        console.error('Error during logout:', error.message);
      }
    };

    handleLogout();
  }, [logOut, navigate]);

  return null; 
};

export default LogoutUser;
