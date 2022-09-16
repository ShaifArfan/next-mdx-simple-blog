import Image from 'next/image';
import React from 'react';
import profileImage from '../../images/profile_image.jpeg';
import Heading from '../typography/Heading';
import Text from '../typography/Text';
import classes from './HeroSection.module.scss';

function HeroSection() {
  return (
    <div className={classes.heroSection}>
      <dir className={classes.profileImg}>
        <Image src={profileImage} alt="Shaif arfan" height="200" width="200" />
      </dir>
      <Heading className={classes.name}>Shaif Arfan</Heading>
      <Text className={classes.description}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis deserunt
      </Text>
    </div>
  );
}

export default HeroSection;
