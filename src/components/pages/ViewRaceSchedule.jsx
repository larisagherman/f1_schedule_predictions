import React from 'react';
import './ViewRaceSchedule.css';

const ViewRaceSchedule = () => {
  const races = [
    { round: 1, date: "March 2, 2024", name: "Bahrain Grand Prix", circuit: "Bahrain International Circuit" },
    { round: 2, date: "March 9, 2024", name: "Saudi Arabian Grand Prix", circuit: "Jeddah Corniche Circuit" },
    { round: 3, date: "March 24, 2024", name: "Australian Grand Prix", circuit: "Albert Park Circuit" },
    { round: 4, date: "April 7, 2024", name: "Japanese Grand Prix", circuit: "Suzuka International Racing Course" },
    { round: 5, date: "April 21, 2024", name: "Chinese Grand Prix", circuit: "Shanghai International Circuit" },
    { round: 6, date: "May 5, 2024", name: "Miami Grand Prix", circuit: "Miami International Autodrome" },
    { round: 7, date: "May 19, 2024", name: "Emilia Romagna Grand Prix", circuit: "Autodromo Enzo e Dino Ferrari" },
    { round: 8, date: "May 26, 2024", name: "Monaco Grand Prix", circuit: "Circuit de Monaco" },
    { round: 9, date: "June 9, 2024", name: "Canadian Grand Prix", circuit: "Circuit Gilles Villeneuve" },
    { round: 10, date: "June 23, 2024", name: "Spanish Grand Prix", circuit: "Circuit de Barcelona-Catalunya" },
    { round: 11, date: "June 30, 2024", name: "Austrian Grand Prix", circuit: "Red Bull Ring" },
    { round: 12, date: "July 7, 2024", name: "British Grand Prix", circuit: "Silverstone Circuit" },
    { round: 13, date: "July 21, 2024", name: "Hungarian Grand Prix", circuit: "Hungaroring" },
    { round: 14, date: "July 28, 2024", name: "Belgian Grand Prix", circuit: "Circuit de Spa-Francorchamps" },
    { round: 15, date: "August 25, 2024", name: "Dutch Grand Prix", circuit: "Circuit Zandvoort" },
    { round: 16, date: "September 1, 2024", name: "Italian Grand Prix", circuit: "Autodromo Nazionale Monza" },
    { round: 17, date: "September 15, 2024", name: "Singapore Grand Prix", circuit: "Marina Bay Street Circuit" },
    { round: 18, date: "September 22, 2024", name: "United States Grand Prix", circuit: "Circuit of the Americas" },
    { round: 19, date: "October 6, 2024", name: "Qatar Grand Prix", circuit: "Lusail International Circuit" },
    { round: 20, date: "October 20, 2024", name: "Mexican Grand Prix", circuit: "Autodromo Hermanos Rodriguez" },
    { round: 21, date: "October 27, 2024", name: "Brazilian Grand Prix", circuit: "Interlagos Circuit" },
    { round: 22, date: "November 10, 2024", name: "Las Vegas Grand Prix", circuit: "Las Vegas Street Circuit" },
    { round: 23, date: "November 24, 2024", name: "Abu Dhabi Grand Prix", circuit: "Yas Marina Circuit" }
]
;

  return (
    <div className="schedule-page">
      <header className="schedule-header">
        <h1 className="schedule-title">2024 F1 Race Schedule</h1>
        <p className="schedule-subtitle">View all Formula 1 races for the 2024 season</p>
      </header>

      <div className="schedule-card">
        <div className="table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Round</th>
                <th>Date</th>
                <th>Race</th>
                <th>Circuit</th>
              </tr>
            </thead>
            <tbody>
              {races.map((race) => (
                <tr key={race.round}>
                  <td>{race.round}</td>
                  <td>{race.date}</td>
                  <td>{race.name}</td>
                  <td>{race.circuit}</td>
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