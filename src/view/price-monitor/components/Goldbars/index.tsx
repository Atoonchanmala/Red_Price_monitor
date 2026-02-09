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

  const rowsToRender = dynamicRows && dynamicRows.length > 0 ? dynamicRows : GOLD_BAR_FALLBACK_ROWS
  const formattedDate = formatDisplayDate(lastUpdated)

  return (
    <Flex
      direction="column"
      h="100%"
      w="auto"
      flex={1}
    >
      <Flex
        justify="center"
        align="center"
        flexShrink={0}
        gap={{ base: 1.5, sm: 2, md: 6, xl: 10 }}
      >
        <Image src={iconPv} alt="PV" width={{ base: "30px", sm: "40px", md: "80px", xl: "120px" }} objectFit="contain" />
        <Image src={iconKpv} alt="KPV" width={{ base: "35px", sm: "45px", md: "90px", xl: "140px" }} objectFit="contain" />
        <Image src={iconEasyGold} alt="Easy Gold" width={{ base: "25px", sm: "32px", md: "65px", xl: "100px" }} objectFit="contain" />
      </Flex>

      <Flex direction="column" align="center" gap={{ base: 0.5, md: 1, xl: 1 }} flexShrink={0} mt={{ base: 0.5, sm: 6, md: 2, xl: 4 }}>
        <GoldDivider width={{ base: "90px", sm: "120px", md: "260px", xl: "380px" }}/>
        <Image src={HeaderImage} alt="gold bar" maxH={{ base: "18px", sm: "24px", md: "50px", xl: "80px" }} objectFit="contain"/>
        <Text
          fontSize={{ base: "10px", sm: "12px", md: "20px", lg: "22px", xl: "32px" }}
          fontWeight="700"
          letterSpacing={{ base: "0.3px", sm: "0.5px", md: "1.5px", xl: "2px" }}
        >
          {formattedDate}
        </Text>
        <GoldDivider width={{ base: "90px", sm: "120px", md: "260px", xl: "380px" }} />
      </Flex>

      <Box
        borderRadius={{ base: "10px", sm: "12px", md: "20px", xl: "28px" }}
        border={{ base: "2px solid rgba(236, 185, 30, 0.95)", md: "3px solid rgba(236, 185, 30, 0.95)", xl: "4px solid rgba(236, 185, 30, 0.95)" }}
        position="relative"
        // flex={1}
        // minH={0}
        px={{ base: 2, sm: 3, md: 6, xl: 8 }}
        py={{ base: 2, sm: 3, md: 6, xl: 8 }}
        color="white"
        bg="#FFF"
        mt={{ base: 3, sm: 9, md: 6, xl: 16 }}
      >
        <Image
          src={bar}
          alt="gold bar"
          position="absolute"
          top={{ base: "-10px", sm: "-12px", md: "-25px", xl: "-40px" }}
          left={{ base: "2px", md: "3px", xl: "5px" }}
          width={{ base: "40px", sm: "50px", md: "100px", xl: "160px" }}
          filter="drop-shadow(0 16px 24px rgba(0,0,0,0.25))"
          zIndex={2}
        />
        <Flex
          direction="column" position="relative" zIndex={1} gap={{ base: 1, sm: 1.5, md: 3, xl: 5 }} h="100%"
        >
          <Text
            textAlign="center"
            fontSize={{ base: "12px", sm: "14px", md: "28px", lg: "32px", xl: "48px" }}
            fontWeight="700"
            color="#2B0F00"
            flexShrink={0}
          >
            ຄຳແທ່ງ KPV GOLD
          </Text>

          <Flex justify="center" gap={1} flexShrink={0}>
            <Box
              px={{ base: 1, sm: 1.5, md: 3, xl: 4 }}
              py={{ base: 0.5, sm: 0.5, md: 1.5, xl: 2 }}
              bg="linear-gradient(90deg, #961A1E 0%, #5C0C0D 100%)"
              color="white"
              minW="55%"
              fontSize={{ base: "10px", sm: "12px", md: "20px", lg: "22px", xl: "32px" }}
              fontWeight="700"
              textAlign="center"
            >
              ລາຄາຂາຍ
            </Box>
            <Box
              px={{ base: 1, sm: 1.5, md: 3, xl: 4 }}
              py={{ base: 0.5, sm: 0.5, md: 1.5, xl: 2 }}
              minW="45%"
              bg="linear-gradient(90deg, #961A1E 0%, #5C0C0D 100%)"
              color="white"
              fontSize={{ base: "10px", sm: "12px", md: "20px", lg: "22px", xl: "32px" }}
              fontWeight="700"
              textAlign="center"
            >
              ລາຄາຊື້
            </Box>
          </Flex>

          <Flex direction="column" gap={{ base: 0.5, sm: 1, md: 2, xl: 4 }} flex={1} minH={0}>
            {rowsToRender.map((row) => (
              <Flex
                key={row.label}
                direction="row"
                borderRadius={{ base: "3px 0 0 3px", sm: "4px 0 0 4px", md: "8px 0 0 8px", xl: "12px 0 0 12px" }}
                overflow="hidden"
                boxShadow="0 4px 12px rgba(0,0,0,0.12)"
                bg="linear-gradient(90deg, rgba(150, 26, 30, 0.15) 0%, rgba(188, 123, 23, 0.12) 100%)"
                flex={1}
                minH={0}
              >
                <Flex
                  align="center"
                  justify="center"
                  bg="linear-gradient(90deg, #961A1E 0%, #5C0C0D 100%)"
                  color="white"
                  w={{ base: "15%", sm: "16%", md: "13%", xl: "17%" }}
                  flexShrink={0}
                  px={{ base: 0.5, sm: 1, md: 2, xl: 4 }}
                  py={{ base: 0.5, sm: 1, md: 2, xl: 3 }}
                  fontSize={{ base: "8px", sm: "9px", md: "16px", lg: "18px", xl: "28px" }}
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
                    px={{ base: 0.5, sm: 1, md: 4 }}
                    py={{ base: 0.5, sm: 1, md: 2, xl: 3 }}
                    textAlign="center"
                  >
                    <Text fontSize={{ base: "9px", sm: "11px", md: "20px", lg: "22px", xl: "36px" }} fontWeight="800" color="#FFF">
                      {row.sell}
                    </Text>
                  </Flex>
                  <Box
                    w={{ base: "1px", sm: "2px", md: "2px", xl: "4px" }}
                    bg="#FFF"
                  />
                  <Flex
                    flex="1"
                    align="center"
                    justify="center"
                    px={{ base: 0.5, sm: 1, md: 4 }}
                    py={{ base: 0.5, sm: 1, md: 2, xl: 3 }}
                    textAlign="center"
                  >
                    <Text fontSize={{ base: "9px", sm: "11px", md: "20px", lg: "22px", xl: "36px" }} fontWeight="800" color="#FFF">
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