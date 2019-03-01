import React, { Component } from 'react';
import {Pagination, Table} from 'react-bootstrap';

const tableMocks = [
    {id: 1, name: 'Test1'},
    {id: 2, name: 'Test2'},
    {id: 3, name: 'Test3'},
    {id: 4, name: 'Test4'},
    {id: 5, name: 'Test5'},
    {id: 6, name: 'Test6'},
    {id: 7, name: 'Test7'},
    {id: 8, name: 'Test8'},
    {id: 9, name: 'Test9'},
    {id: 10, name: 'Test10'},
    {id: 11, name: 'Test11'},
    {id: 12, name: 'Test12'},
    {id: 13, name: 'Test13'},
    {id: 14, name: 'Test14'},
    {id: 15, name: 'Test15'},
    {id: 16, name: 'Test16'},
    {id: 17, name: 'Test17'},
    {id: 18, name: 'Test18'},
    {id: 19, name: 'Test19'},
    {id: 20, name: 'Test20'},
    {id: 21, name: 'Test21'},
];

class TableWithPagination extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            showModal: true,
            activePage: 1,
            itemsPerPage: 4,
            itemsCount: Math.ceil(tableMocks.length / 4)
        };
    }
    renderTable = () => {
        let start = (this.state.itemsPerPage * this.state.activePage) - this.state.itemsPerPage ;
        let count = this.state.itemsPerPage * this.state.activePage;
        return tableMocks
            .slice(start, count)
            .map((value) => (
            <tr key={value.id}>
                <td>{value.id}</td>
                <td>{value.name}</td>
            </tr>
        ))
    }

    handleSelect = (eventKey) => {
        this.setState({
          activePage: eventKey,
        });
    }

  render() {
    return (
        <div>
             <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTable()}
                </tbody>
            </Table>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={this.state.itemsCount}
          maxButtons={5}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
        </div>
      );
  }
}

  
export default TableWithPagination;
