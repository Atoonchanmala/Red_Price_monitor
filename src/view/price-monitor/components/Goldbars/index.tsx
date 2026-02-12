import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import bar from '../../../../assets/Bar.png';
import iconPv from '../../../../assets/pv.png';
import iconKpv from '../../../../assets/kpvlogo.png';
import iconEasyGold from '../../../../assets/easy gold.png';
import type { GoldbarPageProps, PriceDisplayRow } from '../../types';
import { formatPrice } from '../../../../helpers/format';
import { GOLD_BAR_FALLBACK_ROWS, GOLD_BAR_LABEL_MAP } from '../../mock/goldbars';
import { formatDisplayDate } from '../../../../helpers/formdate';
import GoldDivider from '../../../../styles/GoldDivider';
import HeaderImage from '../../../../assets/Layer_1 (1).png';

const GoldbarPage: React.FC<GoldbarPageProps> = ({ rows, lastUpdated }) => {
  const dynamicRows: PriceDisplayRow[] | undefined = rows?.map((row) => ({
    label: GOLD_BAR_LABEL_MAP[row.labelKey] ?? row.labelKey,
    sell: formatPrice(row.sell),
    buy: formatPrice(row.buy),
  }))

  // Ensure we always have data to display
  const rowsToRender = (dynamicRows && dynamicRows.length > 0) ? dynamicRows : GOLD_BAR_FALLBACK_ROWS
  const formattedDate = formatDisplayDate(lastUpdated)

  return (
    <Flex
      direction="column"
      flex={1}
      h="100%"
      style={{
        willChange: 'contents',
        transform: 'translateZ(0)'
      }}
    >
      <Flex
        justify="center"
        align="center"
        flexShrink={0}
        gap={20}
        mt={-8}
      >
        <Image 
          src={iconPv} 
          alt="PV" 
          width="190px" 
          objectFit="contain" 
          loading="eager"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <Image 
          src={iconKpv} 
          alt="KPV" 
          width="210px" 
          objectFit="contain" 
          loading="eager"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <Image 
          src={iconEasyGold} 
          alt="Easy Gold" 
          width="160px" 
          objectFit="contain" 
          loading="eager"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </Flex>

      <Flex direction="column" align="center" gap={3} flexShrink={0} mt={16}>
        <GoldDivider width="500px"/>
        <Image 
          src={HeaderImage} 
          alt="gold bar" 
          maxH="130px" 
          objectFit="contain"
          loading="eager"
          onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
        />
        <Text
          fontSize="42px"
          fontWeight="700"
          letterSpacing="2px"
        >
          {formattedDate}
        </Text>
        <GoldDivider width="500px" />
      </Flex>

      <Box
        borderRadius="28px"
        border="4px solid rgba(236, 185, 30, 0.95)"
        position="relative"
        flex={1}
        minH={0}
        px={8}
        py={8}
        color="white"
        bg="#FFF"
        mt="106px"
      >
        <Image
          src={bar}
          alt="gold bar"
          position="absolute"
          top="-40px"
          left="5px"
          width="190px"
          filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
          zIndex={2}
          loading="eager"
          onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
          style={{ willChange: 'transform' }}
        />
        <Flex
          direction="column" position="relative" zIndex={1} gap={5} h="100%"
        >
          <Text
            textAlign="center"
            fontSize="48px"
            fontWeight="700"
            color="#2B0F00"
            flexShrink={0}
          >
            ຄຳແທ່ງ KPV GOLD
          </Text>

          <Flex justify="center" gap={1} ml={38} flexShrink={0}>
            <Box
              px={4}
              py={2}
              bg="linear-gradient(90deg, #961A1E 0%, #5C0C0D 100%)"
              color="white"
              minW="55%"
              fontSize="32px"
              fontWeight="700"
              textAlign="center"
            >
              ລາຄາຂາຍອອກ
            </Box>
            <Box
              px={4}
              py={2}
              minW="44.4%"
              bg="linear-gradient(90deg, #961A1E 0%, #5C0C0D 100%)"
              color="white"
              fontSize="32px"
              fontWeight="700"
              textAlign="center"
            >
              ລາຄາຊື້ຄືນ
            </Box>
          </Flex>

          <Flex direction="column" gap={4} flex={1} minH={0}>
            {rowsToRender.map((row) => (
              <Flex
                key={row.label}
                direction="row"
                borderRadius="12px 0 0 12px"
                overflow="hidden"
                boxShadow="0 8px 16px rgba(0,0,0,0.15)"
                bg="linear-gradient(90deg, rgba(150, 26, 30, 0.15) 0%, rgba(188, 123, 23, 0.12) 100%)"
                flexShrink={0}
              >
                <Flex
                  align="center"
                  justify="center"
                  minW="15%"
                  bg="linear-gradient(90deg, #961A1E 0%, #5C0C0D 100%)"
                  color="white"
                  px={4}
                  py={3}
                  fontSize="28px"
                  fontWeight="800"
                  textAlign="center"
                >
                  {row.label}
                </Flex>
                <Flex
                  flex="1"
                  direction="row"
                  align="stretch"
                  bg="linear-gradient(90deg, #B4812C 0%, #ECB82D 100%)"
                >
                  <Flex
                    flex="1"
                    align="center"
                    justify="center"
                    py={3}
                    px={4}
                    textAlign="center"
                  >
                    <Text fontSize="36px" fontWeight="800" color="#FFF">
                      {row.sell}
                    </Text>
                  </Flex>
                  <Box
                    w="4px"
                    h="auto"
                    bg="#FFF"
                  />
                  <Flex
                    flex="1"
                    align="center"
                    justify="center"
                    py={3}
                    px={4}
                    textAlign="center"
                  >
                    <Text fontSize="36px" fontWeight="800" color="#FFF">
                      {row.buy}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
export default GoldbarPage;