import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import React from 'react';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { Container, Row, Col } from 'react-bootstrap';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

function App() {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setImages([{...data, title: word}, ...images]);
      })
      .catch((error) => {
        console.log(error);
      })
    setWord('');
  }

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div>
      <Header title="Images Gallery"/>  
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit}/>
      <Container className="mt-4">
        {images.length ? (
          <Row xs={1} md={2} lg={3} >
            {images.map((image, i) => (
              <Col key={i} className='pb-3'>
                <ImageCard image={image} deleteImage={handleDeleteImage} />
              </Col>
          ))}
          </Row>
        ) : <Welcome />}
      </Container>

     </div>
  );
}

export default App;
