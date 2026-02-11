export interface PriceResult {
  SellPrice: number
  BuyPrice: number
}

const oneBathtDiff = 9000
const smithCost = 209000

const findResultPrice = (
  price: number,
  roundPrice: number,
  diff: number,
  premiumThreshold: number
): number => {
  if (diff === 5000) {
    return price + premiumThreshold
  }

  if (diff >= 0) {
    return roundPrice + premiumThreshold
  }

  return roundPrice + 5000 + premiumThreshold
}

// 1 ບາດ
export const calculateOneBahtBuy = (oneBaht: number): number => {
  const roundOneBaht = Math.round((oneBaht - (oneBaht * 2.6) / 100) / 1000) * 1000;
  console.log("one bath buy: ", roundOneBaht);
  
  return roundOneBaht;
}

// 1 ສະຫຼຶງ
export const calculateOneSalung = (oneBaht: number): PriceResult => {
  const quarterBaht = (oneBaht - oneBathtDiff) / 4
  const roundQuarterBaht = Math.round(quarterBaht / 10000) * 10000
  const diff = roundQuarterBaht - quarterBaht
  const premiumThreshold = 4000

  const sellPrice = findResultPrice(quarterBaht, roundQuarterBaht, diff, premiumThreshold)
  const buyPrice = Math.round((sellPrice - (sellPrice * 2.8) / 100) / 1000) * 1000;

  console.log("sel and buy one salung: ", sellPrice, buyPrice);
  
  return { SellPrice: sellPrice, BuyPrice: buyPrice }
}

// 2 ສະຫຼຶງ
export const calculateTwoSalung = (oneBaht: number): PriceResult => {
  const oneSalung = calculateOneSalung(oneBaht)
  const sellPrice = oneSalung.SellPrice * 2
  const buyPrice = Math.round((sellPrice - (sellPrice * 2.8) / 100) / 1000) * 1000;

  console.log("sel and buy two Salung: ", sellPrice, buyPrice);
  
  return { SellPrice: sellPrice, BuyPrice: buyPrice }
}

const calculateFiveHoonExcludePremium = (oneBaht: number): number => {
  const fiveHoon = (oneBaht - oneBathtDiff) / 8;
  const roundFiveHoon = Math.round(fiveHoon / 10000) * 10000;
  const diff = roundFiveHoon - fiveHoon;

  console.log("five hoon: ", diff);

  return findResultPrice(fiveHoon, roundFiveHoon, diff, 0)
}

// 5 ຫຸນ
export const calculateFiveHoon = (oneBaht: number): PriceResult => {
  const fiveHoon = calculateFiveHoonExcludePremium(oneBaht)
  const premiumThreshold = 4000

  const sellPrice = fiveHoon + premiumThreshold
  const buyPrice = Math.round((sellPrice - smithCost) / 1000) * 1000;
  console.log("sell and buy five hoon: ", sellPrice, buyPrice);
  
  return { SellPrice: sellPrice, BuyPrice: buyPrice }
}

// 3 ຫຸນ
export const calculateThreeHoon = (oneBaht: number): PriceResult => {
  const fiveHoon = calculateFiveHoonExcludePremium(oneBaht)
  const threeHoon = (fiveHoon / 5) * 3 + 30000
  const roundThreeHoon = Math.round((((oneBaht - oneBathtDiff) / 40) * 3 + 30000) / 10000) * 10000
  const diff = roundThreeHoon - threeHoon
  const premiumThreshold = 4000

  const sellPrice = findResultPrice(threeHoon, roundThreeHoon, diff, premiumThreshold)
  const buyPrice = Math.round((sellPrice - smithCost) / 1000) * 1000;
  console.log("sell and buy three hoon: ", sellPrice, buyPrice);
  
  return { SellPrice: sellPrice, BuyPrice: buyPrice }
}

// 2 ຫຸນ
export const calculateTwoHoon = (oneBaht: number): PriceResult => {
  const fiveHoon = calculateFiveHoonExcludePremium(oneBaht);
  const twoHoon = (fiveHoon / 5) * 2 + 30000;
  const roundTwoHoon = Math.round((((oneBaht - oneBathtDiff) / 40) * 2 + 30000) / 10000) * 10000;
  const diff = roundTwoHoon - twoHoon;
  const premiumThreshold = 4000;

  const sellPrice = findResultPrice(twoHoon, roundTwoHoon, diff, premiumThreshold);
  const buyPrice = Math.round((sellPrice - smithCost) / 1000) * 1000;
  console.log("sell and buy two hoon: ", sellPrice, buyPrice);
  
  return { SellPrice: sellPrice, BuyPrice: buyPrice }
}

// 1 ຫຸນ
export const calculateOneHoon = (oneBaht: number): PriceResult => {
  const fiveHoon = calculateFiveHoonExcludePremium(oneBaht)
  const oneHoon = fiveHoon / 5 + 30000
  const roundOneHoon = Math.round(((oneBaht - oneBathtDiff) / 40 + 30000) / 10000) * 10000
  const diff = roundOneHoon - oneHoon
  const premiumThreshold = 14000

  const sellPrice = findResultPrice(oneHoon, roundOneHoon, diff, premiumThreshold)
  const buyPrice = Math.round((sellPrice - smithCost) / 1000) * 1000
  console.log("sell price and buy one hoon: ", sellPrice, buyPrice);
  
  return { SellPrice: sellPrice, BuyPrice: buyPrice }
}

// 1 ກຣາມ
export const calculateOneGram = (
  oneSaleBahtBar: number,
  oneBuyBahtBar: number,
): PriceResult => {
  const oneGramSale = (oneSaleBahtBar / 15) + 70000
  const oneGramBuy = (oneBuyBahtBar) / 15 
  const roundOneGram = Math.round(oneGramSale / 1000) * 1000
  const roundOneGramBuy = Math.floor(oneGramBuy / 1000) * 1000
  const diff = roundOneGram - oneGramSale
  const premiumThreshold = 50000

  if (diff === 1000) {
    return {
      SellPrice: oneGramSale + premiumThreshold,
      BuyPrice: roundOneGramBuy,
    }
  }

  if (diff >= 0) {
    const result = {
      SellPrice: roundOneGram + premiumThreshold,
      BuyPrice: roundOneGramBuy,
    }
    console.log('one gram result (diff >= 0):', result)
    return result
  }

  const result = {
    SellPrice: roundOneGram + 1000 + premiumThreshold,
    BuyPrice: roundOneGramBuy,
  }
  console.log('one gram result (diff < 0):', result)
  return result
}

