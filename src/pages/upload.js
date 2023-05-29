import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../NavBar'
import {Line, StyledButton, StyledSelect, StyledDiv, StyledForm, StyledInput, StyledLabel} from '../components/Upload/uploadStyles'
const API_URL = process.env.API_URL; // replace with your API URL

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [newJob, setNewJob] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/all_jobs`)
      .then((response) => {
        let jobList = response.data.data
        setJobs(jobList)
        console.log(jobList)
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleJobChange = (event) => {
    setSelectedJob(event.target.value);
    console.log('job set to', event.target.value)
  };

  const handleNewJobChange = (event) => {
    setNewJob(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile || (!selectedJob && !newJob)) return;
    setSubmitting(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("job", selectedJob || newJob);
    try {
      await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSelectedFile(null);
      setSelectedJob("");
      setNewJob("");
      alert("File uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Error uploading file.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
    <Navbar />
    <StyledDiv>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Upload a File</h2>
        <Line />
        <StyledInput type="file" onChange={handleFileChange} />
        <StyledDiv marginTop="20px">
          <StyledLabel htmlFor="job">Select a job:</StyledLabel>
          <StyledSelect id="job" name="job" value={selectedJob} onChange={handleJobChange}>
            <option value="">--Select a job--</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.title}>
                {job.title}
              </option>
            ))}
          </StyledSelect>
          <StyledLabel htmlFor="newJob">Or enter a new job:</StyledLabel>
          <StyledInput type="text" id="newJob" name="newJob" value={newJob} onChange={handleNewJobChange} />
        </StyledDiv>
        <StyledButton type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </StyledButton>
      </StyledForm>
    </StyledDiv>
    </div>

  );
};

export default Upload;
