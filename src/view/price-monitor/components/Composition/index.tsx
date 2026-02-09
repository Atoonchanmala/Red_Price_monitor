import React from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import jewelly from '../../../../assets/jewelly.png'
import type { CompositionPageProps, PriceDisplayRow } from '../../types'
import { formatPrice } from '../../../../helpers/format'
import { COMPOSITION_FALLBACK_ROWS, COMPOSITION_LABEL_MAP } from '../../mock/composition'

const CompositionPage: React.FC<CompositionPageProps> = ({ rows }) => {
    const dynamicRows: PriceDisplayRow[] | undefined = rows?.map((row) => ({
        label: COMPOSITION_LABEL_MAP[row.labelKey] ?? row.labelKey,
        sell: formatPrice(row.sell),
        buy: formatPrice(row.buy),
    }));

    const rowsToRender = dynamicRows && dynamicRows.length > 0 ? dynamicRows : COMPOSITION_FALLBACK_ROWS;
    return (
        <Box
            position="relative"
            flex={1}
            minW={0}
            w="auto"
            h="100%"
            bg="#FFF"
            borderRadius={{ base: "10px", sm: "12px", md: "20px", xl: "28px" }}
            border={{ base: "2px solid rgba(236, 185, 30, 0.95)", md: "3px solid rgba(236, 185, 30, 0.95)", xl: "4px solid rgba(236, 185, 30, 0.95)" }}
            px={{ base: 2, sm: 3, md: 6, xl: 8 }}
            py={{ base: 2, sm: 3, md: 6, xl: 6 }}
            overflow="visible"
        >
            <Image
                src={jewelly}
                alt="ອຸປະກອນຄຳ"
                position="absolute"
                top={{ base: "-15px", sm: "-20px", md: "-50px", xl: "-70px" }}
                left={{ base: "2px", md: "3px", xl: "5px" }}
                width={{ base: "45px", sm: "60px", md: "130px", xl: "190px" }}
                filter="drop-shadow(0 16px 24px rgba(0,0,0,0.25))"
                zIndex={2}
            />

            <Flex direction="column" position="relative" zIndex={1} gap={{ base: 1, sm: 1.5, md: 3, xl: 5 }} h="100%">
                <Text
                    textAlign="center"
                    fontSize={{ base: "12px", sm: "14px", md: "28px", lg: "32px", xl: "36px" }}
                    fontWeight="700"
                    color="#2B0F00"
                    flexShrink={0}
                >
                    ຄຳຮູບປະພັນ
                </Text>

                <Flex justify="center" gap={{ base: 0.5, md: 1, xl: 1 }} flexShrink={0} ml={{ base: 5, sm: 6, md: 10 }}>
                    <Box
                        px={{ base: 1, sm: 1.5, md: 3, xl: 4 }}
                        py={{ base: 0.5, sm: 0.5, md: 1.5, xl: 2 }}
                        bg="linear-gradient(90deg, #961A1E 0%, #5C0C0D 100%)"
                        color="white"
                        minW="55%"
                        fontSize={{ base: "10px", sm: "12px", md: "20px", lg: "22px", xl: "30px" }}
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
                        fontSize={{ base: "10px", sm: "12px", md: "20px", lg: "22px", xl: "30px" }}
                        fontWeight="700"
                        textAlign="center"
                    >
                        ລາຄາຊື້
                    </Box>
                </Flex>

                <Flex direction="column" 
                gap={{ base: 0.5, sm: 1, md: 2, xl: 2 }} 
                flex={1} 
                minH={0}
                >
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
                                w={{ base: "18%", sm: "16%", md: "13%", xl: "17%" }}
                                flexShrink={0}
                                px={{ base: 0.5, sm: 1, md: 2, xl: 4 }}
                                py={{ base: 0.5, sm: 1, md: 2, xl: 3 }}
                                fontSize={{ base: "8px", sm: "9px", md: "16px", lg: "18px", xl: "18px" }}
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
                                    <Text fontSize={{ base: "9px", sm: "11px", md: "20px", lg: "22px", xl: "28px" }} fontWeight="800" color="#FFFFFF">
                                        {row.sell}
                                    </Text>
                                </Flex>
                                <Box
                                    w={{ base: "1px", sm: "2px", md: "2px", xl: "4px" }}
                                    h="auto"
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
                                    <Text fontSize={{ base: "9px", sm: "11px", md: "20px", lg: "22px", xl: "28px" }} fontWeight="800" color="#FFFFFF">
                                        {row.buy}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </Box>
    );
};
export default CompositionPage;
