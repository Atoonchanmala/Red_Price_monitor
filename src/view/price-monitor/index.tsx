import React from 'react'
import { Box, Flex, Image } from '@chakra-ui/react'
import Watermark from '../../assets/watermark.png'
import { usePriceMonitor } from '../../hook/price-monitor'
import GoldbarPage from './components/Goldbars'
import CompositionPage from './components/Composition'

const PriceMonitorPage: React.FC = () => {
  const { data } = usePriceMonitor()
  return (
    <Box
      position="relative"
      w="1920px"
      h="1080px"
      bg="radial-gradient(113.14% 60.22%, #290F0D 0%, #910101 0%, #5E0000 130%)"
      overflow="hidden"
      py={16}
    >
      <Image
        src={Watermark}
        alt="Geometric background"
        position="absolute"
        inset={0}
        w="100%"
        h="100%"
        objectFit="cover"
        opacity={0.9}
        zIndex={0}
      />
      <Flex
        position="relative"
        zIndex={1}
        direction="column"
        align="center"
        justify="center"
        w="100%"
        h="100%"
        px="60px"
        py="50px"
        color="white"
      >
        <Flex
          direction="row"
          gap={8}
          align="stretch"
          justify="center"
          w="100%"
          // h="100%"
        >
          <CompositionPage rows={data?.compositionRows} />
          <GoldbarPage rows={data?.goldbarRows} lastUpdated={data?.metadata.showDateTime} />
        </Flex>
      </Flex>
    </Box>
  );
};
export default PriceMonitorPage;