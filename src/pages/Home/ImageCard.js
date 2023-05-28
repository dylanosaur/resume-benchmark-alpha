import { ImageCardContainer, ImageCardButton } from './homeStyles';

const ImageCard = ({ src, alt, imageName, onSelect, disableButton }) => {

    const handleClick = () => {
        onSelect(imageName);

    };

    return (
        <ImageCardContainer>
          <ImageCardButton onClick={handleClick} disabled={disableButton}>
            {disableButton?"Thank you for voting": "Vote"}
          </ImageCardButton>
          <img src={src} alt={alt} style={{ width: 'auto', height: '80%' }} />
        </ImageCardContainer>
      );
};

module.exports = {ImageCard}