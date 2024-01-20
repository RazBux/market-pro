import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import gql from 'graphql-tag';
import { onError } from "@apollo/client/link/error";
import Toolbar from "./components/ToolBar";
import GetQueryData from "./components/QueryData";


const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    console.log(graphqlErrors);
    graphqlErrors.map(({ message, location, path }) => {
      return alert(`Graphql error ${message}`);
    });
  }
});

const REV_QUERY = gql`
  query {
    getFreeStyleData (columnList: ["quarter,total_revenues,operating_expenses,total_gross_profit "]) {
      quarter
      total_revenues
      operating_expenses
      total_gross_profit
    }
  }
`;

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:8000/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Toolbar/>
      <h6> </h6>
      <GetQueryData query={REV_QUERY}/>
    </ApolloProvider>
  );
}

export default App;

