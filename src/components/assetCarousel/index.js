import React, {useEffect, useRef, useState} from 'react';
import {Box, Image} from '@chakra-ui/react';
import AssetImagePreview from './assetImagePreview';

let timer;
const AssetCarousel = ({slideImages, ...rest}) => {
  const [showPreview, setShowPreview] = useState(false);
  const galleryRef = useRef();
  const [slide, setSlide] = useState(1);

  useEffect(() => {
    clearInterval(timer);
    timer = setInterval(() => {
      if (slide >= slideImages?.length) {
        clearInterval(timer);
        setTimeout(() => {
          setSlide(1);
        }, 2000);
        return;
      }
      setSlide(prev => prev + 1);
    }, 2000);
  }, [slide]);

  useEffect(() => {
    galleryRef.current?.play();
  }, []);

  const handleImageExpansion = index => {
    galleryRef.current?.pause();
    setShowPreview(true);
  };

  return (
    <>
      <Box w="full" h="516px" {...rest}>
        {slideImages?.map((slideImage, i) => (
          <Box
            key={i}
            display={`${slide === i + 1 ? 'block' : 'none'}`}
            alt="next_image"
            w="full"
            h="516px"
            onClick={() => handleImageExpansion()}
          >
            <Image
              cursor={'pointer'}
              objectFit={'cover'}
              w="full"
              h="full"
              src={slideImage?.original}
            />
          </Box>
        ))}
      </Box>

      <AssetImagePreview
        slideImages={slideImages}
        setShowPreview={setShowPreview}
        showPreview={showPreview}
      />
    </>
  );
};

export default AssetCarousel;
