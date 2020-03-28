import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

// @client를 붙이지 않으면 백엔드로 쿼리가 전송된다.
const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  height: 400px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
  border-radius: 7px;
`;

const Poster = styled.div`
  background-image: url(${props => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

export default ({ id, bg, isLiked }) => {

  const [toggleMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: parseInt(id), isLiked }
  });

  // console.log("const [likeMovie]:", likeMovie);

  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={`https://yst.am${bg}`} />
      </Link>
      <button onClick={toggleMovie}>{isLiked ? "Unlike" : "Like"}</button>
    </Container>
  );
};