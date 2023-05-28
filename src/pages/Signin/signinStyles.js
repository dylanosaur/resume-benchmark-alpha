import styled from 'styled-components';


const StyledSignIn = styled.div`
  text-align: center;
  font-family: Arial;

  h2 {
    margin-top: 0;
  }

  label {
    display: block;
    margin: 10px 0;
  }

  input {
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  button {
    background-color: lightgreen;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .toggle {
    margin-top: 20px;
  }

  .forgot-password {
    margin-top: 10px;
    text-decoration: underline;
    cursor: pointer;
  }
`;

module.exports = {StyledSignIn}