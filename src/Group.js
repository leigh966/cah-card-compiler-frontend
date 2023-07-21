import { useState } from "react";
import { useParams } from "react-router-dom";

import Login from "./Login";
import YourCards from "./YourCards";

export default function Group() {
  const { id: groupId } = useParams();

  const [sessionId, setSessionId] = useState(null);

  console.log(sessionId);
  console.log(setSessionId);

  if (!sessionId)
    return <Login setSessionId={setSessionId} groupId={groupId} />;

  return <YourCards session_id={sessionId} />;
}
