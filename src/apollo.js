import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  // 서버가 다운된 상태이므로 로컬로 서버를 돌림
  // uri: 'https://movieql.now.sh'
  uri: "http://localhost:4000"
});

export default client;