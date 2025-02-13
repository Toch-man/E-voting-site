import { useState } from "react";
export default function AdminPage({
  candidate,
  handleHomePage,
  handleChangeCandidate,
  handleAddCandidate,
  handleDeleteCandidate,
  disable,
}) {
  const [candidateDetails, setCandidateDetails] = useState({
    name: "",
    party: "",
    id: "",
    image: "",
    vote: 0,
  });
  const [verifiedAdmin, setVerifiedAdmin] = useState(false);
  const [adminID, setadminID] = useState("");
  const [electionStatus, setElectionStatus] = useState("ongoing");
  const [winnerId, setWinnerId] = useState(null);
  const [activeCandidateId, setActiveCandidateId] = useState(0);
  const [newElection, setNewElection] = useState(false);
  const [newForm, setNewForm] = useState(false);

  function handleCandidateName(e) {
    setCandidateDetails({ ...candidateDetails, name: e.target.value });
  }
  function handleCandidateId(e) {
    setCandidateDetails({ ...candidateDetails, id: e.target.value });
  }
  function handleCandidateParty(e) {
    setCandidateDetails({ ...candidateDetails, party: e.target.value });
  }
  function handleCandidateImage(e) {
    setCandidateDetails({ ...candidateDetails, image: e.target.value });
  }

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
  function handleLogOut() {
    setVerifiedAdmin(false);
    setadminID("");
    setActiveCandidateId(0);
    setNewElection(false);
    setNewForm(false);
  }
  if (!verifiedAdmin) {
    return (
      <div className="voterForm">
        <h1 className="heading">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img className="logo" src="voting-logo.jpg" alt="logo" />
            <div className="dynasty">DYNASTY E-VOTING</div>
          </div>
        </h1>
        <button onClick={handleHomePage} className="navButton">
          back
        </button>
        <img className="logo" src="voting-logo.jpg" alt="logo" />
        <h1>Enter Admin ID</h1>
        <form onSubmit={handleCheckAdminStatus}>
          <input
            type="textarea"
            name="adminId"
            value={adminID}
            className="adminInput"
            onChange={(e) => setadminID(e.target.value)}
          ></input>{" "}
          <br />
          <button className=" button">Log IN</button>
        </form>
      </div>
    );
  }
  if (verifiedAdmin) {
    if (electionStatus === "ongoing" && !newForm) {
      return (
        <div className="votingPage">
          <h1 className="heading">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img className="logo" src="voting-logo.jpg" alt="logo" />
              <div className="dynasty">DYNASTY E-VOTING</div>
            </div>
          </h1>
          <button
            className="navButton"
            onClick={() => {
              if (!newElection) {
                setVerifiedAdmin(false);
              } else {
                setNewForm(true);
                setNewElection(false);
              }
            }}
          >
            {" "}
            back
          </button>{" "}
          <div className="div21">
            <div className="VotingStats">
              <img className="logo" src="voting-logo.jpg" alt="logo" />
              <h1> VOTING STATS</h1>
            </div>
          </div>
          <div className="div22">
            <div className="navBar">
              <ul>
                {candidate.map((n, v) => (
                  <li
                    key={n.id}
                    className="li"
                    onClick={() => handleActiveState(v)}
                  >
                    <img className="icon" src="profile.png" alt="icon"></img>
                    {n.name}
                  </li> //check why  name isgiving undefined after voting
                ))}
              </ul>
            </div>
            <section>
              <p className="candidateDetails">
                <p
                  style={{
                    fontSize: "50px",
                    marginBottom: "5px",
                    marginTop: "5px",
                    color: " #ecae56",
                  }}
                >
                  <b> {candidate[activeCandidateId].name}</b>
                </p>
                <br />
                From <b> {candidate[activeCandidateId].party}</b> Party
                <br />
                No of Vote: {candidate[activeCandidateId].vote}
                <br />
                <img
                  className="president"
                  src={candidate[activeCandidateId].image}
                ></img>
                <br />
                <button className="button" onClick={handleElectionStatus}>
                  End Election
                </button>
              </p>
            </section>
          </div>
        </div>
      );
    }
    if (electionStatus === "ended" && winnerId) {
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
              <div className="VotingStats">
                <img className="logo" src="voting-logo.jpg" alt="logo" />
                <h1> VOTING STATS</h1>
              </div>
            </div>
            <div className="div22">
              <div className="navBar">
                <ul>
                  {candidate.map((n, v) => (
                    <li
                      key={n.id}
                      className="li"
                      onClick={() => handleActiveState(v)}
                    >
                      <img className="icon" src="profile.png" alt="icon"></img>
                      {n.name}
                    </li> //check why  name isgiving undefined after voting
                  ))}
                </ul>
              </div>
              <p className="candidateDetails">
                <p
                  style={{
                    fontSize: "50px",
                    marginBottom: "5px",
                    marginTop: "5px",
                    color: " #ecae56",
                  }}
                >
                  <b> {candidate[activeCandidateId].name}</b>
                </p>
                <br />
                From <b>{candidate[activeCandidateId].party}</b> Party
                <br />
                No of Vote : {candidate[activeCandidateId].vote}
                <br />
                <img
                  className="president"
                  src={candidate[activeCandidateId].image}
                ></img>
                <br />
                <button className="button" onClick={handleElectionStatus}>
                  End Election
                </button>
              </p>
            </div>
          </div>
          <div className="dialogBox">
            <button
              className="dialogButton"
              onClick={() => {
                setNewElection(true);
                setWinnerId(null);
              }}
            >
              X
            </button>
            <h1>
              {" "}
              Congratulations new president elect {
                candidate[winnerId].name
              }{" "}
              representative of {candidate[winnerId].party} with{" "}
              {candidate[winnerId].vote}
            </h1>
          </div>
        </>
      );
    } else if (newElection || !newForm) {
      return (
        <div className="votingPage">
          <h1 className="heading">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img className="logo" src="voting-logo.jpg" alt="logo" />
              <div className="dynasty">DYNASTY E-VOTING</div>
            </div>
          </h1>
          <div className="div21">
            <div className="VotingStats">
              <img className="logo" src="voting-logo.jpg" alt="logo" />
              <h1> VOTING STATS</h1>
            </div>
          </div>
          <div className="div22">
            <div className="navBar">
              <ul>
                {candidate.map((n, v) => (
                  <li
                    key={n.id}
                    className="li"
                    onClick={() => handleActiveState(v)}
                  >
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
              From {candidate[activeCandidateId].party} Party
              <br />
              No of Vote :{candidate[activeCandidateId].vote}
              <br />
              <img
                className="president"
                src={candidate[activeCandidateId].image}
              ></img>
              <br />
              <button
                className="button"
                onClick={() => {
                  setNewForm(true);
                  setNewElection(false);
                  handleDeleteCandidate;
                }}
              >
                Commence new ELection
              </button>
              <button className="button" onClick={handleLogOut}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      );
    } else if (newForm) {
      return (
        <div className="candidateForm">
          <h1 className="heading">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img className="logo" src="voting-logo.jpg" alt="logo" />
              <div className="dynasty">DYNASTY E-VOTING</div>
            </div>
          </h1>
          <button className="button" onClick={() => setNewElection(true)}>
            back
          </button>
          <img className="logo" src="voting-logo.jpg" alt="logo" />
          <h1>Candidate details</h1>
          <form>
            Candidate Name:
            <input
              onChange={handleCandidateName}
              value={candidateDetails.name}
              className="candidateInput"
              type="textarea"
            ></input>
            Candidate Party:
            <input
              onChange={handleCandidateParty}
              value={candidateDetails.party}
              className="candidateInput"
              type="textarea"
            ></input>
            <br />
            Candidate id:
            <input
              onChange={handleCandidateId}
              value={candidateDetails.id}
              className="candidateInput"
              type="textarea"
            ></input>
            Candidate Image:
            <input
              onChange={handleCandidateImage}
              value={candidateDetails.image}
              className="candidateInput"
              type="textarea"
            ></input>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddCandidate(candidateDetails);
                setCandidateDetails({
                  name: "",
                  party: "",
                  id: "",
                  image: "",
                  vote: 0,
                });
              }}
              className="button"
            >
              {" "}
              Add
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleChangeCandidate();
                setElectionStatus("ongoing");
                setWinnerId(null);
                setActiveCandidateId(0);
                setNewForm(false);
                setNewElection(true);
                setCandidateDetails({
                  name: "",
                  party: "",
                  id: "",
                  image: "",
                  vote: 0,
                });
              }}
              className="button"
              disabled={disable ? false : true}
            >
              start new election
            </button>
          </form>
        </div>
      );
    }
  }
}
const admins = [
  { name: "Christain", no: "admin001", id: 1 },
  { name: "Abel", no: "admin002", id: 2 },
  { name: "stacia", no: "admin003", id: 3 },
];
