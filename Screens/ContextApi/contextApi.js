import React, {useState, createContext} from 'react';

const CartContext = createContext();

export function CartProvider({children}) {
  const [userdetails, setuserdetails] = useState([]);
  const [socket, setsocket] = useState({});
  const [token, setToken] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userSecret, setUserSecret] = useState({});
  const [onlineMechanic, setOnlineMechanic] = useState([]);

  return (
    <CartContext.Provider
      value={{
        token,
        setToken,
        socket,
        onlineUsers,
        setOnlineUsers,
        setsocket,
        userdetails,
        setuserdetails,
        userSecret,
        setUserSecret,
        onlineMechanic,
        setOnlineMechanic,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
