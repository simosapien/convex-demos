import { useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";

export default function App() {
  const messages = useQuery("listMessages") || [];

  const [newMessageText, setNewMessageText] = useState("");
  const sendMessage = useMutation("sendMessage");

  const [name] = useState(() => "User " + Math.floor(Math.random() * 10000));
  async function handleSendMessage(event) {
    event.preventDefault();
    setNewMessageText("");
    await sendMessage(newMessageText, name);
  }

  const [searchText, setSearchText] = useState("");
  const searchResults = useQuery("searchMessages", searchText) || [];

  return (
    <main>
      <h1>Convex Chat</h1>
      <p className="badge">
        <span>{name}</span>
      </p>
      <ul>
        {messages.map(message => (
          <li key={message._id.toString()}>
            <span>{message.author}:</span>
            <span>{message.body}</span>
            <span>{new Date(message._creationTime).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          value={newMessageText}
          onChange={event => setNewMessageText(event.target.value)}
          placeholder="Write a message…"
        />
        <input type="submit" value="Send" disabled={!newMessageText} />
      </form>
      <div className="search">
        <h2>Search Messages</h2>
        <input
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
          placeholder="Search!"
        />
        <ul>
          {searchResults.map(searchResult => (
            <li key={searchResult._id.toString()}>
              <span>{searchResult.author}:</span>
              <span>{searchResult.body}</span>
              <span>
                {new Date(searchResult._creationTime).toLocaleTimeString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
