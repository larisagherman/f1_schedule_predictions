import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import getAuth
import { database, ref, get } from '../../firebase'; // Import database functions

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedInUserUid, setLoggedInUserUid] = useState(null); // State to hold logged-in user UID

  useEffect(() => {
    const auth = getAuth(); // Get Auth instance
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUserUid(user.uid);
      } else {
        console.log('No user logged in');
      }
    });

    // Fetch leaderboard data
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);

        const usersRef = ref(database, 'users');
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
          const data = [];
          snapshot.forEach((userSnapshot) => {
            const userData = userSnapshot.val();
            data.push({
              uid: userSnapshot.key,
              score: userData.score,
              predictions: userData.predictions || [],
            });
          });

          // Sort by score
          data.sort((a, b) => b.score - a.score);
          setLeaderboardData(data);
        } else {
          setError('No leaderboard data found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        setError('Failed to load leaderboard data.');
        setLoading(false);
      }
    };

    fetchLeaderboardData();

    // Clean up on unmount
    return () => unsubscribe();

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="leaderboard-page">
      <header className="leaderboard-header">
        <h1 className="leaderboard-title">Leaderboard</h1>
        <p className="leaderboard-subtitle">
          See how you stack up against other F1 fans in predicting race outcomes!
        </p>

        {loggedInUserUid && (
          <p className="uid-text">
            Your Username (UID): {loggedInUserUid}
          </p>
        )}
      </header>

      <section className="leaderboard-section">
        <h2 className="section-title">Top Players</h2>
        <div className="leaderboard-container">
          <div className="leaderboard-row header">
            <div className="leaderboard-item rank">Rank</div>
            <div className="leaderboard-item username">Username (UID)</div>
            <div className="leaderboard-item score">Score</div>
          </div>

          {leaderboardData.map((player, index) => (
            <div
              key={index}
              className={`leaderboard-row ${player.uid === loggedInUserUid ? 'highlight' : ''}`}
            >
              <div className="leaderboard-item rank">{index + 1}</div>
              <div className="leaderboard-item username">{player.uid}</div>
              <div className="leaderboard-item score">{player.score}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
