/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext, useEffect } from 'react';

// Initial State
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  conversationData: null,
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        conversationData: null,
      };
    default:
      return state;
  }
};

// Create Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);


  // Load from sessionStorage when the app starts
  useEffect(() => {
    const savedAuth = JSON.parse(sessionStorage.getItem('auth'));
    if (savedAuth) {
      dispatch({
        type: 'LOGIN',
        payload: savedAuth,
      });
    }
  }, []);

  const login = (user, token) => {
    const authData = { user, token };
    sessionStorage.setItem('auth', JSON.stringify(authData)); // Save to sessionStorage
    dispatch({
      type: 'LOGIN',
      payload: authData,
    });
  };

  
    // Logout action
    const logout = () => {
        sessionStorage.removeItem('auth'); // Remove from sessionStorage
        dispatch({ type: 'LOGOUT' });
        sessionStorage.removeItem('conversationData');
        sessionStorage.removeItem('conversationId');
        sessionStorage.removeItem('lastVisitedRoute')
      };
    
  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
