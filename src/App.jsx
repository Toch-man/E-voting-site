import { useRef, useState } from "react";
import "./App.css";
import AdminPage from "./admin";
import Vote from "./vote";

function HomePage({ Vote, Admin }) {
  const [stepIndex, setStepIndex] = useState(0);
  const steps = [
    "Click on the Vote Button",
    "Fill in the form with valid details",
    "Select your candidate in the navigation bar",
    "Click the vote button and log out",
  ];
  return (
    <div>
      <h1 className="heading">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img className="logo" src="voting-logo.jpg" alt="logo" />
          <div className="dynasty">DYNASTY E-VOTING</div>
        </div>
        <div className="div3">
          <button
            className="Adbutton"
            style={{ backgroundColor: "#ecae56" }}
            onClick={Admin}
          >
            {" "}
            ADMIN
          </button>
        </div>
      </h1>
      <div className="homePage">
        <h1 className="div1">
          {" "}
          <span
            style={{
              color: "#ecae56",
              fontSize: "35px",
            }}
          >
            WELCOME to <br />
          </span>{" "}
          Dynasty E-VOTING
          <p className="subdiv1">Make your vote count</p>
        </h1>
        <div className="div2">
          <img className="homeLogo" src="voting-logo.jpg" alt="logo" />
          <button className="Votebutton" onClick={Vote}>
            {" "}
            VOTE
          </button>
        </div>
        <div className="div3">
          <img src="vote.jpg" alt="voting" className="homeLogo2"></img>
        </div>
      </div>
      <div className="votingGuide">
        "Voting is not just a right; it's a privilege and a responsibility.
        <br />
        Within our society, every decision we make shapes our collective future.
        <br />
        When you cast your vote, you are not just selecting a leader or a<br />
        policy—you are choosing the direction of our community, the values we
        <br />
        uphold, and the progress we strive for. True change begins with
        <br />
        participation, and every voice matters. Stand up, be heard, and take
        <br />
        part in shaping the future of our organization!"
        <br />
      </div>
      <div className="imageSlide">
        <button
          disabled={stepIndex == 0 ? true : false}
          onClick={() => setStepIndex(stepIndex - 1)}
          className="stepsNav"
        >
          {" "}
          &lt;
        </button>
        <>{steps[stepIndex]}</>
        <button
          disabled={stepIndex == 3 ? true : false}
          onClick={() => setStepIndex(stepIndex + 1)}
          className="stepsNav"
        >
          &gt;
        </button>
      </div>
      <footer className="footer">
        <div className="upperFoot">
          <div className="footer1">
            <img className="logo" src="voting-logo.jpg" alt="logo" />
            <br></br>
            <span
              className="footerP"
              style={{
                color: "white",
                fontSize: "20px",
                fontStyle: "italic",
                fontWeight: "bolder",
              }}
            >
              The royal road to luxury
            </span>
          </div>
          <div className="footer2">
            <h1
              style={{
                color: "white",
                fontSize: "20px",
                fontStyle: "italic",
                fontWeight: "bolder",
              }}
            >
              SPONSORS
            </h1>
            <div className="sponsors">
              <div style={{ marginRight: "40px" }}>
                <p>
                  <img
                    src="flutterwave.png"
                    alt="flutter"
                    style={{ height: "30px", width: "150px", margin: "10px" }}
                  ></img>
                </p>
                <p>
                  <img
                    src="interswitch.png"
                    alt="interswitch"
                    style={{ height: "30px", width: "150px", margin: "10px" }}
                  ></img>
                </p>
              </div>
              <div style={{ marginRight: "40px" }}>
                {" "}
                <p>
                  <img
                    src="andela.png"
                    alt="andela"
                    style={{
                      height: "30px",
                      width: "150px",
                      margin: "10px",
                      filter: "invert(100%)",
                    }}
                  ></img>
                </p>
                <p>
                  <img
                    src="fintech.png"
                    alt="fintechs"
                    style={{ height: "30px", width: "150px", margin: "10px" }}
                  ></img>
                </p>
              </div>
              <div>
                <p>
                  <img
                    src="flutterwave.png"
                    alt="flutter"
                    style={{ height: "30px", width: "150px", margin: "10px" }}
                  ></img>
                </p>
                <p>
                  <img
                    src="interswitch.png"
                    alt="interswitch"
                    style={{ height: "30px", width: "150px", margin: "10px" }}
                  ></img>
                </p>
              </div>
            </div>
          </div>
          <div className="footer3">
            <img className="logo" src="voting-logo.jpg" alt="logo" />
            <br></br>
            <span
              className="footerP"
              style={{
                color: "white",
                fontSize: "20px",
                fontStyle: "italic",
                fontWeight: "bolder",
              }}
            >
              The royal road to luxury
            </span>
          </div>
        </div>
        <div className="lowerFoot">
          <div className="socialIcon">
            <a className="footerP">
              <img src="facebook.png" alt="facebook" className="socials"></img>
            </a>
            <a className="footerP">
              <img src="twitter.png" alt="x" className="socials"></img>
            </a>
            <a className="footerP">
              <img src="whatsapp.png" alt="whatsapp" className="socials"></img>
            </a>
            <a className="footerP">
              <img
                src="instagram.png"
                alt="instagram"
                className="socials"
              ></img>
            </a>
          </div>
          <p
            style={{
              color: "white",
              fontSize: "20px",
              fontStyle: "italic",
              fontWeight: "bolder",
            }}
          >
            {" "}
            @Copyright All right reserved{" "}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [candidate, setCandidate] = useState([
    {
      name: "Kluivert Edward",
      party: "lpc",
      image: "president1.jpg",
      id: 0,
      vote: 0,
    },
    {
      name: "Micheal simons",
      party: "adc",
      image: "president2.jpg",
      id: 1,
      vote: 0,
    },
    {
      name: "Samuel jackson",
      party: "hol",
      image: "president3.jpg",
      id: 2,
      vote: 0,
    },
    {
      name: "Ryan dobrev",
      party: "vad",
      image: "president4.jpg",
      id: 3,
      vote: 0,
    },
    {
      name: "Gerald odin",
      party: "thr",
      image: "president5.jpg",
      id: 4,
      vote: 0,
    },
  ]);
  const [userStatus, setUserStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [electionStatus, setElectionStatus] = useState("ongoing");
  const newCandidates = useRef([]);
  let updatedV;

  function onChangeElectionStatus() {
    if (electionStatus === "ongoing") {
      setElectionStatus("ended");
    } else if (electionStatus === "ended") {
      setElectionStatus("ongoing");
    }
  }

  function onVote(i) {
    let voted = candidate.map((c, j) => {
      if (i === j) {
        return { ...c, vote: c.vote + 1 };
      } else return c;
    });

    localStorage.setItem("updatedVotes", JSON.stringify(voted));
    updatedV = JSON.parse(localStorage.getItem("updatedVotes"));
    setCandidate(updatedV);
  }
  function onChangeCandidate() {
    localStorage.setItem("updatedVotes", JSON.stringify(newCandidates.current));
    updatedV = JSON.parse(localStorage.getItem("updatedVotes"));
    setCandidate(updatedV);
    newCandidates.current = [];
    setDisabled(false);
  }
  function onAddCandidate(candidateInfo) {
    let validilityStatus = true;
    let details = [
      candidateInfo.name,
      candidateInfo.party,
      candidateInfo.id,
      candidateInfo.image,
    ];
    for (let i = 0; i < details.length; i++) {
      if (details[i] === "") {
        validilityStatus = false;
      } else {
        continue;
      }
    }
    if (validilityStatus) {
      newCandidates.current.push(candidateInfo);
      if (newCandidates.current.length > 1) {
        setDisabled(true);
      }
    }
  }
  function onSortCandidate(sortedCandidate) {
    setCandidate(sortedCandidate);
    localStorage.setItem("updatedVotes", JSON.stringify(sortedCandidate));
  }
  function onDeleteCandidate() {
    setCandidate(newCandidates.current);
    localStorage.removeItem("updatedVotes");
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
        electionStatus={electionStatus}
        candidate={candidate}
        handleVote={onVote}
        handleHomePage={onHomePage}
      />
    );
  }
  if (userStatus === "admin") {
    return (
      <AdminPage
        electionStatus={electionStatus}
        handleElectionStatus={onChangeElectionStatus}
        candidate={
          JSON.parse(localStorage.getItem("updatedVotes")) || candidate
        }
        handleHomePage={onHomePage}
        handleSortCandiates={onSortCandidate}
        handleChangeCandidate={onChangeCandidate}
        handleAddCandidate={onAddCandidate}
        handleDeleteCandidate={onDeleteCandidate}
        disable={disabled}
      />
    );
  }
}
