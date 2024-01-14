import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import gql from 'graphql-tag';
import LineChart from './LineChart';

const REV_QUERY = gql`
  query {
    revenue {
      quarter
      total_revenues
    }
  }
`;

const Revenue = ({ loading, error, data }) => {
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('GraphQL Error:', error);
    return <p>Error: {error.message}</p>;
  }

  // Check if data and data.revenue are defined
  if (!data || !data.revenue) {
    return <p>No revenue data available.</p>;
  }
  console.log(data.revenue);
  console.log(data);
  return (
    <div>
      <h2>Revenue List</h2>
      {/* <ul>
        {data.revenue.map(rev => (
          <li key={rev.quarter}>
          {rev.quarter}: {rev.total_revenues}
        </li>
        ))}
      </ul> */}
        {/* Pass revenue data to LineChart component */}
      
      <LineChart data={data.revenue} />
      
    </div>
  );
}


export default graphql(REV_QUERY)(Revenue);
