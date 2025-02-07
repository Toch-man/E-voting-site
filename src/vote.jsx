import { useState } from "react";
export default function Vote({ candidate, handleVote, handleHomePage }) {
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
    let validilityStatus = true;
    let details = [
      voterDetails.firstName,
      voterDetails.lastName,
      voterDetails.voterId,
      voterDetails.age,
    ];
    for (let i = 0; i < details.length; i++) {
      if (details[i] === "") {
        validilityStatus = false;
      } else {
        continue;
      }
    }
    if (voterDetails.age < 18 || !validilityStatus) {
      setEligibilityStatus("notAllowed");
    } else {
      setEligibilityStatus("vote");
    }
    setVoterDetails({ firstName: "", lastName: "", voterId: "", age: "" });
  }
  function handleActiveState(i) {
    setActiveCandidateId(i);
  }
  function handleVotingDone() {
    setEligibilityStatus("");
    setVoted(false);
    setActiveCandidateId(0);
  }
  if (eligibilty === "" || eligibilty === "notAllowed") {
    return (
      <div className="voterForm">
        <button className="button" onClick={handleHomePage}>
          {" "}
          back
        </button>
        <img className="logo" src="voting-logo.jpg" alt="logo" />
        <h2>Enter details</h2>
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
          ></input>{" "}
          <p
            style={
              eligibilty === "notAllowed"
                ? { color: "red", display: "block" }
                : { display: "none" }
            }
          >
            {" "}
            sorry you arent old enough to vote or invalid details
          </p>
          <br />
          Gender:
          <label className="voterLabel">
            {"male "}
            <input type="radio" name="gender"></input>
          </label>
          <label className="voterLabel">
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
        <div className="div21">
          <button
            className="navButton"
            onClick={() => setEligibilityStatus("")}
          >
            {" "}
            back
          </button>
          <div className="VotingStats">
            <img className="logo" src="voting-logo.jpg" alt="logo" />
            <h1> VOTING STATS</h1>
          </div>
        </div>
        <div className="div22">
          <div className="navBar">
            <ul>
              {candidate.map((n, v) => (
                <li className="li" onClick={() => handleActiveState(v)}>
                  <img className="icon" src="profile.png" alt="icon"></img>
                  {n.name}
                </li> //check why  name isgiving undefined after voting
              ))}
            </ul>
          </div>
          <div className="candidateDetails">
            {candidate[activeCandidateId].name}
            <br />
            {candidate[activeCandidateId].party}
            <br />
            <img
              className="president"
              src={candidate[activeCandidateId].image}
            ></img>
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
          </div>
        </div>
      </div>
    );
  }
  if (voted) {
    return (
      <>
        <div className="lowOpacity">
          {" "}
          <div className="div21">
            <button
              className="navButton"
              onClick={() => setEligibilityStatus("")}
            >
              {" "}
              back
            </button>
            <div className="VotingStats">
              <img className="logo" src="voting-logo.jpg" alt="logo" />
              <h1> VOTING STATS</h1>
            </div>
          </div>
          <div className="div22">
            <div className="navBar">
              <ul>
                {candidate.map((n, v) => (
                  <li className="li" onClick={() => handleActiveState(v)}>
                    <img className="icon" src="profile.png" alt="icon"></img>
                    {n.name}
                  </li> //check why  name isgiving undefined after voting
                ))}
              </ul>
            </div>
            <div className="candidateDetails">
              {candidate[activeCandidateId].name}
              <br />
              {candidate[activeCandidateId].party}
              <br />
              <img
                className="president"
                src={candidate[activeCandidateId].image}
              ></img>
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
            </div>
          </div>
        </div>
        <div className="dialogBox">
          <button onClick={handleVotingDone} className="dialogButton">
            Log Out
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
