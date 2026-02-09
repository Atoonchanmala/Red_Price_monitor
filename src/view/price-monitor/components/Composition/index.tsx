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
            h="100%"
            bg="#FFF"
            borderRadius="28px"
            border="4px solid rgba(236, 185, 30, 0.95)"
            px={8}
            py={8}
            overflow="visible"
        >
            <Image
                src={jewelly}
                alt="ອຸປະກອນຄຳ"
                position="absolute"
                top="-70px"
                left="30px"
                width="190px"
                filter="drop-shadow(0 16px 24px rgba(0,0,0,0.25))"
                zIndex={2}
            />

            <Box
            />
            <Flex direction="column" position="relative" zIndex={1} gap={5} h="100%">
                <Text
                    textAlign="center"
                    fontSize="48px"
                    fontWeight="700"
                    color="#2B0F00"
                    flexShrink={0}
                >
                    ຄຳຮູບປະພັນ
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
                        ລາຄາຂາຍ
                    </Box>
                    <Box
                        px={4}
                        py={2}
                        minW="45%"
                        bg="linear-gradient(90deg, #961A1E 0%, #5C0C0D 100%)"
                        color="white"
                        fontSize="32px"
                        fontWeight="700"
                        textAlign="center"
                    >
                        ລາຄາຊື້
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
                                bg="linear-gradient(90deg, #961A1E 0%, #5C0C0D 100%)"
                                color="white"
                                minW="15%"
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
                                    <Text fontSize="36px" fontWeight="800" color="#FFFFFF">
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
                                    <Text fontSize="36px" fontWeight="800" color="#FFFFFF">
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
