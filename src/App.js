import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function App() {
  const [data, setData] = useState([]); 
  const [selectedInterview, setSelectedInterview] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/applications') 
         .then(response => setData(response.data))
         .catch(error => console.error('There was an error!', error));
  }, []); 

  const handleInterviewClick = interview => {
    setSelectedInterview(interview);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  function formatDateWithSeconds(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const StyledButton = styled.button`
    background-color: #66bb6a;
    color: white;
    padding: 6px 10px;
    margin: 4px 2px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #45a049;
    }
  `;

  const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
  `;

  const StyledTable = styled.table`
    max-width: 60%;
    margin: 20px auto;
    margin-top: 50px;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #ddd;
    width: 100%;
    @media (max-width: 600px) {
      max-width: 100%;
      display: block;
      overflow-x: auto;
    }
  `;

  const StyledTableHeader = styled.th`
    background-color: #4CAF50;
    color: white;
    padding: 12px 15px;
    text-align: left;
    font-family: 'Arial', sans-serif;
  `;

  const StyledTableRow = styled.tr`
    &:nth-child(even) {
      background-color: #f2f2f2;
    }

    &:hover {
      background-color: #ddd;
    }
  `;


  const StyledTableCell = styled.td`
    padding: 10px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  `;

  const Popup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
    z-index: 1000;
    min-width: 300px;
    font-family: 'Arial', sans-serif;
  `;

  const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  `;

  function InterviewPopup({ interview, onClose }) {
    return (
      <>
        <Overlay onClick={onClose} />
        <Popup>
          <h2>Interview Details</h2>

          <p>Id: {interview.id}</p>
          <p>Interview state: {interview.interviewState}</p>
          <p>Interview time: {formatDate(interview.interviewTime)}</p>
          <p>Interviewer name: {interview.interviewerName}</p>
          <p>Interview type: {interview.interviewType}</p>
          <p>Updated on: {formatDateWithSeconds(interview.updatedOn)}</p>

          <ButtonContainer>
            <StyledButton onClick={onClose}>Close</StyledButton>
          </ButtonContainer>
        </Popup>
      </>
    );
  }
  return (
    <div>
      <StyledTable>
        <thead>
          <StyledTableRow>
            <StyledTableHeader>ID</StyledTableHeader>
            <StyledTableHeader>Application state</StyledTableHeader>
            <StyledTableHeader>Candidate</StyledTableHeader>
            <StyledTableHeader>Updated on</StyledTableHeader>
            <StyledTableHeader>Interviews</StyledTableHeader>
          </StyledTableRow>
        </thead>
        <tbody>
          {data.map(item => (
            <StyledTableRow key={item.id}>
              <StyledTableCell>{item.id}</StyledTableCell>
              <StyledTableCell>{item.applicationState}</StyledTableCell>
              <StyledTableCell>{`${item.candidate.firstName} ${item.candidate.lastName}`}</StyledTableCell>
              <StyledTableCell>{formatDateWithSeconds(item.updatedOn)}</StyledTableCell>
              <StyledTableCell>
                {item.interviews.map((interview, index) => (
                <StyledButton key={index} onClick={() => handleInterviewClick(interview)}>
                  {interview.interviewType}
                </StyledButton>
                ))}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </tbody>
      </StyledTable>
      {selectedInterview && (
      <InterviewPopup
        interview={selectedInterview}
        onClose={() => setSelectedInterview(null)}
      />
    )}
    </div>
  );


}

export default App;