import { useState } from "react";
export default function Vote({
  candidate,
  handleVote,
  handleHomePage,
  electionStatus,
}) {
  const [voterDetails, setVoterDetails] = useState({
    firstName: "",
    lastName: "",
    voterId: "",
    age: "",
  });
  const [eligibilty, setEligibilityStatus] = useState("");
  const [activeCandidateId, setActiveCandidateId] = useState(0);
  const [voted, setVoted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function handleInputChange(e) {
    setVoterDetails({ ...voterDetails, [e.target.name]: e.target.value });
  }
  function isVoterIdUsed(voterId) {
    const storedvotersId = JSON.parse(localStorage.getItem("voterIds")) || [];
    return storedvotersId.includes(voterId);
  }
  function handleVoterDetails(e) {
    e.preventDefault();
    const { voterId, age } = voterDetails;
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
    if (age < 18) {
      setErrorMessage("❌ Sorry Not old enough to vote");
      setEligibilityStatus("notAllowed");
      return;
    }
    if (!validilityStatus) {
      setEligibilityStatus("notAllowed");
      setErrorMessage("❌ please fill all fields.");
      return;
    }
    if (isVoterIdUsed(voterId)) {
      setErrorMessage("❌ This Voter ID has already been used.");
      setEligibilityStatus("notAllowed");
      return;
    }
    const storedvotersId = JSON.parse(localStorage.getItem("voterIds")) || [];
    storedvotersId.push(voterId);
    localStorage.setItem("voterIds", JSON.stringify(voterId));
    setEligibilityStatus("vote");
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
        <h1 className="heading">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img className="logo" src="voting-logo.jpg" alt="logo" />
            <div className="dynasty">DYNASTY E-VOTING</div>
          </div>
        </h1>
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
            onChange={handleInputChange}
          ></input>
          Lastname:
          <input
            className="voterInput"
            type="textarea"
            name="lastName"
            value={voterDetails.lastName}
            onChange={handleInputChange}
          ></input>
          <br />
          VoterId
          <input
            className="voterInput"
            type="textarea"
            name="voterId"
            value={voterDetails.voterId}
            onChange={handleInputChange}
          ></input>
          Age:
          <input
            className="voterInput"
            type="number"
            name="age"
            value={voterDetails.age}
            onChange={handleInputChange}
          ></input>{" "}
          <p
            style={
              eligibilty === "notAllowed"
                ? { color: "green", display: "block" }
                : { display: "none" }
            }
          >
            {" "}
            {`${errorMessage}`}
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
  if (eligibilty === "vote" && voted == false && electionStatus === "ongoing") {
    return (
      <div className="votingPage">
        <h1 className="heading">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img className="logo" src="voting-logo.jpg" alt="logo" />
            <div className="dynasty">DYNASTY E-VOTING</div>
          </div>
        </h1>
        <div className="div21">
          <button
            className="navButton"
            onClick={() => setEligibilityStatus("")}
          >
            {" "}
            back
          </button>
          <div className="VotingStats">
            {/* <img className="logo" src="voting-logo.jpg" alt="logo" /> */}
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
            <p
              style={{
                fontSize: "50px",
                marginBottom: "5px",
                marginTop: "5px",
                color: " #ecae56",
              }}
            >
              {" "}
              <b>{candidate[activeCandidateId].name}</b>
            </p>
            <br />
            From <b>{candidate[activeCandidateId].party}</b> Party
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
  } else if (electionStatus === "ongoing") {
    <div>
      <h1 className="heading">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img className="logo" src="voting-logo.jpg" alt="logo" />
          <div className="dynasty">DYNASTY E-VOTING</div>
        </div>
      </h1>
      <div className="div21">
        <button className="navButton" onClick={() => setEligibilityStatus("")}>
          {" "}
          back
        </button>
        <div className="VotingStats">
          {/* <img className="logo" src="voting-logo.jpg" alt="logo" /> */}
          <h1> VOTING STATS</h1>
        </div>
      </div>
    </div>;
  }
  if (voted) {
    return (
      <>
        <div className="lowOpacity">
          <h1 className="heading">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img className="logo" src="voting-logo.jpg" alt="logo" />
              <div className="dynasty">DYNASTY E-VOTING</div>
            </div>
          </h1>
          <div className="div21">
            <button
              className="navButton"
              onClick={() => setEligibilityStatus("")}
              disabled={true}
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
              <p
                style={{
                  fontSize: "50px",
                  marginBottom: "5px",
                  marginTop: "5px",
                  color: " #ecae56",
                }}
              >
                <b>{candidate[activeCandidateId].name}</b>
              </p>
              <br />
              From <b>{candidate[activeCandidateId].party}</b> Party
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
                disabled={true}
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
