import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Home from './components/home/home';
import AddTransaction from './components/addTransaction/addTransaction';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/add-transaction" element={<AddTransaction />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;