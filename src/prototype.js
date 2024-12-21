import { useState } from "react";
import "./App.css";

const admins = [
  { name: "Christain", no: "admin001", id: 1 },
  { name: "Abel", no: "admin002", id: 2 },
  { name: "stacia", no: "admin003", id: 3 },
];

function HomePage() {
  return (
    <div>
      <button className="option">ADMIN</button>
      <button className="option">VOTER</button>
    </div>
  );
}

function VoterPage({ candidate }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    voterId: "",
  });
  function handleFirstName(e) {
    setFormData({ ...formData, firstname: e.target.value });
  }
  function handleSubmit() {}
  return (
    <div>
      <form>
        <input
          onChange={handleFirstName}
          name="firstname"
          type="textarea"
          value={formData.firstname}
        ></input>

        <input
          onChange={handleLastName}
          name="lastname"
          type="textarea"
          value={formData.lastname}
        ></input>

        <input
          onChange={handleAge}
          name="age"
          type="number"
          value={formData.age}
        ></input>

        <input
          onChange={handleVoterId}
          name="voterId"
          type="textarea"
          value={formData.voterId}
        ></input>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function AdminPage({ candidate }) {
  const [index, setIndex] = useState(0);
  const [electionState, setElection] = useState(true);
  const [winnerId, setWinnerId] = useState(0);

  let winner = candidate.find((a) => a.vote === winnerId);

  function handleNext() {
    setIndex(index + 1);
  }
  function handlePrev() {
    setIndex(index - 1);
  }
  function handleWinner() {
    for (let i = 0; i < candidate.length - 1; i++) {
      for (let j = i + 1; j < candidate.length; j++) {
        if (candidate[i].vote > candidate[j].vote) {
          let swap = candidate[i].vote;
          candidate[i].vote = candidate[j].vote;
          candidate[j].vote = swap;
        }
      }
    }
    setWinnerId(candidate.length - 1);
    setElection(false);
    console.log(winner);
  }
  if (electionState) {
    return (
      <div>
        <h1>Candidate name : {candidate[index].name}</h1>
        <div>{candidate[index].image}</div>
        <p> Party : {candidate[index].party}</p>
        <p> Vote : {candidate[index].vote}</p>
        <br />
        <button onClick={handlePrev} className="switch" disabled={index <= 1}>
          Prev
        </button>
        <button
          onClick={handleNext}
          className="switch"
          disabled={index >= candidate.length}
        >
          Next
        </button>
        <br />
        <button className="announceWinnner" onClick={handleWinner}>
          {" "}
          END ELECTION
        </button>
      </div>
    );
  }
  return (
    <div>
      <button> X</button>
      <h1> {winner.name}</h1>
      <p>{winner.image}</p>
      <p>{winner.party}</p>
      <p> "NEW PRESIDENT ELECT"</p>
    </div>
  );
}

export default function App() {
  const candidate = [
    { name: "Kluivert Edward", party: "lpc", image: "", vote: 0 },
    { name: "Micheal simons", party: "adc", image: "", vote: 3 },
    { name: "Samuel jackson", party: "hol", image: "", vote: 0 },
    { name: "Ryan dobrev", party: "vad", image: "", vote: 0 },
    { name: "Gerald odin", party: "thr", image: "", vote: 0 },
  ];
  return <AdminPage candidate={candidate} />;
}
