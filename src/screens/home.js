import React from 'react';
import Header from '../components/header';
import Table from '../components/table';
import Modal from '../components/modal';

export default class HomeContainer extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Modal />
        <Table />
      </div>
    );
  }
}
