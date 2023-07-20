import { useState } from "react";
import { FRONTEND_URL } from "./WebConfig";

function GroupCreationForm({ setGroupId }) {
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch("http://localhost:8000/group", {
      method: "POST",
      body: formData,
    }).then((r) => {
      if (r.status === 201) r.text().then(setGroupId);
      else alert("Error");
    });
  };
  return (
    <form
      className="moved-up-by-height flex-col flex-center"
      onSubmit={onSubmit}
    >
      <h3 htmlFor="group_name">Enter a name for your group</h3>
      <input
        type="text"
        className="fill-x text-align-center"
        name="group_name"
        id="group_name"
      />
      <br />
      <input type="submit" value="Create Group" />
    </form>
  );
}

function LinkGive({ url }) {
  return (
    <div className="moved-up-by-height flex-col flex-center">
      <h3>Here:</h3>
      <a href={url}>{url}</a>
    </div>
  );
}

export default function Home() {
  const [groupId, setGroupId] = useState(null);

  return (
    <div className="flex-center fills-page">
      {groupId === null && <GroupCreationForm setGroupId={setGroupId} />}
      {groupId !== null && (
        <LinkGive url={`${FRONTEND_URL}/groups/${groupId}`} />
      )}
    </div>
  );
}
