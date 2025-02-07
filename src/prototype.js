import { useRef, useState } from "react";
import "./App.css";
import AdminPage from "./admin";
import Vote from "./vote";
function HomePage({ Vote, Admin }) {
  return (
    <div>
      <h1> WELCOME to ..... E-VOTIING PLATFORM</h1>
      <p> Vrerify your identity</p>
      <button className="button" onClick={Vote}>
        {" "}
        VOTE
      </button>
      <button className="button" onClick={Admin}>
        {" "}
        ADMIN
      </button>
    </div>
  );
}

let candidate = [
  { name: "Kluivert Edward", party: "lpc", image: "", id: 0, vote: 0 },
  { name: "Micheal simons", party: "adc", image: "", id: 1, vote: 3 },
  { name: "Samuel jackson", party: "hol", image: "", id: 2, vote: 0 },
  { name: "Ryan dobrev", party: "vad", image: "", id: 3, vote: 0 },
  { name: "Gerald odin", party: "thr", image: "", id: 4, vote: 0 },
];
export default function App() {
  const [userStatus, setUserStatus] = useState("");
  const newCandidates = useRef([]);
  function onVote(i) {
    candidate.map((c, j) => {
      if (i === j) {
        return { ...c, vote: c.vote + 1 };
      } else return c;
    });
  }
  function onChangeCandidate() {
    candidate = newCandidates.current;
  }
  function onAddCandidate(candidateInfo) {
    newCandidates.current.push(candidateInfo);
    console.log(newCandidates.current);
  }
  function handleUserVote() {
    setUserStatus("vote");
  }
  function handleUserAdmin() {
    setUserStatus("admin");
  }
  function onHomePage() {
    setUserStatus("");
  }
  if (userStatus === "") {
    return <HomePage Vote={handleUserVote} Admin={handleUserAdmin} />;
  }
  if (userStatus === "vote") {
    return (
      <Vote
        candidate={candidate}
        handleVote={onVote}
        handleHomePage={onHomePage}
      />
    );
  }
  if (userStatus === "admin") {
    return (
      <AdminPage
        candidate={candidate}
        handleHomePage={onHomePage}
        handleChangeCandidate={onChangeCandidate}
        handleAddCandidate={onAddCandidate}
      />
    );
  }
}
