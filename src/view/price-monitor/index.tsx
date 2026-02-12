import React from 'react'
import { Box, Flex, Image } from '@chakra-ui/react'
import Watermark from '../../assets/watermark.png'
import { usePriceMonitor } from '../../hook/price-monitor'
import GoldbarPage from './components/Goldbars'
import CompositionPage from './components/Composition'

const PriceMonitorPage: React.FC = () => {
  const { data, isLoading, error } = usePriceMonitor()
  
  return (
    <Box
      position="relative"
      w="1920px"
      h="1080px"
      bg="radial-gradient(113.14% 60.22%, #290F0D 0%, #910101 0%, #5E0000 130%)"
      overflow="hidden"
      py={16}
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
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
        loading="eager"
        onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
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
        {/* Always render components, even when data is null - they have fallback data */}
        <Flex
          direction="row"
          gap={8}
          align="stretch"
          justify="center"
          w="100%"
          opacity={isLoading && !data ? 0.7 : 1}
          style={{
            transition: 'opacity 0.5s ease-in-out',
            willChange: 'opacity',
            transform: 'translateZ(0)'
          }}
        >
          <CompositionPage rows={data?.compositionRows} />
          <GoldbarPage rows={data?.goldbarRows} lastUpdated={data?.metadata.showDateTime} />
        </Flex>
        {/* Optional: Show error indicator in corner if needed */}
        {error && (
          <Box
            position="absolute"
            bottom="10px"
            right="10px"
            bg="red.500"
            color="white"
            px={3}
            py={1}
            borderRadius="md"
            fontSize="sm"
            opacity={0.8}
          >
            Error: {error}
          </Box>
        )}
      </Flex>
    </Box>
  );
};
export default PriceMonitorPage;