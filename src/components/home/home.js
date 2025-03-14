import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Home() {
	const [transactionsList, setTransactionsList] = useState()
	const {transactions} = useSelector(state => state.transactions)
	const searchedQuery = useSelector(state => state.transactions.searchQuery)
	useEffect(()=>{
		if (searchedQuery){
			const filteredTransactions = transactions.filter(item=> item.description.toLowerCase().includes(searchedQuery.toLowerCase()) || item.transactionType.toLowerCase().includes(searchedQuery))
			setTransactionsList(filteredTransactions)
		}
		else{
			setTransactionsList(transactions)
		}
	},[searchedQuery, transactions])
	console.log("transactionList",transactionsList)
	return (
		<section className="pt-5">
			<Container>
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h3 className="mb-0">Transactions</h3>
					<Link className="btn btn-primary" to="/add-transaction">Add Transaction</Link>
				</div>
				{searchedQuery && <h2>Search Query: {searchedQuery}</h2> }
				<Table responsive bordered>
					<thead>
                        <tr>
							<th>Sr #</th>
						    <th>Date</th>
                            <th>Description</th>
							<th>Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
						{(transactionsList?.length !== 0)?
							transactionsList?.map((transaction,index)=>(
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{transaction.date}</td>
									<td>{transaction.description}</td>
									<td>
										<Badge className="text-capitalize" bg={`${transaction.transactionType === "expense" ? "danger" : "success"}`}>{transaction.transactionType}</Badge>
									</td>
									<td>{transaction.amount}</td>
								</tr>
							))
							
						:
							<tr>
								<td colSpan={5}>
									<Alert className="d-flex justify-content-center align-items-center mb-0" variant={"warning"}>No Transaction yet</Alert>
								</td>
							</tr>
						}
					</tbody>
				</Table>
			</Container>
		</section>
	)
}

export default Home