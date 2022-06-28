import React from 'react';
import Balance from './components/Balance/Balance';
import Header from './components/Header/Header';
import IncomeExpenses from './components/IncomeExpenses/IncomeExpenses';
import { ContainerStyled } from './styles/Container.styled';
import { GlobalStyled } from './styles/Global.styled';

function App() {
  return (
    <>
      <GlobalStyled />
      <Header />
      <ContainerStyled>
        <Balance />
        <IncomeExpenses />
      </ContainerStyled>
    </>
  );
}

export default App;
