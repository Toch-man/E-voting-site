import { useState } from "react";
export default function AdminPage({
  electionStatus,
  handleElectionStatus,
  candidate,
  handleHomePage,
  handleChangeCandidate,
  handleAddCandidate,
  handleDeleteCandidate,
  handleSortCandiates,
  disable,
}) {
  const [candidateDetails, setCandidateDetails] = useState({
    name: "",
    party: "",
    id: "",
    image: null,
    vote: 0,
  });
  const [verifiedAdmin, setVerifiedAdmin] = useState(false);
  const [adminID, setadminID] = useState("");
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
  function handleFileChange(event) {
    const file = event.target.files[0];
    console.log(file.name);
    setCandidateDetails({ ...candidateDetails, image: file.name });
  }

  function handleElectionWinner() {
    let sortedCandidate = [...candidate];
    for (let i = 0; i < sortedCandidate.length - 1; i++) {
      for (let j = i + 1; j < sortedCandidate.length; j++) {
        if (sortedCandidate[i].vote > sortedCandidate[j].vote) {
          let swap = sortedCandidate[i];
          sortedCandidate[i] = sortedCandidate[j];
          sortedCandidate[j] = swap;
        }
      }
      i;
    }
    setWinnerId(sortedCandidate.length - 1);
    handleSortCandiates(sortedCandidate);
    handleElectionStatus();
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
    if (electionStatus === "ongoing" && !newForm && !winnerId) {
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
              <div className="candidateDetails">
                <h1
                  style={{
                    fontSize: "50px",
                    marginBottom: "5px",
                    marginTop: "5px",
                    color: " #ecae56",
                  }}
                >
                  <b> {candidate[activeCandidateId].name}</b>
                </h1>
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
                <button className="button" onClick={handleElectionWinner}>
                  End Election
                </button>
              </div>
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
              <div className="candidateDetails">
                <h1
                  style={{
                    fontSize: "50px",
                    marginBottom: "5px",
                    marginTop: "5px",
                    color: " #ecae56",
                  }}
                >
                  <b> {candidate[activeCandidateId].name}</b>
                </h1>
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
                <button
                  className="button"
                  onClick={handleElectionWinner}
                  disabled={true}
                >
                  End Election
                </button>
              </div>
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
              <h1
                style={{
                  fontSize: "50px",
                  marginBottom: "5px",
                  marginTop: "5px",
                  color: " #ecae56",
                }}
              >
                <b>{candidate[activeCandidateId].name}</b>
                {candidate[activeCandidateId].name}
              </h1>
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
                  handleElectionStatus();
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
              type="file"
              onChange={handleFileChange}
              name={candidate.image}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddCandidate(candidateDetails);
                setCandidateDetails({
                  name: "",
                  party: "",
                  id: "",
                  image: null,
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
                handleDeleteCandidate();
                handleChangeCandidate();
                setWinnerId(null);
                setActiveCandidateId(0);
                setNewForm(false);
                setNewElection(true);
                setCandidateDetails({
                  name: "",
                  party: "",
                  id: "",
                  image: null,
                  vote: 0,
                });
                localStorage.removeItem("voteIds");
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
