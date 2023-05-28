import React, { useState, useEffect } from 'react';
import { StyledDiv, Title, TitleContainer, Line, ImageCardButton } from './Home/homeStyles';
import { ImageCard } from './Home/ImageCard';
import Head from 'next/head';
import NavBar from '../NavBar';
import { postVote } from '../api/vote';
import _ from 'lodash';

const API_URL = process.env.API_URL;

const Home = () => {
  const [images, setImages] = useState([]);
  const [voted, setVoted] = useState(false);
  const [displayImages, setDisplayImages] = useState([])
  console.log('found some images', images)

  useEffect(() => {
    const supabaseToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('supabaseToken'))
      ?.split('=')[1];

    fetch(`${API_URL}/images`, {
      headers: {
        Auth: supabaseToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let returnedImages = _.shuffle(data["images"]);
        setImages(returnedImages)
        setDisplayImages(_.shuffle(returnedImages).slice(0, 2))
      });
  }, []);

  const handleSelect = (imageName) => {
    setVoted(true);
    const body = {
      selectedImage: imageName,
      allImages: displayImages,
    };
    postVote(body);
  };


  const randomizeImages = () => {
    setVoted(false)
    setDisplayImages(_.shuffle(images).slice(0, 2))
  }
  return (
    <StyledDiv>
      <Head>
        <title>resume-benchmark</title>
      </Head>
      <NavBar />
      <div style={{ height: '10px' }}></div>
      <h2>resume-benchmark</h2>
      <Line />
      <TitleContainer>
        <Title>Which resume is a better fit?</Title>
      </TitleContainer>
      <h2>Role: Senior Developer</h2>

      <ImageCardButton onClick={randomizeImages}>Reset</ImageCardButton>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {displayImages.map((image, index) => (
          <ImageCard
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            imageName={image}
            onSelect={handleSelect}
            disableButton={voted}
          />
        ))}
      </div>
      <div style={{ height: '120px' }}></div>
    </StyledDiv>
  );
};

export default Home;
