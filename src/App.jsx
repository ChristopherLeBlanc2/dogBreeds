import { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import { MantineProvider, Accordion } from '@mantine/core';

const App = () => {

  const [breeds, setBreeds] = useState();
  const [allBreeds, setAllBreeds] = useState()
  const [subBreeds, setSubBreeds] = useState()
  const [subBreedPics, setSubBreedPics] = useState()


  useEffect(() => {
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then((data) => {
        setSubBreeds(Object.values(data.data.message))
        setAllBreeds(data.data.message)
        setBreeds(Object.keys(data.data.message));
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  }, []);

  const getSubBreedPics = (value, sub) => {
    // console.log('value: ', sub)
    axios.get(`https://dog.ceo/api/breed/${value}/${sub}/images`)
    .then((data) => {
      setSubBreedPics(data.data.message)

    })
    .catch((err) => {
      console.log(err, 'err');
    });
  }

  console.log('pics', subBreedPics)

if (breeds) {
  return (
    <div className='App'>
      <Accordion variant="contained" defaultValue="customization" >
    {breeds.map((breed, index) => {
      return (
          <Accordion.Item value={breed} key={index} >
            <Accordion.Control>{breed}</Accordion.Control>
            <Accordion.Panel >
              {subBreeds[breeds.indexOf(breed)].map((sub, index) => {
                return <li key={index} onClick={() => {getSubBreedPics(breed, sub)}} >{sub}</li>
              })}
            </Accordion.Panel>
          </Accordion.Item>
        )})
        }
        </Accordion>
    </div>
  );
}
}
export default App;

