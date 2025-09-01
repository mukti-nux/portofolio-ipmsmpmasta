import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth/login', { replace: true });
      } else {
        setChecking(false);
      }
    };
    checkUser();
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  return children;
};

export default RequireAuth;