import React from 'react';
import { Modal } from "react-bootstrap";

const ModalDisplay = (props) => {
    const { title, click1, click2,btn, btn1, btn2, body, ...others } =props;
    return ( 
        <Modal {...others}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {body}
        </Modal.Body>
        <Modal.Footer>
          {btn1}
          {btn2}
          {/* <Button variant="secondary"  onClick={click1}>
            {btn1}
          </Button>
          <Button variant="primary" onClick={click2} {...others}>
            {btn2}
          </Button> */}
        </Modal.Footer>
      </Modal>
     );
}
 
export default ModalDisplay;