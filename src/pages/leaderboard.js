import React, { useState, useEffect } from 'react';
import { StyledDiv } from '../components/Leaderboard/leaderboardStyles';
import NavBar from '../NavBar';
import styled from "styled-components";



const API_URL = process.env.API_URL


const StyledRanking = styled.td`
  text-align: center;
`;



const Leaderboard = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch(`${API_URL}/leaderboard`);
      const data = await response.json();
      setDocs(data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div>
        <NavBar />
        <StyledDiv>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>URL</th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc, index) => (
            <tr key={doc.url} >
              <td>{index + 1}</td>
              <td><a href={doc.url} >link</a></td>
              <StyledRanking>{doc.ranking}</StyledRanking>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledDiv>
    </div>
   
  );
};

export default Leaderboard;
