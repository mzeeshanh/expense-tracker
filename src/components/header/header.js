import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { searchTransaction } from '../../feature/transactions/transactions.slice'

function Header() {
	const {pathname} = useLocation();
	const dispatch = useDispatch()
	const amount = useSelector(state=> state.transactions.balance)
	const handleChange = (e) => {
		dispatch(searchTransaction(e.target.value))
    }
	return (
		<header id="header">
			<Container>
				<Row className="align-items-center">
					<Col md={6}>
						<Navbar expand="lg">
							<Link to="/" className="narbar-brand me-3">Expense Tracker</Link>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<ul className="navbar mb-0 list-unstyled d-flex">
									<li className={`nav-item ${pathname === "/add-transaction" && "active"}`}>
										<Link to="/add-transaction" className="nav-link">Add Transaction</Link>
									</li>
								</ul>
							</Navbar.Collapse>
						</Navbar>
					</Col>
					<Col md={6}>
						<div className="d-flex align-items-center justify-content-end">
							<div className="search-form-holder me-2">
								<input className="form-control" type="search" placeholder='Type here to search' onChange={handleChange} />
							</div>
							<div className="total-expense d-flex justify-content-end">
								<strong className="me-2">Balance:</strong>
								<span>${amount}</span>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</header>
	)
}

export default Header