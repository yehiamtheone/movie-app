import { useContext, useEffect, useRef } from "react";
import moviesApi from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import React from "react";
import { useAuth } from "../../auth/AuthContext";
import { useAlert } from "../../alertContext/AlertContext";
import GlobalAlert from "../alert/AlertBootstrap";
import { useMutation } from "@tanstack/react-query";

const Reviews = ({getMovieData, movie, reviews ,setReviews}) => {
    const refText = useRef();
    const { showAlert } = useAlert();
    const { token } = useAuth();
    

    const { movieId } = useParams();
    useEffect(()=>{
       getMovieData(movieId); 
    },[]);
    const mutation = useMutation({
      mutationFn: () => reviewEndpointCall(),
      onSuccess: (data)=>{
        const ref = refText.current;
        const updatedReviews = [...reviews, {reviewBody: ref.value}];
        console.log(updatedReviews);
        ref.value = "";
        showAlert("Review Created Successfully");
        setReviews(updatedReviews);
      },
      onError: (error) => {
      // 4. On error, show an alert
      showAlert(`Must login to create review error code: ${error.message}` , "danger");
    }

    });
    const reviewEndpointCall = async ()=>{
      const ref = refText.current;

      const response = await moviesApi.post('/reviews', {reviewBody: ref.value, imdbId: movieId},
          {
            headers: {
              "Authorization": `Bearer ${token}` 
            }
          }
        );
      return response.data;
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = reviewEndpointCall();
      mutation.mutate(data);
  };

    
  return (
    <Container>
      <Row>
        <Col><h3>Reviews</h3></Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
            {
              <>
                <Row>
                  <Col>
                  {<GlobalAlert/>}
                    <ReviewForm handleSubmit={handleSubmit} refText={refText} labelText="Write a Review?" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </>
            }
            {
              reviews?.map((r, index)=>{
                console.log(r);
                
                return (
                <React.Fragment key={index}> 
                  <Row>
                    <Col>{
                    r.reviewBody                   
                    }</Col>
                  </Row>
                  <Row>
                    <Col>
                      <hr />
                    </Col>
                  </Row>
                </React.Fragment>
              );
              })
            }
        </Col>
      </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
    </Container>
  )
}

export default Reviews;