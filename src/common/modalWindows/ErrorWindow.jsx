import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';

export class ErrorWindow extends Component {
    
    constructor(props){
        super(props);
        this.state = {showModal: true};
    }

    close = () => {
        this.setState({ showModal: false });
        if (this.props.closeModal) {
            this.props.closeModal();
        }
    };

  render() {
    return (
        <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
                <Modal.Title>Something went wrong!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Please, try one more time or contact our support by email support@rentalfriend.co</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
  }
}