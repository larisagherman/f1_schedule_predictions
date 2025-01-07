import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import app from '../../firebase';
import './ViewRaceSchedule.css';

const ViewRaceSchedule = () => {
  const [races, setRaces] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newRace, setNewRace] = useState({
    round: '',
    date: '',
    name: '',
    circuit: '',
    winner: 'N/A',
    second: 'N/A',
    third: 'N/A',
  });
  const [editingRace, setEditingRace] = useState(null);
  const [drivers, setDrivers] = useState([
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
    'Logan Sargeant',
  ]);

  const database = getDatabase(app);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && ['amihut12@gmail.com', 'gherman.larisa3@gmail.com'].includes(user.email)) {
        setIsAdmin(true);
      }
    });

    const racesRef = ref(database, 'races');
    const unsubscribeDB = onValue(racesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const racesList = Object.values(data)
          .filter((race) => race.round && race.name && race.circuit) // Filter valid entries
          .sort((a, b) => a.round - b.round); // Sort by round number
        setRaces(racesList);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeDB();
    };
  }, [database]);

  const isValidRaceInput = (race) => {
    if (isNaN(race.round)) {
      alert('Round must be a number.');
      return false;
    }
    if (!Date.parse(race.date)) {
      alert('Invalid date format.');
      return false;
    }
    if (!race.name.trim() || !race.circuit.trim()) {
      alert('Race Name and Circuit cannot be empty.');
      return false;
    }
    return true;
  };

  const handleAddRace = async () => {
    if (!isValidRaceInput(newRace)) return;

    const raceKey = `round${newRace.round}`;
    const raceRef = ref(database, `races/${raceKey}`);
    const snapshot = await get(raceRef);

    if (snapshot.exists()) {
      alert('A race with this round already exists. Please use a unique round number.');
      return;
    }

    await set(raceRef, { ...newRace, isEnded: 0 }); // Set isEnded to 0 initially
    setNewRace({
      round: '',
      date: '',
      name: '',
      circuit: '',
      winner: 'N/A',
      second: 'N/A',
      third: 'N/A',
    });
  };

  const handleEdit = (race) => {
    setEditingRace({ ...race });
  };

  const handleSave = async () => {
    if (editingRace) {
      await set(ref(database, `races/round${editingRace.round}`), editingRace);
      setEditingRace(null);
    }
  };

  const handleEndRace = async (race) => {
    // Update the isEnded field in the database
    await set(ref(database, `races/round${race.round}/isEnded`), 1);
    alert(`Race Round ${race.round} has been ended!`);
  };

  const handleCancelEdit = () => {
    setEditingRace(null);
  };

  return (
    <div className="schedule-page">
      <header className="schedule-header">
        <h1 className="schedule-title">2024 F1 Race Schedule</h1>
        <p className="schedule-subtitle">View all Formula 1 races for the 2024 season</p>
      </header>

      {isAdmin && (
        <div className="schedule-card">
          <h2 className="add-title">Add New Race</h2>
          <div className="add-race-fields">
            <input
              type="number"
              placeholder="Round"
              value={newRace.round}
              onChange={(e) => setNewRace({ ...newRace, round: e.target.value })}
            />
            <input
              type="date"
              placeholder="Date"
              value={newRace.date}
              onChange={(e) => setNewRace({ ...newRace, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Race Name"
              value={newRace.name}
              onChange={(e) => setNewRace({ ...newRace, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Circuit"
              value={newRace.circuit}
              onChange={(e) => setNewRace({ ...newRace, circuit: e.target.value })}
            />
            <button onClick={handleAddRace} className="add-button">
              Add
            </button>
          </div>
        </div>
      )}

      <div className="schedule-card">
        <div className="table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Round</th>
                <th>Date</th>
                <th>Race</th>
                <th>Circuit</th>
                <th>Winner</th>
                <th>Second</th>
                <th>Third</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {races.map((race) => (
                <tr key={race.round}>
                  {editingRace && editingRace.round === race.round ? (
                    <>
                      <td>{race.round}</td>
                      <td>
                        <input
                          value={editingRace.date}
                          onChange={(e) => handleChange(e, 'date')}
                        />
                      </td>
                      <td>
                        <input
                          value={editingRace.name}
                          onChange={(e) => handleChange(e, 'name')}
                        />
                      </td>
                      <td>
                        <input
                          value={editingRace.circuit}
                          onChange={(e) => handleChange(e, 'circuit')}
                        />
                      </td>
                      <td>
                        <select
                          value={editingRace.winner}
                          onChange={(e) => handleChange(e, 'winner')}
                        >
                          <option value="N/A">N/A</option>
                          {drivers.map((driver) => (
                            <option key={driver} value={driver}>
                              {driver}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          value={editingRace.second}
                          onChange={(e) => handleChange(e, 'second')}
                        >
                          <option value="N/A">N/A</option>
                          {drivers.map((driver) => (
                            <option key={driver} value={driver}>
                              {driver}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          value={editingRace.third}
                          onChange={(e) => handleChange(e, 'third')}
                        >
                          <option value="N/A">N/A</option>
                          {drivers.map((driver) => (
                            <option key={driver} value={driver}>
                              {driver}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{race.round}</td>
                      <td>{race.date}</td>
                      <td>{race.name}</td>
                      <td>{race.circuit}</td>
                      <td>{race.winner}</td>
                      <td>{race.second}</td>
                      <td>{race.third}</td>
                      {isAdmin && (
                        <td>
                          <button onClick={() => handleEdit(race)}>Edit</button>
                          <button onClick={() => handleEndRace(race)} disabled={race.isEnded === 1}>
                            End
                          </button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewRaceSchedule;
