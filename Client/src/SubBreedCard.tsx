import { Button, Card, Group, Image, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
//@ts-expect-error

/*
keep track of 3 numbers thatll be the index of which to put the current pics at.
These three will go up or down depending on the button

map over subBreedPics at the three indexes and present each as an image

*/
const SubBreedCard = ({ subBreedPics, currentSubBreed }) => {
  const [threeCurrentIndexes, setThreeCurrentIndexes] = useState([1, 2, 3]);
  const [threeCurrentPics, setThreeCurrentPics] = useState();

  //useEffect to run at the beggining and when threeCurrentIndexesChange??

  useEffect(() => {
    let arr = [];
    threeCurrentIndexes.forEach(currentIndex => {
      arr.push(subBreedPics[currentIndex]);
    });
    setThreeCurrentPics(arr);
  }, [threeCurrentIndexes]);

  // const getTheCurrentPics = () => {
  //   let arr = []
  //   threeCurrentIndexes.forEach((currentIndex) => {
  //     arr.push(subBreedPics[currentIndex])
  //   })
  //   setThreeCurrentPics(arr)
  // }

  const leftArrow = () => {
    console.log('clicked');
    let arr = [];
    threeCurrentIndexes.forEach(currentIndex => {
      arr.push(currentIndex - 1);
    });
    setThreeCurrentIndexes(arr);
  };

  const rightArrow = () => {
    console.log('clicked');
    let arr = [];
    threeCurrentIndexes.forEach(currentIndex => {
      arr.push(currentIndex + 1);
    });
    setThreeCurrentIndexes(arr);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Group>
          {threeCurrentIndexes[0] !== 0 ? (
            <Button onClick={leftArrow}>hi</Button>
          ) : null}
          {/*@ts-expect-error*/}
          {threeCurrentPics
            ? threeCurrentPics.map((currentPic, index) => {
                return (
                  <Image
                    maw={50}
                    mx="auto"
                    radius="md"
                    src={currentPic}
                    alt={currentPic}
                  />
                );
              })
            : null}
          {threeCurrentIndexes[2] !== subBreedPics.length - 1 ? (
            <Button onClick={rightArrow}>hi</Button>
          ) : null}
        </Group>
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Characteristics and Statistics</Text>
      </Group>
      <Text size="sm" color="dimmed">
        API call
      </Text>
    </Card>
  );
};
export default SubBreedCard;
