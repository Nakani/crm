import React from 'react';
import Header from '../components/header';
import Table from '../components/table';

export default class HomeContainer extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Table />
      </div>
    );
  }
}
