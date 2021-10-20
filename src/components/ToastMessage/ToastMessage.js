import "./ToastMessage.scss";
import Toast from "react-bootstrap/Toast";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ToastMessage({
  title,
  subtitle,
  text,
  errorStatusColor = "warning",
}) {
  const [show, setShow] = useState(true);

  return (
    <Toast
      className="toast"
      onClose={() => setShow(false)}
      bg={errorStatusColor}
      animation
      autohide="true"
      show={show}
    >
      <Toast.Header
        className={`toast__header bg-${errorStatusColor} text-light`}
      >
        <img
          src={`https://avatars.dicebear.com/api/bottts/${Date.now()}.svg?mood[]=${
            errorStatusColor === "success" ? "happy" : "sad"
          }`}
          className="toast__image rounded me-2"
          alt="иконка робота"
          width="30"
          height="30"
        />
        <strong className="toast__title me-auto">{title}</strong>
        <small className="toast__subtitle">{subtitle}</small>
      </Toast.Header>
      <Toast.Body className="toast__body text-light bg-dark">
        {text}
        <Link className="toast__link" to="/statistics">
          Посмотреть
        </Link>
      </Toast.Body>
    </Toast>
  );
}
