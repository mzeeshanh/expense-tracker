import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
				<Table responsive bordered className="mb-5">
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
			<Container>
				<Row>
					<Col>
						<h2>Project Description</h2>
						<p>The <strong>Expense Tracker</strong> App is a React-based application designed to help users efficiently manage their finances by tracking their expenses and income. The application allows users to input financial transactions, categorize them as either Expense or Income, and maintain an up-to-date net balance reflecting their financial status.</p>
						<h2>Key Features</h2>
						<ul>
							<li><strong>Transaction Input</strong>: Users can add transactions by entering an amount, description, and selecting whether the transaction is an Expense or Income. The app automatically updates the net balance based on the transaction type.</li>
							<li><strong>Net Balance Calculation</strong>: The app keeps track of the user's total balance by adding income transactions and subtracting expense transactions, providing real-time updates on the user's financial status.</li>
							<li><strong>Transaction Listing</strong>: All recorded transactions are displayed in a comprehensive list, showing details like the amount, description, and type (Expense/Income). This allows users to get a quick overview of their financial history.</li>
							<li><strong>Search Functionality</strong>: The app includes a search bar that enables users to filter and search through the list of transactions by description, amount, or type, making it easier to find specific records.</li>
							<li><strong>State Management with Redux</strong>: The application leverages Redux for state management to ensure smooth data flow and maintain consistent updates to the transaction records, balance, and search functionality across the app.</li>
						</ul>
						<h2>Technology Stack</h2>
						<ul>
							<li><strong>Frontend</strong>: React.js</li>
							<li><strong>User Interface</strong>:The user interface is crafted using HTML5 and CSS3, ensuring a responsive design that adapts well across different devices.</li>
							<li><strong>State Management</strong>: Redux</li>
						</ul>
						<h2>Future Enhancements</h2>
						<ul>
							<li><strong>Expense Categorization</strong>: Allow users to categorize their expenses (e.g., Food, Entertainment, Transportation, etc.) to give them deeper insights into their spending patterns.</li>
							<li><strong>Data Visualization</strong>: Implement graphical representations such as pie charts and bar charts to visualize income vs. expense trends over time.</li>
							<li><strong>Recurring Transactions</strong>: Add support for recurring transactions (e.g., monthly bills) to automatically add them to the balance.</li>
							<li><strong>Data Persistence</strong>: Enable data storage with APIs or local storage, so users can access their transaction history across sessions or devices.</li>
							<li><strong>User Authentication</strong>: Introduce user authentication so that multiple users can have their personalized financial tracking.</li>
							<li><strong>Export/Import Feature</strong>: Add the ability to export transaction data to CSV or other file formats and import data from other sources.</li>
						</ul>
						<h2>GitHub Repository:</h2>
						<p>You can view and contribute to the project on GitHub at the following link: <a href="https://github.com/mzeeshanh/expense-tracker" target="_blank">Expense Tracker App - GitHub Repository</a></p>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default Home