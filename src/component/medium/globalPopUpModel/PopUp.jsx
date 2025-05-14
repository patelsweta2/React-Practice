import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const PopUp = ({
  data,
  onClose,
  isModalOpen,
  hasCloseIcon = "true",
  closeOnOutsideClick = true,
  closeOnEscape = true,
  hasBackdrop = true,
}) => {
  const popUpRef = useRef < HTMLDialogElement > null;
  useEffect(() => {
    if (isModalOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isModalOpen]);
  return (
    <>
      {createPortal(
        <dialog
          ref={dialogRef}
          onClick={(event) => {
            if (closeOnOutsideClick && event.currentTarget === event.target) {
              onClose();
            }
          }}
          onClose={onClose}
          onKeyDown={(event) => {
            if (!closeOnEscape && event.key === "Escape") {
              event.preventDefault();
            }
          }}
          style={{
            border: "none",
            borderRadius: "10px",
            padding: 0,
            width: "90%",
            maxWidth: "500px",
            boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
            backgroundColor: "#fff",
            color: "#333",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: `translate(50%,50%) scale(${visible ? 1 : 0.95})`,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.3s ease,transform 0.3s ease",
            zIndex: 1000,
          }}
        >
          <section style={{ display: "flex", flexDirection: "column" }}>
            <header
              style={{
                padding: "1rem",
                backgroundColor: "#f2f2f2",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "1.2rem" }}>{data.title}</h2>
              {hasCloseIcon && (
                <button
                  onClick={onClose}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    color: "#666",
                  }}
                >
                  &#x2715;
                </button>
              )}
            </header>
            <div
              style={{
                padding: "1rem",
                display: "flex",
                justifyContent: "flex-end",
                borderTop: "1px solid #ddd",
              }}
            >
              <button
                autoFocus
                onClick={() => dialogRef.current?.close()}
                style={{
                  backgroundColor: "#007bff",
                  border: "none",
                  borderRadius: "4px",
                  color: "white",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                Close
              </button>
            </div>
          </section>
          {hasBackdrop && (
            <style>
              {`
                dialog::backdrop {
                  background: rgba(0, 0, 0, 0.5);
                }
              `}
            </style>
          )}
        </dialog>
      )}
    </>
  );
};

export default PopUp;
