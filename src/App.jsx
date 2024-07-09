import React, { useState } from 'react';
import Card from './Card';
import './index.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [values, setValues] = useState({ BTC: '', ETH: '', LTC: '' });

  const coins = [
    { crypto: 'BTC', amount: 25000 },
    { crypto: 'ETH', amount: 0.75 },
    { crypto: 'LTC', amount: 1.5 },
  ];

  const handler = (crypto) => {
    const value = Number(values[crypto]);
    if (value > 0) {
      const coin = coins.find((coin) => coin.crypto === crypto);
      const ExistTxn = transactions.findIndex((t) => t.crypto === crypto);
      if (ExistTxn >= 0) {
        const updatedTransactions = transactions.map((transaction, index) => {
          if (index === ExistTxn) {
            return {
              ...transaction,
              quantity: transaction.quantity + value,
              amount: transaction.amount + (coin.amount * value),
            };
          }
          return transaction;
        });
        setTransactions(updatedTransactions);
      } else {
        const newTransaction = {
          crypto: coin.crypto,
          quantity: value,
          amount: coin.amount * value,
        };
        setTransactions([...transactions, newTransaction]);
      }
      setValues({ ...values, [crypto]: '' });
    }
  };

  const total = transactions.reduce((result, transaction) => result + transaction.amount, 0);

  return (
    <>
      <div style={{display:'flex', gap:'50px', margin:'50px',}}>
        {coins.map((coin) => (
          <Card
            key={coin.crypto}
            value={values[coin.crypto]}
            onChange={(e) => setValues({ ...values, [coin.crypto]: e.target.value })}
            crypto={coin.crypto}
            amount={coin.amount}
            handler={() => handler(coin.crypto)}
          />
        ))}
      </div>
      <div className='transactions-list'>
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody style={{width:'100%', alignItems:'center', alignContent:'center'}}>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.crypto}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='total'>
        <p>Total: {total}</p>
      </div>
    </>
  );
}

export default App;
