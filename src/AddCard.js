import { Form } from "react-router-dom";
import "./AddCard.css";
import { BACKEND_URL } from "./WebConfig";

export default function AddCard({ sessionId, setShow, pending, setPending }) {
  const handleResponse = (r) => {
    if (r.status === 201) {
      alert("card added");
      setPending(pending + 1);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(BACKEND_URL + "/card", {
      method: "POST",
      headers: { session_id: sessionId },
      body: new FormData(e.target),
    }).then(handleResponse);
  };

  return (
    <div id="add-card-form" className="flex-center flex-col">
      <div className="fill-x" style={{ height: 15 }}>
        <p
          onClick={(e) => {
            setShow(false);
            e.preventDefault();
          }}
          className="exit-button"
          id="add-card-exit-btn"
        >
          x
        </p>
      </div>
      <h2 style={{ marginTop: 5 }}>Create New Card</h2>
      <form className="flex-center flex-col" onSubmit={onSubmit}>
        <label>Card Text</label>
        <input type="text" name="card_text" />
        <input type="submit" />
      </form>
    </div>
  );
}
