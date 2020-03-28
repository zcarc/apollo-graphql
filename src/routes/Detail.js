import React from 'react';
import {useParams} from 'react-router-dom';
import {gql} from 'apollo-boost';
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

// gql의 getMovie() 라는 이름은 graphql 서버와는 관련이 없고
// 아무렇게나 이름을 지어도 동작하는데는 이상이 없다.
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      language
      rating
      description_intro
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;


export default () => {

    const {id} = useParams();

    const { loading, data } = useQuery(GET_MOVIE, {
        variables: {id: parseInt(id)}
    });

    console.log(loading, data);

    return (
      <Container>
        <Column>
          <Title>
            {loading ? "loading..." : data?.movie?.title}
          </Title>
          {!loading && (
            <>
              <Subtitle>
                {data?.movie?.language} · {data?.movie?.rating}
              </Subtitle>
              <Description>{data?.movie?.description_intro}</Description>
            </>
          )}
        </Column>
        <Poster
          bg={`https://yst.am/${data?.movie?.medium_cover_image}`}
        />
      </Container>
    );
};
