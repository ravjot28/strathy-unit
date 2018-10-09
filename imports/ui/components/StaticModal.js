
import React from 'react';
import { Button,Modal } from 'react-bootstrap';

class StaticModal extends React.Component{
  constructor(props, context) {
    super(props, context);
  }
    render(){
        return  <div className="static-modal">
        <Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
      
          <Modal.Body>
            <h4>{this.props.subheading}</h4>
            {this.props.body}
          </Modal.Body>
      
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>;
    }
}

export default StaticModal;