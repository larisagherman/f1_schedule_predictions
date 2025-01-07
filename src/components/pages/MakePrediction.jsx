import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import "./MakePrediction.css";

const drivers = [
  "Max Verstappen", "Sergio Perez", "Lewis Hamilton", "George Russell", "Charles Leclerc",
  "Carlos Sainz", "Lando Norris", "Oscar Piastri", "Fernando Alonso", "Lance Stroll",
  "Valtteri Bottas", "Zhou Guanyu", "Esteban Ocon", "Pierre Gasly", "Yuki Tsunoda",
  "Liam Lawson", "Nico Hulkenberg", "Kevin Magnussen", "Alex Albon", "Logan Sargeant"
];


const MakePrediction = () => {
  const [races, setRaces] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [userScore, setUserScore] = useState(0);
  const [savedPredictions, setSavedPredictions] = useState({});
  const database = getDatabase();
  const auth = getAuth();
  const admins = ["eUKYeCJeKUdYMyjKFwHrZ3dBSuO2", "KYm3JGra3pbqWnEepORueDnxzpU2"]; // Replace with actual admin UIDs
  const isAdmin = auth.currentUser && admins.includes(auth.currentUser.uid);
  const [buttonText, setButtonText] = useState("Start"); // Tracks whether the button says 'Start' or 'Stop'


  // Fetch race data and update races
  useEffect(() => {
    const racesRef = ref(database, "races");
    onValue(racesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const racesList = Object.keys(data)
          .map((key) => ({
            round: key,
            ...data[key],
          }))
          .sort((a, b) => a.round - b.round);
        setRaces(racesList);
      }
    });

    // Fetch the current user's score
    const scoreRef = ref(database, `users/${auth.currentUser.uid}/score`);
    onValue(scoreRef, (snapshot) => {
      const score = snapshot.val() || 0;
      setUserScore(score);
    });
  }, [database, auth.currentUser]);

  // Fetch the user's saved predictions
  useEffect(() => {
    const predictionsRef = ref(database, `users/${auth.currentUser.uid}/predictions`);
    onValue(predictionsRef, (snapshot) => {
      const savedPreds = snapshot.val();
      if (savedPreds) {
        setSavedPredictions(savedPreds);
        setPredictions(savedPreds); // Pre-fill the predictions state with saved data
      }
    });
  }, [database, auth.currentUser]);

  const handlePredictionChange = (round, position, driver) => {
    const race = races.find((r) => r.round === round);
    if (race?.canPredict === 1) {
      setPredictions((prev) => ({
        ...prev,
        [round]: {
          ...prev[round],
          [position]: driver,
        },
      }));
    }
  };

  const handleSave = async () => {
    const userId = auth.currentUser.uid;
    const predictionsRef = ref(database, `users/${userId}/predictions`);
    await set(predictionsRef, predictions);
    alert("Your predictions have been saved!");
  };

  const handleStartStop = async () => {
    const racesRef = ref(database, "races");
    const racesSnapshot = await get(racesRef);
    const racesData = racesSnapshot.val();
    if (racesData) {
      Object.keys(racesData).forEach((roundKey) => {
        const raceRef = ref(database, `races/${roundKey}`);
        set(raceRef, {
          ...racesData[roundKey],
          canPredict: buttonText === "Start" ? 1 : 0,
        });
      });
    }
    setButtonText(buttonText === "Start" ? "Stop" : "Start");
  };

  return (
    <div className="prediction-page">
      <header className="prediction-header">
        <h1 className="prediction-title">Make Your Predictions</h1>
        <p className="prediction-subtitle">Select the top 3 drivers for each race</p>
      </header>

      <div className="prediction-card">
        <div className="table-container">
          <table className="prediction-table">
            <thead>
              <tr>
                <th>Round</th>
                <th>Date</th>
                <th>Race</th>
                <th>Circuit</th>
                <th>1st Place</th>
                <th>2nd Place</th>
                <th>3rd Place</th>
              </tr>
            </thead>
            <tbody>
              {races.map((race) => (
                <tr key={race.round}>
                  <td>{race.round}</td>
                  <td>{race.date}</td>
                  <td>{race.name}</td>
                  <td>{race.circuit}</td>
                  <td>
                    <select
                      value={predictions[race.round]?.first || ""}
                      onChange={(e) => handlePredictionChange(race.round, "first", e.target.value)}
                      className="driver-select"
                      disabled={race.canPredict !== 1}
                    >
                      <option value="" disabled>
                        Select a driver
                      </option>
                      {drivers.map((driver) => (
                        <option key={driver} value={driver}>
                          {driver}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={predictions[race.round]?.second || ""}
                      onChange={(e) => handlePredictionChange(race.round, "second", e.target.value)}
                      className="driver-select"
                      disabled={race.canPredict !== 1}
                    >
                      <option value="" disabled>
                        Select a driver
                      </option>
                      {drivers.map((driver) => (
                        <option key={driver} value={driver}>
                          {driver}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={predictions[race.round]?.third || ""}
                      onChange={(e) => handlePredictionChange(race.round, "third", e.target.value)}
                      className="driver-select"
                      disabled={race.canPredict !== 1}
                    >
                      <option value="" disabled>
                        Select a driver
                      </option>
                      {drivers.map((driver) => (
                        <option key={driver} value={driver}>
                          {driver}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="button-container">
        {isAdmin && (
          <button onClick={handleStartStop} className="start-stop-button">
            {buttonText}
          </button>
        )}
        <button onClick={handleSave} className="save-button">
          Save Predictions
        </button>
      </div>

      <div className="score-container">
        <h2>Your Current Score: {userScore}</h2>
      </div>
    </div>
  );
};

export default MakePrediction;
