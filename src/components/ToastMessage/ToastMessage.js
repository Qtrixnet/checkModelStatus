import './ToastMessage.css'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'
import { useEffect, useState } from "react";

export default function ToastMessage({ title, subtitle, text }) {

  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 5000)
  }, []);

  return (
    <Toast className="toast" onClose={() => setShow(false)} bg="success" animation autohide="true" show={show}>
      <Toast.Header className="toast__header bg-success text-light">
        <img
          src="holder.js/20x20?text=%20"
          className="toast__image rounded me-2"
          alt=""
        />
        <strong className="toast__title me-auto">{title}</strong>
        <small className="toast__subtitle">{subtitle}</small>
      </Toast.Header>
      <Toast.Body className="toast__body text-light bg-dark">{text}</Toast.Body>
    </Toast>
  )
}