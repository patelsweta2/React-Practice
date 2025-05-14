import React, { useState } from "react";
import PopUp from "./PopUp";
const data = {
  title: "Modal heading",
  content: (
    <div style={{ padding: "1rem 0" }}>
      This is modal content. This si popup modal, you can adjust this in any
      way.
      <br />
      you can also close this modal by clicking cancel button or outside the
      modal.
    </div>
  ),
};

const PopUpHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closeOnOutsideClick, setCloseOnOutsideClick] = useState(true);
  const [closeOnEscape, setCloseOnEscape] = useState(true);
  const [hasCloseIcon, setHasCloseIcon] = useState(true);
  const [hasBackdrop, setHasBackDrop] = useState(true);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          margin: "3rem 0",
        }}
      >
        <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
            <label htmlFor="closeOnOutsideClick">Close modal on outside click</label>
            <input type="checkbox" id="closeOnOutsideClick" checked={closeOnOutsideClick} onChange={() => setCloseOnOutsideClick(!closeOnOutsideClick)}/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
            <label htmlFor="closeOnEscape">Close modal on outside click</label>
            <input type="checkbox" id="closeOnEscape" checked={closeOnEscape} onChange={() => setCloseOnEscape(!closeOnEscape)}/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
            <label htmlFor="hasCloseButton">Close modal on outside click</label>
            <input type="checkbox" id="hasCloseButton" checked={hasCloseIcon} onChange={() => setHasCloseIcon(!hasCloseIcon)}/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
            <label htmlFor="hasBackdrop">Close modal on outside click</label>
            <input type="checkbox" id="hasBackdrop" checked={hasBackdrop} onChange={() => setHasBackDrop(!hasBackdrop)}/>
        </div>
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      </div>
    </>
  );
};

export default PopUpHome;
