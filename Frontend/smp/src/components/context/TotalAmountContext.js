import React, { useState, useContext,createContext } from "react";

const TotalAmountContext = createContext(null);

export const TotalAmountProvider = (props) => {
    console.log(props);
  const [totalAmount, setTotalAmount] = useState(0);

  const getTotalAmount = () => {
    return totalAmount;
  };

  const updateTotalAmount = (amount) => {
    setTotalAmount(amount);
  };

  return (
    <TotalAmountContext.Provider value={[getTotalAmount, updateTotalAmount]}>
      {() => {
        if (getTotalAmount) {
          return <h2>Total Amount: {getTotalAmount}</h2>;
        } else {
          return <h2>Loading...</h2>;
        }
      }}
    </TotalAmountContext.Provider>
  );
};

export const useTotalAmount = () => {
  const { getTotalAmount } = useContext(TotalAmountContext);

  return {
    getTotalAmount,
  };
};
