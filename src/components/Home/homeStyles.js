import styled from 'styled-components';

export const StyledDiv = styled.div`
  text-align: center;
  font-family: Arial;
  background: linear-gradient(to bottom, rgb(0, 255, 162), rgb(0, 162, 255));
  height: 100%;
  width: 100%;
  global: true;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 10px;
  width: 60%;
  margin: auto;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #000000;
  `;

const Line = styled.hr`
  width: 80%;
  border: none;
  display: flex;
  justify-content: center;
  margin: 2rem auto;
  border: 5px solid rgb(60, 60, 60);
`;

const ImageCardContainer = styled.div`
  flex: 1;
  margin: 10px 10px;
  width: 50%;
  max-width: 600px;
  max-height: 600px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column; /* Add this line to set flex-direction to column */
  align-items: center;
  overflow: hidden;
  border: 1px solid black;
  border-radius: 10px; /* Rounded corners */
  overflow: hidden; /* Hide the overflowing content */
  background-color: rgb(230, 230, 230);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); /* Add this line to create a shadow behind the card */
  @media screen and (max-width: 1200px) { /* Add a media query for smaller screens */
    min-width: 240px; /* Reduce the width of the card */
    max-height: 240px; /* Remove the max-height constraint */
  }

`;

export const ImageCardButton = styled.button`
  background-color: rgb(120, 120, 120);
  color: white;
  border-radius: 10px; /* Rounded corners */
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

`;

module.exports = {StyledDiv, ImageCardContainer, Line, ImageCardButton, Title, TitleContainer};
