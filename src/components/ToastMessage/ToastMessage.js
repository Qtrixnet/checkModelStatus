import './ToastMessage.css'
import Toast from 'react-bootstrap/Toast';
import { useState } from "react";

export default function ToastMessage({ title, subtitle, text, errorStatus = 'warning'}) {

  const [show, setShow] = useState(true);

  return (
    <Toast className="toast" onClose={() => setShow(false)} bg={errorStatus} animation autohide="true" show={show}>
      <Toast.Header className={`toast__header bg-${errorStatus} text-light`}>
        <img
          src={`https://avatars.dicebear.com/api/bottts/${Date.now()}.svg?mood[]=${errorStatus === 'success' ? 'happy' : 'sad'}`}
          className="toast__image rounded me-2"
          alt=""
          width="30"
          height="30"
        />
        <strong className="toast__title me-auto">{title}</strong>
        <small className="toast__subtitle">{subtitle}</small>
      </Toast.Header>
      <Toast.Body className="toast__body text-light bg-dark">{text}</Toast.Body>
    </Toast>
  )
}

