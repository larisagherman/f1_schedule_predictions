import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth"; // Importing Firebase Auth
import "./MakePrediction.css";

const MakePrediction = () => {
  const [races, setRaces] = useState([]); // Stores the list of races
  const [predictions, setPredictions] = useState({}); // Stores the user's predictions
  const [userScore, setUserScore] = useState(0); // Stores the user's score
  const [actualResults, setActualResults] = useState({}); // Stores the actual race results
  const [savedPredictions, setSavedPredictions] = useState({}); // Stores the saved predictions for the user
  const database = getDatabase();
  const auth = getAuth(); // Firebase Authentication instance

  // Fetch race data from Firebase
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

  // Fetch the user's previously saved predictions
  useEffect(() => {
    const predictionsRef = ref(database, `users/${auth.currentUser.uid}/predictions`);
    onValue(predictionsRef, (snapshot) => {
      const savedPreds = snapshot.val();
      if (savedPreds) {
        setSavedPredictions(savedPreds);
        setPredictions(savedPreds); // Pre-fill the predictions state with saved data
      }
    });

    // Fetch actual results for each race (this should come from the backend or some API)
    const actualResultsRef = ref(database, "races");
    onValue(actualResultsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setActualResults(data);
      }
    });
  }, [database, auth.currentUser]);

  const handlePredictionChange = (round, position, driver) => {
    setPredictions((prev) => ({
      ...prev,
      [round]: {
        ...prev[round],
        [position]: driver,
      },
    }));
  };

  const handleSave = async () => {
    const userId = auth.currentUser.uid; // Get the current logged-in user ID

    // Save the predictions under the current user's node
    const predictionsRef = ref(database, `users/${userId}/predictions`);
    await set(predictionsRef, predictions);

    // Calculate and update the score
    let score = 0;

    // Iterate over races and compare predictions with actual results
    Object.keys(predictions).forEach((round) => {
      const userPrediction = predictions[round];
      const result = "round"+round;                   //NU AM NICIO IDEE CE II AICI
      const actualResult = actualResults[result];
      console.log(predictions[round]);

      if (actualResult) {
        // Compare and increment score for correct predictions
        console.log("randomvbulasutfo");
        if (userPrediction.first === actualResult.winner) score++;
        if (userPrediction.second === actualResult.second) score++;
        if (userPrediction.third === actualResult.third) score++;
      }
    });

    // Save the updated score to the database
    const scoreRef = ref(database, `users/${userId}/score`);
    await set(scoreRef, score);

    // Update the local score state
    setUserScore(score);

    // Also update the saved predictions state
    setSavedPredictions(predictions);

    alert("Your predictions have been saved, and your score has been updated!");
  };

  const drivers = [
    'Max Verstappen',
    'Sergio Perez',
    'Lewis Hamilton',
    'George Russell',
    'Charles Leclerc',
    'Carlos Sainz',
    'Lando Norris',
    'Oscar Piastri',
    'Fernando Alonso',
    'Lance Stroll',
    'Valtteri Bottas',
    'Zhou Guany',
    'Esteban Ocon',
    'Pierre Gasly',
    'Yuki Tsunoda',
    'Liam Lawson',
    'Nico Hulkenberg',
    'Kevin Magnussen',
    'Alex Albon',
    'Logan Sargeant'
  ];

  return (
    <div className="prediction-page">
      <header className="prediction-header">
        <h1 className="prediction-title">Make Your Predictions</h1>
        <p className="prediction-subtitle">Select the top 3 drivers for each race in the 2024 F1 season</p>
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
                    >
                      <option value="" disabled>Select a driver</option>
                      {drivers.map((driver) => (
                        <option key={driver} value={driver}>{driver}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={predictions[race.round]?.second || ""}
                      onChange={(e) => handlePredictionChange(race.round, "second", e.target.value)}
                      className="driver-select"
                    >
                      <option value="" disabled>Select a driver</option>
                      {drivers.map((driver) => (
                        <option key={driver} value={driver}>{driver}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={predictions[race.round]?.third || ""}
                      onChange={(e) => handlePredictionChange(race.round, "third", e.target.value)}
                      className="driver-select"
                    >
                      <option value="" disabled>Select a driver</option>
                      {drivers.map((driver) => (
                        <option key={driver} value={driver}>{driver}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="save-button-container">
        <button onClick={handleSave} className="save-button">Save Predictions</button>
      </div>

      <div className="score-container">
        <h2>Your Current Score: {userScore}</h2>
      </div>

      {/* Displaying the saved predictions */}
      <div className="saved-predictions">
        <h3>Saved Predictions:</h3>
        {Object.keys(savedPredictions).length > 0 ? (
          <ul>
            {races.map((race) => (
              <li key={race.round}>
                <strong>Round {race.round}:</strong> 
                1st: {savedPredictions[race.round]?.first || "N/A"}, 
                2nd: {savedPredictions[race.round]?.second || "N/A"}, 
                3rd: {savedPredictions[race.round]?.third || "N/A"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No predictions saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default MakePrediction;
