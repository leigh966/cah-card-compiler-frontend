import { useEffect, useState } from "react";
import { BACKEND_URL } from "./WebConfig";
import "./YourCards.css";

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

  useEffect(requestCards, []);

  return (
    <div className="flex-col flex-center">
      <h3>Your Cards:</h3>
      <CardCollection cards={cards} />
    </div>
  );
}
