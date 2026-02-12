/**
 * Price Calculations for KPV Gold Price Monitor
 * Ported from TypeScript to Vanilla JavaScript
 */

var Calculations = (function() {
    'use strict';
    
    var oneBathtDiff = 9000;
    var smithCost = 209000;
    
    /**
     * Helper function to find result price
     */
    function findResultPrice(price, roundPrice, diff, premiumThreshold) {
        if (diff === 5000) {
            return price + premiumThreshold;
        }
        
        if (diff >= 0) {
            return roundPrice + premiumThreshold;
        }
        
        return roundPrice + 5000 + premiumThreshold;
    }
    
    /**
     * Calculate 1 Baht buy price
     */
    function calculateOneBahtBuy(oneBaht) {
        var roundOneBaht = Math.round((oneBaht - (oneBaht * 2.6) / 100) / 1000) * 1000;
        if (CONFIG.DEBUG) console.log("one bath buy:", roundOneBaht);
        return roundOneBaht;
    }
    
    /**
     * Calculate 1 Salung prices
     */
    function calculateOneSalung(oneBaht) {
        var quarterBaht = (oneBaht - oneBathtDiff) / 4;
        var roundQuarterBaht = Math.round(quarterBaht / 10000) * 10000;
        var diff = roundQuarterBaht - quarterBaht;
        var premiumThreshold = 4000;
        
        var sellPrice = findResultPrice(quarterBaht, roundQuarterBaht, diff, premiumThreshold);
        var buyPrice = Math.round((sellPrice - (sellPrice * 2.8) / 100) / 1000) * 1000;
        
        if (CONFIG.DEBUG) console.log("sell and buy one salung:", sellPrice, buyPrice);
        
        return { SellPrice: sellPrice, BuyPrice: buyPrice };
    }
    
    /**
     * Calculate 2 Salung prices
     */
    function calculateTwoSalung(oneBaht) {
        var oneSalung = calculateOneSalung(oneBaht);
        var sellPrice = oneSalung.SellPrice * 2;
        var buyPrice = Math.round((sellPrice - (sellPrice * 2.8) / 100) / 1000) * 1000;
        
        if (CONFIG.DEBUG) console.log("sell and buy two salung:", sellPrice, buyPrice);
        
        return { SellPrice: sellPrice, BuyPrice: buyPrice };
    }
    
    /**
     * Calculate 5 Hoon excluding premium
     */
    function calculateFiveHoonExcludePremium(oneBaht) {
        var fiveHoon = (oneBaht - oneBathtDiff) / 8;
        var roundFiveHoon = Math.round(fiveHoon / 10000) * 10000;
        var diff = roundFiveHoon - fiveHoon;
        
        if (CONFIG.DEBUG) console.log("five hoon:", diff);
        
        return findResultPrice(fiveHoon, roundFiveHoon, diff, 0);
    }
    
    /**
     * Calculate 5 Hoon prices
     */
    function calculateFiveHoon(oneBaht) {
        var fiveHoon = calculateFiveHoonExcludePremium(oneBaht);
        var premiumThreshold = 4000;
        
        var sellPrice = fiveHoon + premiumThreshold;
        var buyPrice = Math.round((sellPrice - smithCost) / 1000) * 1000;
        
        if (CONFIG.DEBUG) console.log("sell and buy five hoon:", sellPrice, buyPrice);
        
        return { SellPrice: sellPrice, BuyPrice: buyPrice };
    }
    
    /**
     * Calculate 3 Hoon prices
     */
    function calculateThreeHoon(oneBaht) {
        var fiveHoon = calculateFiveHoonExcludePremium(oneBaht);
        var threeHoon = (fiveHoon / 5) * 3 + 30000;
        var roundThreeHoon = Math.round((((oneBaht - oneBathtDiff) / 40) * 3 + 30000) / 10000) * 10000;
        var diff = roundThreeHoon - threeHoon;
        var premiumThreshold = 4000;
        
        var sellPrice = findResultPrice(threeHoon, roundThreeHoon, diff, premiumThreshold);
        var buyPrice = Math.round((sellPrice - smithCost) / 1000) * 1000;
        
        if (CONFIG.DEBUG) console.log("sell and buy three hoon:", sellPrice, buyPrice);
        
        return { SellPrice: sellPrice, BuyPrice: buyPrice };
    }
    
    /**
     * Calculate 2 Hoon prices
     */
    function calculateTwoHoon(oneBaht) {
        var fiveHoon = calculateFiveHoonExcludePremium(oneBaht);
        var twoHoon = (fiveHoon / 5) * 2 + 30000;
        var roundTwoHoon = Math.round((((oneBaht - oneBathtDiff) / 40) * 2 + 30000) / 10000) * 10000;
        var diff = roundTwoHoon - twoHoon;
        var premiumThreshold = 4000;
        
        var sellPrice = findResultPrice(twoHoon, roundTwoHoon, diff, premiumThreshold);
        var buyPrice = Math.round((sellPrice - smithCost) / 1000) * 1000;
        
        if (CONFIG.DEBUG) console.log("sell and buy two hoon:", sellPrice, buyPrice);
        
        return { SellPrice: sellPrice, BuyPrice: buyPrice };
    }
    
    /**
     * Calculate 1 Hoon prices
     */
    function calculateOneHoon(oneBaht) {
        var fiveHoon = calculateFiveHoonExcludePremium(oneBaht);
        var oneHoon = fiveHoon / 5 + 30000;
        var roundOneHoon = Math.round(((oneBaht - oneBathtDiff) / 40 + 30000) / 10000) * 10000;
        var diff = roundOneHoon - oneHoon;
        var premiumThreshold = 14000;
        
        var sellPrice = findResultPrice(oneHoon, roundOneHoon, diff, premiumThreshold);
        var buyPrice = Math.round((sellPrice - smithCost) / 1000) * 1000;
        
        if (CONFIG.DEBUG) console.log("sell and buy one hoon:", sellPrice, buyPrice);
        
        return { SellPrice: sellPrice, BuyPrice: buyPrice };
    }
    
    /**
     * Calculate 1 Gram prices
     */
    function calculateOneGram(oneSaleBahtBar, oneBuyBahtBar) {
        var oneGramSale = (oneSaleBahtBar / 15) + 70000;
        var oneGramBuy = oneBuyBahtBar / 15;
        var roundOneGram = Math.round(oneGramSale / 1000) * 1000;
        var roundOneGramBuy = Math.floor(oneGramBuy / 1000) * 1000;
        var diff = roundOneGram - oneGramSale;
        var premiumThreshold = 50000;
        
        if (diff === 1000) {
            return {
                SellPrice: oneGramSale + premiumThreshold,
                BuyPrice: roundOneGramBuy
            };
        }
        
        if (diff >= 0) {
            var result = {
                SellPrice: roundOneGram + premiumThreshold,
                BuyPrice: roundOneGramBuy
            };
            if (CONFIG.DEBUG) console.log('one gram result (diff >= 0):', result);
            return result;
        }
        
        var result = {
            SellPrice: roundOneGram + 1000 + premiumThreshold,
            BuyPrice: roundOneGramBuy
        };
        if (CONFIG.DEBUG) console.log('one gram result (diff < 0):', result);
        return result;
    }
    
    // Public API
    return {
        calculateOneBahtBuy: calculateOneBahtBuy,
        calculateOneSalung: calculateOneSalung,
        calculateTwoSalung: calculateTwoSalung,
        calculateFiveHoon: calculateFiveHoon,
        calculateThreeHoon: calculateThreeHoon,
        calculateTwoHoon: calculateTwoHoon,
        calculateOneHoon: calculateOneHoon,
        calculateOneGram: calculateOneGram
    };
})();
