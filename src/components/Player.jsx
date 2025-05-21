import { useState } from "react";

function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const saveName = () => {
    setIsEditing(false);
  };

  return (
    <li>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{name}</span>
        ) : (
          <input type="text" required />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      {!isEditing ? (
        <button onClick={handleEditClick}>Edit</button>
      ) : (
        <button onClick={saveName}>Save</button>
      )}
    </li>
  );
}

export default Player;
