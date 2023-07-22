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

function DownloadReportButton({ sessionId }) {
  const onClick = () => {
    fetch(BACKEND_URL + "/report", {
      method: "GET",
      headers: {
        session_id: sessionId,
      },
    }).then((response) => {
      var a = response.body.getReader();
      a.read().then(({ done, value }) => {
        // console.log(new TextDecoder("utf-8").decode(value));
        saveAsFile(new TextDecoder("utf-8").decode(value), "report.xls");
      });
    });
  };

  function saveAsFile(text, filename) {
    // Step 1: Create the blob object with the text you received
    const type =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // modify or get it from response
    const blob = new Blob([text], { type });

    // Step 2: Create Blob Object URL for that blob
    const url = URL.createObjectURL(blob);

    // Step 3: Trigger downloading the object using that URL
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click(); // triggering it manually
  }
  return <button onClick={onClick}>Download Spreadsheet</button>;
}

export default function YourCards({ session_id }) {
  const [cards, setCards] = useState([]);

  const [pending, setPending] = useState(0);

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

  useEffect(requestCards, [pending]);

  return (
    <div>
      <div className="flex-col flex-center">
        <div className="flex-row" id="card-page-header">
          <h3 id="your-cards-heading">Your Cards:</h3>
          <button id="add-card-btn" onClick={showAddCardForm}>
            Add
          </button>
          <DownloadReportButton sessionId={session_id} />
        </div>
        <CardCollection cards={cards} />
      </div>
      {showAddForm && (
        <AddCard
          sessionId={session_id}
          setShow={setShowAddform}
          setPending={setPending}
          pending={pending}
        />
      )}
    </div>
  );
}
