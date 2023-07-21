import { Form } from "react-router-dom";
import "./AddCard.css";
import { BACKEND_URL } from "./WebConfig";

export default function AddCard({ sessionId, cards, setCards }) {
  const handleResponse = (r) => {
    if (r.status === 201) {
      alert("card added");
      let newCards = [...cards];
      newCards.push({ card_id: null, card_text: "" });
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
      <h2>Create New Card</h2>
      <form className="flex-center flex-col" onSubmit={onSubmit}>
        <label>Card Text</label>
        <input type="text" name="card_text" />
        <input type="submit" />
      </form>
    </div>
  );
}
