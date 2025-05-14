import { useToast } from "./useToast";
import { ToastModal } from "./ToastModal";

const ToastHome = () => {
  const {
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
  } = useToast();

  const getToastContainerStyle = () => ({
    position: "fixed",
    [verticalPosition]: "20px",
    [horizontalPosition]: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    zIndex: 9999,
  });

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "300px",
        }}
      >
        <select
          value={horizontalPosition}
          onChange={(e) => setHorizontalPosition(e.target.value)}
        >
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>

        <select
          value={verticalPosition}
          onChange={(e) => setVerticalPosition(e.target.value)}
        >
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="normal">Normal</option>
          <option value="error">Error</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>

        <input
          type="text"
          placeholder="Message.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <label>
          Duration ({duration}s)
          <input
            type="range"
            min="2"
            max="10"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </label>

        <button type="button" onClick={showToast}>
          Show Toast
        </button>
      </form>

      {toastMessage.length > 0 && (
        <div style={getToastContainerStyle()}>
          {toastMessage.map((msg) => (
            <ToastModal key={msg.id} {...msg} removeToast={removeToast} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToastHome;
