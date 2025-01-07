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
    const admins = ["eUKYeCJeKUdYMyjKFwHrZ3dBSuO2", "KYm3JGra3pbqWnEepORueDnxzpU2"]; // Replace with your admin UIDs
    const isAdmin = auth.currentUser && admins.includes(auth.currentUser.uid);
    const [buttonText, setButtonText] = useState("Start");

    const calculateScore = (predictions, races) => {
        let score = 0;
        Object.keys(predictions).forEach(round => {
            const race = races.find(r => r.round === round);
            if (race) {
                if (predictions[round]?.first === race.winner) score += 1;
                if (predictions[round]?.second === race.second) score += 1;
                if (predictions[round]?.third === race.third) score += 1;
            }
        });
        return score;
    };

    const updateUserScore = async (newScore) => {
        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            const userScoreRef = ref(database, `users/${userId}/score`);
            await set(userScoreRef, newScore);
        }
    };

    useEffect(() => {
        const racesRef = ref(database, "races");
        const unsubscribeRaces = onValue(racesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const racesList = Object.keys(data).map((key) => ({
                    round: key,
                    ...data[key],
                    isEnded: data[key].isEnded === 1,
                    canPredict: data[key].canPredict || 0,
                })).sort((a, b) => a.round - b.round);
                setRaces(racesList);

                if (auth.currentUser && savedPredictions) {
                    const newScore = calculateScore(savedPredictions, racesList);
                    updateUserScore(newScore);
                    setUserScore(newScore);
                }
            } else {
                setRaces([]);
            }
        });

        if (auth.currentUser) {
            const scoreRef = ref(database, `users/${auth.currentUser.uid}/score`);
            const unsubscribeScore = onValue(scoreRef, (snapshot) => {
                const score = snapshot.val() || 0;
                setUserScore(score);
            });
            return () => {
                unsubscribeScore();
            };
        }
        return () => {
            unsubscribeRaces();
        };
    }, [database, auth.currentUser, savedPredictions]);

    useEffect(() => {
        if (auth.currentUser) {
            const predictionsRef = ref(database, `users/${auth.currentUser.uid}/predictions`);
            const unsubscribePredictions = onValue(predictionsRef, (snapshot) => {
                const savedPreds = snapshot.val();
                if (savedPreds) {
                    setSavedPredictions(savedPreds);
                    setPredictions(savedPreds);
                } else {
                    setSavedPredictions({});
                    setPredictions({});
                }
            });
            return () => {
                unsubscribePredictions();
            };
        }
    }, [database, auth.currentUser]);

    const handlePredictionChange = (round, position, driver) => {
        const race = races.find((r) => r.round === round);
        if (race?.canPredict === 1 && !race?.isEnded) {
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
        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            const predictionsRef = ref(database, `users/${userId}/predictions`);
            await set(predictionsRef, predictions);

            const newScore = calculateScore(predictions, races);
            await updateUserScore(newScore);
            setUserScore(newScore);
            alert("Your predictions have been saved!");
        } else {
            alert("You must be logged in to save predictions.");
        }
    };

    const handleStartStop = async () => {
        const racesRef = ref(database, "races");
        const racesSnapshot = await get(racesRef);
        const racesData = racesSnapshot.val();
        if (racesData) {
            for (const roundKey in racesData) {
                if (!racesData[roundKey].isEnded) {
                    const raceRef = ref(database, `races/${roundKey}`);
                    await set(raceRef, {
                        ...racesData[roundKey],
                        canPredict: buttonText === "Start" ? 1 : 0,
                    });
                }
            }
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
                <th>Status</th>
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
                      disabled={race.canPredict !== 1 || race.isEnded}
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
                      disabled={race.canPredict !== 1 || race.isEnded}
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
                      disabled={race.canPredict !== 1 || race.isEnded}
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
                    {race.isEnded ? (
                      <span className="status-ended">Ended</span>
                    ) : race.canPredict === 1 ? (
                      <span className="status-open">Open</span>
                    ) : (
                      <span className="status-closed">Closed</span>
                    )}
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