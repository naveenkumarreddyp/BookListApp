import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddBook from './components/AddBook'
import BookList from './components/BookList'
import Login from './components/Login'
import Navbar from './components/Navbar'
import PrivateComponent from './components/PrivateComponent'
import Register from './components/Register'
import UpdateComponent from './components/UpdateComponent'
import GetBookDetail from './components/GetBookDetail'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<BookList />} />
            <Route path='/add' element={<AddBook />} />
            <Route path='/update/:id' element={<UpdateComponent />} />
            <Route path='/getbook/:id' element={<GetBookDetail />} />
            <Route path='/logout' element={<h1>Logout </h1>} />
          </Route>

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
