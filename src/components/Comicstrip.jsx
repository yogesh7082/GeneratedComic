import React, { useState } from 'react';



const ComicStrip = () => {
  const [textInput, setTextInput] = useState('');
  const [comicImage, setComicImage] = useState([]);
  const [loader , setloader]=useState(false);

  const handleGenerateComic = async () => {
    try {
      setComicImage([]);
      const wrappedData = {"inputs":textInput}
      setloader(true);
      const imagePromises = Array.from({ length: 10 }, () => query(wrappedData));
      const images = await Promise.all(imagePromises);

      // Convert Blob data to URLs
      const imageUrls = images.map(blobResult => URL.createObjectURL(blobResult));
      setloader(false);
      // Update the state with the array of image URLs
      setComicImage(imageUrls);

    }catch (error) {
      console.error('Error generating comic:', error);
    }
  };

  return (
    <>

        <div><h1>Comic image Generater</h1> </div>
      <header>
      <textarea
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Enter text for the comic panels"
      />
      <button onClick={handleGenerateComic}>Generate Comic</button> 
      </header>
      {loader?<div >
      <h2>loading...</h2>
      </div>:<div></div>}
      <div style={styles.comicImagesContainer}>

        {comicImage.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`GeneratedComic ${index}`}
            style={styles.comicImage}
          />
        ))}
      </div>
      <footer>
        <div> yogesh</div> 
        <div>20135141</div>
      </footer>
      </>
  );
};

export default ComicStrip;

const styles = {
  comicImagesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent:"center",
    alignItems:"center"
  },
  comicImage: {
    margin: '5px',
    width: '300px', 
    height: '300px',
    borderRadius: '10px', 
    objectFit: 'cover', 
  },
};

async function query(data) {
  try {
    const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
        headers: {
          "Accept": "image/png",
          "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  } catch (error) {
    console.error("Error querying the API:", error);
    throw error;
  }
}