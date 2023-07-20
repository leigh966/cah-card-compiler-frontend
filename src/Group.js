import { useState } from "react";
import { useParams } from "react-router-dom";

import Login from "./Login";

export default function Group() {
  const { id: groupId } = useParams();

  const { sessionId, setSessionId } = useState(null);

  if (!sessionId)
    return <Login setSessionId={setSessionId} groupId={groupId} />;

  return (
    <div>
      <h3>ID: {groupId}</h3>
    </div>
  );
}
