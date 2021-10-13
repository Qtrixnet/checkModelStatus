import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'
import { useEffect, useState } from "react";

export default function ToastMessage() {

  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 10000)
  }, []);

  return (
    <ToastContainer className="p-5" position="bottom-end">
      <Toast onClose={() => setShow(false)} bg="success" animation autohide="true" show={show}>
        <Toast.Header className="bg-success text-light">
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">Напоминание</strong>
          <small>Google sheet</small>
        </Toast.Header>
        <Toast.Body className="text-light bg-dark">Модели с некорректной информацией можно увидеть в разделе "статистика"</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}