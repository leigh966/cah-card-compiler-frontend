import { useEffect, useState } from "react";
import { BACKEND_URL } from "./WebConfig";
import "./YourCards.css";
import AddCard from "./AddCard";

function Card({ info }) {
  return (
    <div className="card">
      <h3>{info.card_text}</h3>
    </div>
  );
}

function CardCollection({ cards }) {
  const cardElems = cards.map((card) => <Card info={card} />);
  return cardElems;
}

export default function YourCards({ session_id }) {
  const [cards, setCards] = useState([]);

  const [showAddForm, setShowAddform] = useState(false);

  const handleResponse = (r) => {
    if (r.status === 200) {
      r.json().then(setCards);
    }
  };

  const requestCards = () => {
    fetch(BACKEND_URL + "/my_cards", {
      headers: { session_id: session_id },
    }).then(handleResponse);
  };

  const showAddCardForm = () => {
    setShowAddform(true);
  };

  useEffect(requestCards, [cards]);

  return (
    <div>
      <div className="flex-col flex-center">
        <div className="flex-row" id="card-page-header">
          <h3 id="your-cards-heading">Your Cards:</h3>
          <button id="add-card-btn" onClick={showAddCardForm}>
            Add
          </button>
        </div>
        <CardCollection cards={cards} />
      </div>
      {showAddForm && (
        <AddCard sessionId={session_id} cards={cards} setCards={setCards} />
      )}
    </div>
  );
}
