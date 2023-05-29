import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  background: linear-gradient(to bottom right, #6CC799, #22A5C4);
  `;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

const StyledLabel = styled.label`
  display: block;
  margin-top: 20px;
`;

const StyledSelect = styled.select`
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

const StyledButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  background-color: #FFF;
  color: #6CC799;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Line = styled.hr`
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
  margin-top: 10px;
  margin-bottom: 20px;
`;

module.exports = {Line, StyledButton, StyledSelect, StyledDiv, StyledForm, StyledInput, StyledLabel}