import { Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import './Hero.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'; 
import GlobalAlert from '../alert/AlertBootstrap';
import { useAlert } from '../../alertContext/AlertContext';
import { useQuery } from '@tanstack/react-query';
import moviesApi from '../../api/axiosConfig';
const Hero = () => {
  const navigate = useNavigate();
  const { hideAlert } = useAlert();
  const { isPending, error, data: movies } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const response = await moviesApi.get("/movies");
      return response.data;
  }
  });
  function reviews(movieId) {
    hideAlert();
    navigate(`/Reviews/${movieId}`)
  }
  console.log(isPending);
  console.log(error);
  if (isPending) {
    return (
      <h1>loading....</h1>
    )
    
  }
  if (error) {
    return (
      <h1>Error connecting to the server</h1>
    )
    
  }
  
  
  return (
    <div className='movie-carousel-container'>
      {<GlobalAlert/>}
      <Carousel>
        {
          movies.map((movie)=>{
            return (
              <Paper>
                <div className='movie-card-container'>
                <div className='movie-card' style={{"--img": `url(${movie.backdrops[0]})`}}>
                  <div className='movie-detail'>
                    <div className='movie-poster'>
                      <img src={movie.poster}></img>
                    </div>
                    <div className='movie-title'>
                      <h4>{movie.title}</h4>
                    </div>
                    <div className="movie-buttons-container">
                    <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                              <div className="play-button-icon-container">
                                  <FontAwesomeIcon className="play-button-icon"
                                      icon = {faCirclePlay}
                                  />
                              </div>
                          </Link>
                          <div className='movie-review-button-container'>
                            <Button variant="info" onClick={()=> reviews(movie.imdbId)}>Reviews</Button>
                          </div>
                    </div>
                  </div>
                </div>
                  
              </div>
              </Paper>
            )
          })
        }
      </Carousel>
    </div>
  )
}

export default Hero;