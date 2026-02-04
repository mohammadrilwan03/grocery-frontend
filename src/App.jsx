import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignInModal from './components/SignInModal';
import CartModal from './components/CartModal';
import OrderHistoryModal from './components/OrderHistoryModal';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ScrollToTop from './components/ScrollToTop';
import { Toaster, toast } from 'sonner';

function App() {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('freshUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success(`${product.name} added to cart!`, {
      style: {
        borderRadius: '16px',
        padding: '16px',
        background: '#fff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
      }
    });
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => setCart([]);

  const handleLogout = () => {
    localStorage.removeItem('freshToken');
    localStorage.removeItem('freshUser');
    setUser(null);
    toast.info('Logged out successfully');
  };

  return (
    <Router>
      <ScrollToTop />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <Toaster position="top-center" richColors />

        <Navbar
          cartCount={cart.length}
          onSearch={setSearchQuery}
          onSignInClick={() => setIsSignInOpen(true)}
          onCartClick={() => setIsCartOpen(true)}
          onOrdersClick={() => setIsHistoryOpen(true)}
          user={user}
          onLogout={handleLogout}
        />

        <OrderHistoryModal
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          userId={user ? user.id : null}
        />

        <SignInModal
          isOpen={isSignInOpen}
          onClose={() => setIsSignInOpen(false)}
          onAuthSuccess={(userData) => setUser(userData)}
        />

        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cart}
          onRemove={removeFromCart}
          user={user}
          clearCart={clearCart}
        />

        <Routes>
          <Route
            path="/"
            element={<HomePage addToCart={addToCart} searchQuery={searchQuery} />}
          />
          <Route
            path="/product/:id"
            element={<ProductPage addToCart={addToCart} />}
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
