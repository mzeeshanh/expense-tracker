import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { decrementByValue, incrementByValue, transactionHistory } from "../../feature/transactions/transactions.slice"
import { Formik,Form,  ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
function AddTransaction() {
	const dispatch = useDispatch()
	const navigate = useNavigate();

	const validationSchema = Yup.object({
		description: Yup.string()
			.required('Description is required'),
		amount: Yup.number()
			.required('Amount is required'),
		transactionType: Yup.string()
			.oneOf(['expense', 'income'], 'Please select a transaction type')
			.required('Transaction type is required'),
	});

	const handleSubmit = (values, {setSubmitting}) => {
		const timestamp = new Date();
		const day = String(timestamp.getDate()).padStart(2, '0'); // Ensure 2 digits
		const month = String(timestamp.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
		const year = timestamp.getFullYear();
		const formattedTimestamp = `${day}-${month}-${year}`;

		console.log("timestamp",timestamp)
		if (values.transactionType === "expense") {
		dispatch(decrementByValue(values.amount));
		} else if (values.transactionType === "income") {
		dispatch(incrementByValue(values.amount));
		}
		if(timestamp){
			values.date = formattedTimestamp
			dispatch(transactionHistory(values))
		}
		
		console.log("the values to be submitted",values)
		navigate('/')
		setSubmitting(false);
	};
	return (
		<section className="pt-5">
			<Container>
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h3 className="mb-0">Add Transaction</h3>
				</div>
				<Row className="justify-content-center">
					<Col md={6}>
						<Card>
							<Card.Body>
								<Formik
									initialValues={{
										description: '',
										amount: 0,
										transactionType: '',
									}}
									validationSchema={validationSchema}
									onSubmit={handleSubmit}
									>
									{({ isSubmitting, values, handleChange, }) => (
										<Form>
											<div className="form-group mb-3">
												<label className="mb-1">Transaction Description</label>
												<textarea rows={5} cols={5} className="form-control" name="description" onChange={handleChange} value={values.description}></textarea>
												<ErrorMessage name="description" component="div" className="text-danger" />
											</div>
											<div className="form-group mb-3">
												<label className="mb-1">Transaction Amount</label>
												<input type="number" name="amount" className="form-control" onChange={handleChange} value={values.amount} />
												<ErrorMessage name="amount" component="div" className="text-danger"  />
											</div>
											<div className="form-group mb-3">
												<label className="mb-1">Transaction Type</label>
												<div className="d-flex align-items-center">
													<div className="radio-holder me-3">
														<input type="radio" className="me-2" id="expense" name="transactionType" value="expense" onChange={handleChange} />
														<label htmlFor="expense">Expense</label>
													</div>
													<div className="radio-holder me-3">
														<input type="radio" className="me-2" id="income" name="transactionType" value="income" onChange={handleChange} />
														<label htmlFor="income">Income</label>
													</div>
												</div>
											</div>
											<div className="d-flex justify-content-end">
												<button className="btn btn-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Add Transaction'}</button>
											</div>
										</Form>
									)}
								</Formik>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default AddTransaction