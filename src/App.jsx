import { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import { MantineProvider, Accordion } from '@mantine/core';

const App = () => {

  const [breeds, setBreeds] = useState();
  const [allBreeds, setAllBreeds] = useState()
  const [subBreeds, setSubBreeds] = useState()


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

if (breeds) {
  return (
    <div className='App'>
      <Accordion variant="contained" defaultValue="customization" >
    {breeds.map((breed) => {
      return (
          <Accordion.Item value={breed} >
            <Accordion.Control>{breed}</Accordion.Control>
            <Accordion.Panel >
              {subBreeds[breeds.indexOf(breed)].map((sub) => {
                return <li>{sub}</li>
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

