import React from 'react';
import {useParams} from 'react-router-dom';
import {gql} from 'apollo-boost';
import { useQuery } from "@apollo/react-hooks";

// gql의 getMovie() 라는 이름은 graphql 서버와는 관련이 없고
// 아무렇게나 이름을 지어도 동작하는데는 이상이 없다.
const GET_MOVIE = gql`

  query getMovie($id: Int!) {

    movie(id: $id) {
      id
      title
      medium_cover_image
    }

  }

`;


export default () => {

    const {id} = useParams();

    const { loading, data } = useQuery(GET_MOVIE, {
        variables: {id: parseInt(id)}
    });

    console.log(loading, data);

    if(loading) {
      return 'loading';
    }

    if(data && data.movie) {
      return data.movie.title;
    }

    return 'Detail';
};
