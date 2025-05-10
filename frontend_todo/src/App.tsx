import { useEffect, useState } from "react";
import mqtt from "mqtt";
import axios from "axios";
import { API_BASE_URL, MQTT_PUB_TOPIC, MQTT_SUB_TOPIC, MQTT_URL } from "./constant.ts";
import InputBox from "./Components/InputBox.tsx";
import NotesList from "./Components/NotesList.tsx";

interface Note {
  task: string;
  createdAt: string;
}
const client = mqtt.connect(MQTT_URL);

function App() {
  const [note, setNote] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get<Note[]>(
          `${API_BASE_URL}/fetchAllTasks`
        );
        setNotes(response.data);
      } catch (error) {
        alert(`Error fetching notes: ${error}`);
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();

    client.on("connect", () => {
      setIsConnected(true);
      client.subscribe(MQTT_SUB_TOPIC);
    });

    client.on("message", (topic: string, message: Buffer) => {
      if (topic === MQTT_SUB_TOPIC) {
        const msg: string = message.toString();
        const newNote: Note = {
          task: msg,
          createdAt: new Date().toISOString(),
        };
        setNotes((prevNotes) => [newNote, ...prevNotes]);
      }
    });

    client.on("error", (err) => {
      console.error("MQTT error:", err);
    });
  }, []);

  const addNote = () => {
    if (client && isConnected && note.trim() !== "") {
      client.publish(MQTT_PUB_TOPIC, note);
      setNote("");
    } else {
      console.warn("MQTT not connected or note is empty");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white shadow-md rounded-md p-6 w-[759px] h-[742px] top-[273px]">
        <InputBox note={note} setNote={setNote} addNote={addNote} />
        <h2 className="font-semibold mb-2 text-black font-inter font-semibold text-[30px] leading-[36px] mb-2 mt-2">Notes</h2>
        <NotesList notes={notes} />
      </div>
    </div>
  );
}

export default App;
