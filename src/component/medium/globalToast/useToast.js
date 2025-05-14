import { useState, useEffect } from "react";

export const useToast = () => {
  const [horizontalPosition, setHorizontalPosition] = useState("left");
  const [verticalPosition, setVerticalPosition] = useState("top");
  const [type, setType] = useState("normal");
  const [duration, setDuration] = useState(5);
  const [message, setMessage] = useState("This is toast message!");
  const [toastMessage, setToastMessage] = useState([]);

  const timerIds = [];
  useEffect(() => {
    return () => {
      timerIds.forEach((timerId) => clearInterval(timerId));
    };
  }, []);
  const showToast = () => {
    const newToast = {
      id: Date.now(),
      message,
      type,
    };
    setToastMessage((prevMessage) => [...prevMessage, newToast]);
    const timerId = setTimeout(() => {
      setToastMessage((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== newToast.id)
      );
    }, duration * 1000);
    timerIds.push(timerId);
  };
  const removeToast = (id) => {
    setToastMessage((prevMsg) => prevMsg.filter((msg) => msg.id !== id));
  };
  return {
    horizontalPosition,
    verticalPosition,
    setHorizontalPosition,
    setVerticalPosition,
    type,
    setType,
    duration,
    setDuration,
    message,
    setMessage,
    toastMessage,
    showToast,
    removeToast,
  };
};
