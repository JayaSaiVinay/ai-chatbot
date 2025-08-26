import "./App.css";
import ChatWindow from "./components/ChatWindow";
import Login from "./components/Login";
function App() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Login />;
  }
  return (
    <div className="App">
      <ChatWindow />
    </div>
  );
}

export default App;
