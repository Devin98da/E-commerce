import './App.css';
import ProductItem from './components/ProductItem';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Regiser from './pages/Regiser';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Success from './pages/Success';
import { useSelector } from 'react-redux';
import Search from './pages/Search';
import ScrollTop from './ScrollTop';
import ProductPromotions from './pages/ProductPromotions';
import Wishlist from './pages/Wishlist';

function App() {
  const user = useSelector(state => state.user.currentUser);

  return (
    <Router>
      <ScrollTop />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/products/search' element={<Search />} />
        <Route path='/products/promotions' element={<ProductList />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/products/category/:category' element={<ProductList />} />
        <Route path='/products/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/success' element={<Success />} />
        <Route path='/register' element={user ? <Navigate to="/" /> : <Regiser />} />
        <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;