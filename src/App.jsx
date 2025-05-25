import React, { useState } from "react";
import Menu from "./Menu.jsx";
import Group from "./Group.jsx";

export default function App() {
  // Guarda el id del grupo actual, null = menú principal
  const [groupId, setGroupId] = useState(null);

  return (
    <>
      {groupId ? (
        <Group groupId={groupId} goBack={() => setGroupId(null)} />
      ) : (
        <Menu onCreateGroup={setGroupId} />
      )}
    </>
  );
}
