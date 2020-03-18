import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Transactions from './components/Transactions'

const API_URL = 'http://localhost:5000'
function App() {

const [chain, setChain] = useState([])
const [userId, setUserId] = useState('')
const [userBalance, setBalance] = useState(0)
const [userTxs, setUserTxs] = useState([])
const [showBalance, setShowBalance] = useState(false)
const [showTx, setShowTx] = useState(false)

useEffect(() => {
  fetchChain()
}, [])
const fetchChain = async() => {
  const { data: {chain}} = await axios.get(`${API_URL}/chain`)
  setChain(chain)
}

const handleChange = ({ target: { value }}) => {
  setUserId(value)
}

const handleShowBalance = (e) => {
  e.preventDefault()
  let balance = 0
  chain.forEach(ch => {
    const transactions = ch.transactions
    if (transactions.length) {
      transactions.forEach(tx => {
        console.log(tx.recipient)
        if (tx.recipient.trim() === userId.trim()) {
          balance += Number(tx.amount)
        }
        if (tx.sender.trim() === userId.trim()) {
          balance -= Number(tx.amount)
        }
      })
    }
  })
  setBalance(balance)
  setShowBalance(true)
}

const showTransactions = (e) => {
  e.preventDefault()
  const txs = []
  chain.forEach(ch => {
    const transactions = ch.transactions
    if (transactions.length) {
      transactions.forEach(tx => {
        if (tx.recipient.trim() === userId || tx.sender.trim() === userId ) {
          txs.push(tx)
        }
      })
    }
  })
  setUserTxs(txs)
  setShowTx(true)
}
  return (
    <div className="App">
      <header className="App-header">
        Wallet
      </header>
      <div className="box">
        <form>
          <input name="userId" onChange={handleChange} placeholder="Enter Your ID"/>
          { showBalance && <p><strong>Balance: </strong>{userBalance}</p>}
          <div className="btn-grp">
            <button onClick={handleShowBalance}>View Balance</button>
            <button onClick={showTransactions}>View Transactions</button>
          </div>
        </form>
        {showTx && <Transactions transactions={userTxs} userId={userId}/>}
      </div>
    </div>
  );
}

export default App;
