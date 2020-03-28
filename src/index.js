import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {ApolloProvider} from '@apollo/react-hooks';
import client from './apollo';



ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);


// 마무리 - #2.3 Conclusions