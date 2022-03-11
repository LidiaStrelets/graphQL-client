import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import{ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client'
import {onError} from '@apollo/client/link/error'


const errorLink=onError(({graphqlErrors, networkErrors})=>{
  if(graphqlErrors){
    graphqlErrors.forEach(({message})=>alert(`Error occured: ${message}`))
  }
  if(networkErrors){
    networkErrors.forEach(({message})=>alert(`Error occured: ${message}`))
  }
})

const link = from([
  errorLink, 
  new HttpLink({uri:'http://localhost:5000/graphQL '})
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}><App /></ApolloProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

