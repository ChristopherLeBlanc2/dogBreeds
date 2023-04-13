import { useEffect, useState } from 'react';
import axios from 'axios';
import { Accordion, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SubBreedCard from './SubBreedCard';

const App = () => {
  const [breeds, setBreeds] = useState();
  const [allBreeds, setAllBreeds] = useState();
  const [subBreeds, setSubBreeds] = useState();
  const [subBreedPics, setSubBreedPics] = useState();
  const [currentSubBreed, setCurrentSubBreed] = useState();
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/breeds/list/all')
      .then(data => {
        // @ts-expect-error
        setSubBreeds(Object.values(data.data.message));
        setAllBreeds(data.data.message);
        // @ts-expect-error
        setBreeds(Object.keys(data.data.message));
      })
      .catch(err => {
        console.log(err, 'err');
      });
  }, []);
  // @ts-expect-error
  const getSubBreedPics = (value, sub) => {
    // console.log('value: ', sub)
    axios
      .get(`https://dog.ceo/api/breed/${value}/${sub}/images`)
      .then(data => {
        setSubBreedPics(data.data.message);
        setCurrentSubBreed(sub);
        open();
      })
      .catch(err => {
        console.log(err, 'err');
      });
  };

  // console.log('pics', subBreeds);

  console.log('pics, ', subBreedPics);
  if (breeds) {
    return (
      <>
        <Modal opened={opened} onClose={close} title={currentSubBreed} centered>
          <SubBreedCard
            subBreedPics={subBreedPics}
            currentSubBreed={currentSubBreed}
          />
        </Modal>
        <div className="App">
          <Accordion variant="contained" defaultValue="customization">
            {/*@ts-expect-error*/}
            {breeds.map((breed, index) => {
              return (
                <Accordion.Item value={breed} key={index}>
                  <Accordion.Control>{breed}</Accordion.Control>
                  <Accordion.Panel>
                    {/*@ts-expect-error*/}

                    {subBreeds[index].length > 0 ? (
                      subBreeds[index].map((sub, index) => {
                        return (
                          <Text td="underline" c="blue">
                            <li
                              style={{ cursor: 'pointer' }}
                              key={index}
                              onClick={() => {
                                getSubBreedPics(breed, sub);
                              }}
                            >
                              {sub}
                            </li>
                          </Text>
                        );
                      })
                    ) : (
                      <li>Nothing to see Here</li>
                    )}
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </>
    );
  }
  return null;
};
export default App;
