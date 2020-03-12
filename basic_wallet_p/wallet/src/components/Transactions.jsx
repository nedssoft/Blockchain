import React from 'react'



export default function Transactions(props) {
    return (
        <div className="transactions">
            <h4> Transactions</h4>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Recipient</th>
                    <th>Sender</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                    {props.transactions.map((tx, idx) => (
                        <tr key={idx}>
                            <td>{idx +1}</td>
                            <td>{tx.recipient}</td>
                            <td>{tx.sender == '0' && props.userId == tx.recipient.trim() ? tx.recipient : tx.sender }</td>
                            <td>{tx.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}