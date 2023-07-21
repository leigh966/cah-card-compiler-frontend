import { useState } from "react";
import { useParams } from "react-router-dom";

import Login from "./Login";

export default function Group() {
  const { id: groupId } = useParams();

  const [sessionId, setSessionId] = useState(null);

  console.log(sessionId);
  console.log(setSessionId);

  if (!sessionId)
    return <Login setSessionId={setSessionId} groupId={groupId} />;

  return (
    <div>
      <h3>group_id: {groupId}</h3>
      <h3>session_id: {sessionId}</h3>
    </div>
  );
}
