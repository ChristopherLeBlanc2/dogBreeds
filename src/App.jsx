import { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import { MantineProvider, Accordion } from '@mantine/core';

const App = () => {

  const [allBreeds, setAllBreeds] = useState()
  const [breeds, setBreeds] = useState();
  const [subBreeds, setSubBreeds] = useState()


  useEffect(() => {
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then((data) => {
        // console.log(Object.keys(data.data.message))
        setAllBreeds(data.data.message)
        setBreeds(Object.keys(data.data.message));
        // setSubBreeds(data.data.message)
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  }, []);

  // const findTheSubBreeds = (value) => {
  //   axios.get(`https://dog.ceo/api/breed/${value}/list`)
  //   .then((data) => {
  //     if (data.data.message.length > 0){
  //       setSubBreeds(data.data.message)
  //       console.log(value)
  //       } else {
  //         return 'NA'
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err, 'err');
  //     });
  //   }
    console.log(subBreeds)
  // console.log(breeds)
if (breeds) {
  return (
    <div className='App'>
      <Accordion variant="contained" defaultValue="customization" >
    {breeds.map((breed) => {
      return (
          <Accordion.Item value={breed} >
            <Accordion.Control>{breed}</Accordion.Control>
            <Accordion.Panel >
              {allBreeds[breed]}
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

