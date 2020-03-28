import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  // 서버가 다운된 상태이므로 로컬로 서버를 돌림
  // uri: 'https://movieql.now.sh'
  uri: "http://localhost:4000",


  //백엔드의 resolvers 처럼 같은 역할
  // Movie 처럼 저 자리에 올 수 있는 이름은 graphql 서버에 있는 schema의 type 이름과 똑같은 것에 추가해야 isLiked가 추가된다.
  // 그러면 Movie가 호출될 때 isLiked라는 프로퍼티가 추가된다.
  resolvers: {
    Movie: {
      isLiked: () => false
    },

    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        cache.writeData({
          id: `Movie:${id}`,
          data: {
            isLiked: !isLiked
          }
        });
      }
    }
  }
});

export default client;