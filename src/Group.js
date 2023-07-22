import { useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "./WebConfig";

import Login from "./Login";
import YourCards from "./YourCards";
import NoPage from "./NoPage";

export default function Group() {
  const { id: groupId } = useParams();

  const [sessionId, setSessionId] = useState(null);
  const [groupName, setGroupName] = useState("");

  const getGroupName = () => {
    fetch(BACKEND_URL + "/group/" + groupId).then((r) => {
      if (r.status === 200) {
        r.text().then(setGroupName);
      } else if (r.status === 404) {
        setGroupName(null);
      }
    });
  };

  useState(getGroupName, []);

  if (groupName === null) {
    return <NoPage />;
  }

  if (!sessionId)
    return (
      <Login
        setSessionId={setSessionId}
        groupId={groupId}
        groupName={groupName}
      />
    );

  return <YourCards session_id={sessionId} />;
}
