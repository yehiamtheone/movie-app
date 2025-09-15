import {useState, useEffect} from 'react';
import './App.css';
import moviesApi from './api/axiosConfig';
import Layout from './components/Layout';
import Home from './components/home/Home';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
import LoginForm from './components/login/LoginForm';
import SignupForm from './components/signUp/SignupForm';
import Profile from './components/profile/Profile';
function App() {
  
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);
 

  
  const getMovies = async() =>{
    try {
      const response = await moviesApi.get("/movies");
      
      setMovies(response.data);
  
      
    } catch (error) {
      console.log(error);
      
    }
  }
   const getMovieData = async (movieId) => {
     
    try 
    {
        const response = await moviesApi.get(`/movies/${movieId}`);

        const singleMovie = response.data;

        setMovie(singleMovie);
        
        setReviews(singleMovie.reviewIds);

        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }
  
  useEffect(()=>{
    getMovies();
  },[])
  return (
    
      
    <div className="App">
      <Header/>
      <Routes>
        {/* Parent route that provides the Layout for its children */}
        <Route path="/" element={<Layout />}>
          {/* Use 'index' instead of path='/' for the default child */}
          <Route index element={<Home movies={movies} />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/profile' element={<Profile />} />
          
          {/* These child routes will render inside the Layout's Outlet */}
          
          <Route path="Trailer/:ytTrailerId" element={<Trailer />} />
          <Route
            path="Reviews/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          />
        </Route>
        {/* The 404 route must be OUTSIDE and LAST to catch all unmatched paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
      
  );
}

export default App;
