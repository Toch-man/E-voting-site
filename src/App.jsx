import { useReducer, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function HomePage({ Vote, Admin }) {
  return (
    <div>
      <h1> WELCOME to ..... E-VOTIING PLATFORM</h1>
      <p> Vrerify your identity</p>
      <button onClick={Vote}> VOTE</button>
      <button onClick={Admin}> ADMIN</button>
    </div>
  );
}

function Vote({ candidate, handleVote }) {
  const [voterDetails, setVoterDetails] = useState({
    firstName: "",
    lastName: "",
    voterId: "",
    age: "",
  });
  const [eligibilty, setEligibilityStatus] = useState("");
  const [activeCandidateId, setActiveCandidateId] = useState(0);
  const [voted, setVoted] = useState(false);
  function handleFirstName(e) {
    setVoterDetails({ ...voterDetails, firstName: e.target.value });
  }
  function handleLastName(e) {
    setVoterDetails({ ...voterDetails, lastName: e.target.value });
  }
  function handleVoterId(e) {
    setVoterDetails({ ...voterDetails, voterId: e.target.value });
  }
  function handleAge(e) {
    setVoterDetails({ ...voterDetails, age: e.target.value });
  }
  function handleVoterDetails(e) {
    e.preventDefault();
    if (voterDetails.age < 18) {
      setEligibilityStatus("notAllowed");
    } else {
      setEligibilityStatus("vote");
    }
  }
  function handleActiveState(i) {
    setActiveCandidateId(i);
  }
  function handleVotingDone() {
    setEligibilityStatus("");
  }
  if (eligibilty === "") {
    return (
      <div className="voterForm">
        <h1>Enter details</h1>
        <form onSubmit={handleVoterDetails}>
          Firstname:
          <input
            className="voterInput"
            type="textarea"
            name="firstName"
            value={voterDetails.firstName}
            onChange={handleFirstName}
          ></input>
          Lastname:
          <input
            className="voterInput"
            type="textarea"
            name="lastName"
            value={voterDetails.lastName}
            onChange={handleLastName}
          ></input>
          <br />
          VoterId
          <input
            className="voterInput"
            type="textarea"
            name="voterId"
            value={voterDetails.voterId}
            onChange={handleVoterId}
          ></input>
          Age:
          <input
            className="voterInput"
            type="number"
            name="age"
            value={voterDetails.age}
            onChange={handleAge}
          ></input>
          <br />
          <br />
          Gender:
          <label className="voterInput">
            {"male "}
            <input type="radio" name="gender"></input>
          </label>
          <label className="voterInput">
            {"female "}
            <input type="radio" name="gender"></input>
          </label>
          <button className="button">Submit</button>
        </form>
      </div>
    );
  }
  if (eligibilty === "notAllowed") {
    return (
      <div className="voterForm">
        <h1>Enter details</h1>
        <form onSubmit={handleVoterDetails}>
          Firstname:
          <input
            className="voterInput"
            type="textarea"
            name="firstName"
            value={voterDetails.firstName}
            onChange={handleFirstName}
          ></input>
          Lastname:
          <input
            className="voterInput"
            type="textarea"
            name="lastName"
            value={voterDetails.lastName}
            onChange={handleLastName}
          ></input>
          <br />
          VoterId
          <input
            className="voterInput"
            type="textarea"
            name="voterId"
            value={voterDetails.voterId}
            onChange={handleVoterId}
          ></input>
          Age:
          <input
            className="voterInput"
            type="number"
            name="age"
            value={voterDetails.age}
            onChange={handleAge}
          ></input>
          <p style={{ color: "red" }}> sorry you arent old enough to vote</p>
          <br />
          Gender:
          <label>
            {"male "}
            <input type="radio" name="gender"></input>
          </label>
          <label>
            {"female "}
            <input type="radio" name="gender"></input>
          </label>
          <button className="button">Submit</button>
        </form>
      </div>
    );
  }
  if (eligibilty === "vote" && voted == false) {
    return (
      <div className="votingPage">
        {" "}
        <h1> VOTING STATS</h1>
        <nav className="navBar">
          <ul>
            {candidate.map((n, v) => (
              <li className="li" onClick={() => handleActiveState(v)}>
                {" "}
                {n.name}
              </li> //check why  name isgiving undefined after voting
            ))}
          </ul>
        </nav>
        <p className="candidateDetails">
          {candidate[activeCandidateId].name}
          <br />
          {candidate[activeCandidateId].party}
          <br />

          <button
            className="button"
            onClick={() => {
              setVoted(true);
              handleVote(activeCandidateId);
            }}
          >
            VOTE
          </button>
        </p>
      </div>
    );
  }
  if (voted) {
    return (
      <>
        <div className={voted ? "lowOpacity" : "votingPage"}>
          {" "}
          <h1> VOTING STATS</h1>
          <nav className="navBar">
            <ul>
              {candidate.map((n, v) => (
                <li className="li" onClick={() => handleActiveState(v)}>
                  {" "}
                  {n.name}
                </li> //check why  name isgiving undefined after voting
              ))}
            </ul>
          </nav>
          <p className="candidateDetails">
            {candidate[activeCandidateId].name}
            <br />
            {candidate[activeCandidateId].party}
            <br />
            <button
              className="button"
              onClick={() => {
                setVoted(true);
                handleVote(activeCandidateId);
              }}
            >
              VOTE
            </button>
          </p>
        </div>
        <div className="dialogBox">
          <button onClick={handleVotingDone} className="dialogButton">
            X
          </button>
          <h1 className="congratulations">
            {" "}
            Congratulations <br />
            your vote have been added {console.log(candidate[0].vote)}
          </h1>
        </div>
      </>
    );
  }
}

function AdminPage({ candidate }) {
  const [verifiedAdmin, setVerifiedAdmin] = useState(false);
  const [adminID, setadminID] = useState("");
  const [electionStatus, setElectionStatus] = useState("ongoing");
  const [winnerId, setWinnerId] = useState(null);
  const [activeCandidateId, setActiveCandidateId] = useState(null);
  // const [screenStatus, setScreenStatus] = useState("");

  const admins = [
    { name: "Christain", no: "admin001", id: 1 },
    { name: "Abel", no: "admin002", id: 2 },
    { name: "stacia", no: "admin003", id: 3 },
  ];

  function handleElectionStatus() {
    for (let i = 0; i < candidate.length - 1; i++) {
      for (let j = i + 1; j < candidate.length; j++) {
        if (candidate[i].vote > candidate[j].vote) {
          let swap = candidate[i];
          candidate[i] = candidate[j];
          candidate[j] = swap;
        }
      }
    }
    setWinnerId(candidate.length - 1);
    setElectionStatus("ended");
    setActiveCandidateId(0);
  }

  // function handleScreenStatus() {
  //   setScreenStatus("removeBox");
  //   setElectionStatus("ongoing");
  // }
  function handleActiveState(i) {
    setActiveCandidateId(i);
  }
  function handleCheckAdminStatus(e) {
    e.preventDefault();
    let confirmeAdmin = admins.find((a) => a.no === adminID);
    if (confirmeAdmin) {
      setVerifiedAdmin(true);
    } else {
      setVerifiedAdmin(false);
      alert("SORRY THAT ID IS NOT REGSTERED");
    }
  }
  if (!verifiedAdmin) {
    return (
      <div className="voterForm">
        <h1>Enter Admin ID</h1>
        <form onSubmit={handleCheckAdminStatus}>
          <input
            type="textarea"
            name="adminId"
            value={adminID}
            onChange={(e) => setadminID(e.target.value)}
          ></input>{" "}
          <br />
          <button className=" button">Log IN</button>
        </form>
      </div>
    );
  } else if (verifiedAdmin) {
    if (electionStatus === "ongoing") {
      if (activeCandidateId !== null) {
        return (
          <div className="votingPage">
            {" "}
            <h1> VOTING STATS</h1>
            <nav className="navBar">
              <ul>
                {candidate.map((n, v) => (
                  <li onClick={() => handleActiveState(v)}> {n.name}</li>
                ))}
              </ul>
            </nav>
            <p className="candidateDetails">
              {candidate[activeCandidateId].name}
              <br />
              {candidate[activeCandidateId].party}
              <br />
              {candidate[activeCandidateId].vote}
              <br />
              <button className="button" onClick={handleElectionStatus}>
                End Election
              </button>
            </p>
          </div>
        );
      } else if (!activeCandidateId) {
        return (
          <div className="votingPage">
            {" "}
            <h1> VOTING STATS</h1>
            <nav className="navBar">
              <ul>
                {candidate.map((n, v) => (
                  <li onClick={() => handleActiveState(v)}> {n.name}</li>
                ))}
              </ul>
            </nav>
            <div className="candidateDetails">
              <button className="button" onClick={handleElectionStatus}>
                End Election
              </button>
            </div>
          </div>
        );
      }
    }

    return (
      <div>
        <div
          className={electionStatus === "ended" ? "lowOpacity" : "votingPage"}
        >
          {" "}
          <h1> VOTING STATS</h1>
          <nav className="navBar">
            <ul>
              {candidate.map((n, v) => (
                <li onClick={() => handleActiveState(v)}> {n.name}</li>
              ))}
            </ul>
          </nav>
          <p className="candidateDetails">
            {candidate[activeCandidateId].name}
            <br />
            {candidate[activeCandidateId].party}
            <br />
            {candidate[activeCandidateId].vote}
            <br />
            <button className="button">End Election</button>
          </p>
        </div>
        <div className="dialogBox2">
          <button
            className="dialogButton"
            onClick={() => setVerifiedAdmin(false)}
          >
            X
          </button>
          <h1>
            {" "}
            Congratulations new president elect
            {candidate[winnerId].name} representative of
            {candidate[winnerId].party} with
            {candidate[winnerId].vote}
          </h1>
        </div>
      </div>
    );
  }
}
export default function App() {
  const [candidate, setCandidate] = useState([
    { name: "Kluivert Edward", party: "lpc", image: "", id: 0, vote: 0 },
    { name: "Micheal simons", party: "adc", image: "", id: 1, vote: 3 },
    { name: "Samuel jackson", party: "hol", image: "", id: 2, vote: 0 },
    { name: "Ryan dobrev", party: "vad", image: "", id: 3, vote: 0 },
    { name: "Gerald odin", party: "thr", image: "", id: 4, vote: 0 },
  ]);
  const [userStatus, setUserStatus] = useState("");
  function onVote(i) {
    const updatedStats = candidate.map((c, j) => {
      if (i === j) {
        return { ...c, vote: c.vote + 1 };
      } else return c;
    });
    setCandidate(updatedStats);
  }
  function handleUserVote() {
    setUserStatus("vote");
  }
  function handleUserAdmin() {
    setUserStatus("admin");
  }
  if (userStatus === "") {
    return <HomePage Vote={handleUserVote} Admin={handleUserAdmin} />;
  }
  if (userStatus === "vote") {
    return <Vote candidate={candidate} handleVote={onVote} />;
  }
  if (userStatus === "admin") {
    return <AdminPage candidate={candidate} />;
  }
}
