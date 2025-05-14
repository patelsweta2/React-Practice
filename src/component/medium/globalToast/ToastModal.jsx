export const ToastModal = ({ id, message, type, removeToast }) => {
    const getBackgroundColor = () => {
      switch (type) {
        case "success":
          return "#4CAF50";
        case "error":
          return "#F44336";
        case "warning":
          return "#FF9800";
        case "info":
          return "#2196F3";
        default:
          return "#333";
      }
    };
  
    return (
      <div
        style={{
          backgroundColor: getBackgroundColor(),
          color: "white",
          padding: "12px 16px",
          borderRadius: "6px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minWidth: "250px",
          maxWidth: "350px",
        }}
      >
        <span>{message}</span>
        <button
          onClick={() => removeToast(id)}
          style={{
            marginLeft: "10px",
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          &#x2715;
        </button>
      </div>
    );
  };
  