import React from "react";
import { IncomeStyled } from "./IncomeExpenses.styled";

const IncomeExpenses: React.FC = () => {
  return (
    <IncomeStyled>
      <div>
        <h4>Income</h4>
        <p className="money plus">+$0.00</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">-$0.00</p>
      </div>
    </IncomeStyled>
  );
};

export default IncomeExpenses;
