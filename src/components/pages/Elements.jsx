import React, { Component } from 'react';
import {Row, Col, Button} from 'react-bootstrap'
import ModalWindow from '../ModalWindow'
import TableWithPagination from '../TableWithPagination'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class Elements extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isShowModal: false,
      startDate: moment() 
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  showModal = () => this.setState({isShowModal: true});
  closeModal = () => this.setState({isShowModal: false});
  saveChanges = () => {
    alert('Save changes');
  };

  render() {
    return (
      <div>
      Elements (Bootstrap grid)
        <Row>
          <Col md={5} lg={5}>
            <TableWithPagination />
          </Col>
          <Col md={3} lg={3}>
            <DatePicker
                className="form-control"
                selected={this.state.startDate}
                onChange={this.handleChange}
            />
          </Col>
          <Col md={4} lg={4}>
          </Col>
        </Row>
        <Row>
          <Col sm={4} md={4} lg={4} lgOffset={4} mdOffset={4} smOffset={4}>
            <Button onClick={this.showModal}>Show modal</Button>
            {this.state.isShowModal && <ModalWindow closeModal={this.closeModal} save={this.saveChanges} />}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Elements;
