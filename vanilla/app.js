/**
 * KPV Gold Price Monitor - Main Application
 * Vanilla JavaScript - TV Browser Compatible
 */

(function() {
    'use strict';
    
    // ============================================
    // Helper Functions
    // ============================================
    
    /**
     * Format price with locale and currency
     */
    function formatPrice(value) {
        if (value == null || isNaN(value)) {
            return '—';
        }
        // Format number with thousands separator
        var formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return formatted + ' ກີບ';
    }
    
    /**
     * Format date for display
     */
    function formatDisplayDate(value) {
        if (!value) {
            return '—';
        }
        
        var parsedDate = null;
        
        // Try parsing as ISO date
        var isoCandidate = new Date(value);
        if (!isNaN(isoCandidate.getTime())) {
            parsedDate = isoCandidate;
        }
        
        // Fallback parsing
        if (!parsedDate) {
            var datePart = value.split(' ')[0];
            if (datePart) {
                var replaced = datePart.replace(/\./g, '-').replace(/\//g, '-');
                var parts = replaced.split('-');
                if (parts.length === 3) {
                    var year = parseInt(parts[0], 10);
                    var month = parseInt(parts[1], 10);
                    var day = parseInt(parts[2], 10);
                    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
                        parsedDate = new Date(year, month - 1, day);
                    }
                }
            }
        }
        
        if (!parsedDate || isNaN(parsedDate.getTime())) {
            return '—';
        }
        
        var dayStr = String(parsedDate.getDate()).padStart(2, '0');
        var monthStr = String(parsedDate.getMonth() + 1).padStart(2, '0');
        var yearStr = String(parsedDate.getFullYear());
        
        return dayStr + '.' + monthStr + '.' + yearStr;
    }
    
    /**
     * Check if date is valid and recent
     */
    function isValidRecentDate(value) {
        if (!value) {
            return false;
        }
        var date = new Date(value);
        return !isNaN(date.getTime()) && date.getFullYear() >= 2000;
    }
    
    /**
     * Pick latest item by created_at date
     */
    function pickLatestByDate(items) {
        if (!items || !items.length) {
            return null;
        }
        
        return items.reduce(function(latest, current) {
            if (!latest) {
                return current;
            }
            
            var latestTime = latest.created_at ? Date.parse(latest.created_at) : -Infinity;
            var currentTime = current.created_at ? Date.parse(current.created_at) : -Infinity;
            
            return currentTime > latestTime ? current : latest;
        }, null);
    }
    
    /**
     * Simple XMLHttpRequest wrapper for TV browser compatibility
     */
    function fetchJSON(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Accept', 'application/json');
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        callback(null, data);
                    } catch (e) {
                        callback(new Error('Failed to parse JSON: ' + e.message), null);
                    }
                } else {
                    callback(new Error('HTTP Error: ' + xhr.status), null);
                }
            }
        };
        
        xhr.onerror = function() {
            callback(new Error('Network error'), null);
        };
        
        xhr.send();
    }
    
    // ============================================
    // DOM Manipulation
    // ============================================
    
    /**
     * Create a price row element
     */
    function createPriceRow(label, sellPrice, buyPrice) {
        var row = document.createElement('div');
        row.className = 'price-row';
        
        row.innerHTML = 
            '<div class="row-label">' + label + '</div>' +
            '<div class="row-prices">' +
                '<div class="price sell-price">' + sellPrice + '</div>' +
                '<div class="price-divider"></div>' +
                '<div class="price buy-price">' + buyPrice + '</div>' +
            '</div>';
        
        return row;
    }
    
    /**
     * Update composition rows in the DOM
     */
    function updateCompositionRows(rows) {
        var container = document.getElementById('composition-rows');
        if (!container) return;
        
        // Clear existing rows
        container.innerHTML = '';
        
        // Add new rows
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var element = createPriceRow(row.label, row.sell, row.buy);
            container.appendChild(element);
        }
    }
    
    /**
     * Update gold bar rows in the DOM
     */
    function updateGoldbarRows(rows) {
        var container = document.getElementById('goldbar-rows');
        if (!container) return;
        
        // Clear existing rows
        container.innerHTML = '';
        
        // Add new rows
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var element = createPriceRow(row.label, row.sell, row.buy);
            container.appendChild(element);
        }
    }
    
    /**
     * Update date display
     */
    function updateDateDisplay(dateStr) {
        var element = document.getElementById('date-display');
        if (element) {
            element.textContent = formatDisplayDate(dateStr);
        }
    }
    
    /**
     * Show error indicator
     */
    function showError(message) {
        var indicator = document.getElementById('error-indicator');
        var messageEl = document.getElementById('error-message');
        
        if (indicator && messageEl) {
            messageEl.textContent = message || 'Error loading data';
            indicator.style.display = 'block';
            
            // Auto-hide after 5 seconds
            setTimeout(function() {
                indicator.style.display = 'none';
            }, 5000);
        }
    }
    
    /**
     * Hide error indicator
     */
    function hideError() {
        var indicator = document.getElementById('error-indicator');
        if (indicator) {
            indicator.style.display = 'none';
        }
    }
    
    /**
     * Set loading state
     */
    function setLoading(isLoading) {
        var app = document.getElementById('app');
        if (app) {
            if (isLoading) {
                app.classList.add('loading');
            } else {
                app.classList.remove('loading');
            }
        }
    }
    
    // ============================================
    // Data Processing
    // ============================================
    
    /**
     * Process API data and update display
     */
    function processData(v1Data, v2Data) {
        var latestV1 = pickLatestByDate(v1Data.data);
        var latestV2 = pickLatestByDate(v2Data.data);
        
        if (!latestV1 || !latestV2) {
            throw new Error('Error fetching price data from API');
        }
        
        // Calculate gold bar prices
        var oneGramPrice = Calculations.calculateOneGram(
            latestV1.one_baht_sale_price_gold_bar,
            latestV1.one_baht_buy_price_gold_bar
        );
        
        var goldbarRows = [
            {
                label: GOLDBAR_LABELS['one_baht'],
                sell: formatPrice(latestV1.one_baht_sale_price_gold_bar_kpv || latestV1.one_baht_sale_price_gold_bar),
                buy: formatPrice(latestV1.one_baht_buy_price_gold_bar_kpv || latestV1.one_baht_buy_price_gold_bar)
            },
            {
                label: GOLDBAR_LABELS['one_gram'],
                sell: formatPrice(oneGramPrice.SellPrice),
                buy: formatPrice(oneGramPrice.BuyPrice)
            }
        ];
        
        // Calculate composition prices
        var oneSalungPrice = Calculations.calculateOneSalung(latestV1.one_baht_sale_price);
        var twoSalungPrice = Calculations.calculateTwoSalung(latestV1.one_baht_sale_price);
        var fiveHoonPrice = Calculations.calculateFiveHoon(latestV1.one_baht_sale_price);
        var threeHoonPrice = Calculations.calculateThreeHoon(latestV1.one_baht_sale_price);
        var twoHoonPrice = Calculations.calculateTwoHoon(latestV1.one_baht_sale_price);
        var oneHoonPrice = Calculations.calculateOneHoon(latestV1.one_baht_sale_price);
        
        var compositionRows = [
            {
                label: COMPOSITION_LABELS['one_baht'],
                sell: formatPrice(latestV1.one_baht_sale_price),
                buy: formatPrice(Calculations.calculateOneBahtBuy(latestV1.one_baht_sale_price))
            },
            {
                label: COMPOSITION_LABELS['two_salung'],
                sell: formatPrice(twoSalungPrice.SellPrice),
                buy: formatPrice(twoSalungPrice.BuyPrice)
            },
            {
                label: COMPOSITION_LABELS['one_salung'],
                sell: formatPrice(oneSalungPrice.SellPrice),
                buy: formatPrice(oneSalungPrice.BuyPrice)
            },
            {
                label: COMPOSITION_LABELS['five_hun'],
                sell: formatPrice(fiveHoonPrice.SellPrice),
                buy: formatPrice(fiveHoonPrice.BuyPrice)
            },
            {
                label: COMPOSITION_LABELS['three_hun'],
                sell: formatPrice(threeHoonPrice.SellPrice),
                buy: formatPrice(threeHoonPrice.BuyPrice)
            },
            {
                label: COMPOSITION_LABELS['two_hun'],
                sell: formatPrice(twoHoonPrice.SellPrice),
                buy: formatPrice(twoHoonPrice.BuyPrice)
            },
            {
                label: COMPOSITION_LABELS['one_hun'],
                sell: formatPrice(oneHoonPrice.SellPrice),
                buy: formatPrice(oneHoonPrice.BuyPrice)
            }
        ];
        
        // Determine show date
        var showDateTime = '';
        if (isValidRecentDate(latestV1.show_date_time)) {
            showDateTime = latestV1.show_date_time;
        } else if (isValidRecentDate(latestV2.created_at)) {
            showDateTime = latestV2.created_at;
        } else if (isValidRecentDate(latestV1.created_at)) {
            showDateTime = latestV1.created_at;
        }
        
        // Update DOM
        updateGoldbarRows(goldbarRows);
        updateCompositionRows(compositionRows);
        updateDateDisplay(showDateTime);
        hideError();
    }
    
    // ============================================
    // API Fetching
    // ============================================
    
    /**
     * Fetch price data from both APIs
     */
    function fetchPriceData() {
        setLoading(true);
        
        var v1Url = CONFIG.API_BASE_URL + CONFIG.API_V1_PATH;
        var v2Url = CONFIG.API_BASE_URL + CONFIG.API_V2_PATH;
        
        var v1Data = null;
        var v2Data = null;
        var completed = 0;
        var hasError = false;
        
        function checkComplete() {
            completed++;
            if (completed === 2) {
                setLoading(false);
                
                if (hasError) {
                    return;
                }
                
                try {
                    processData(v1Data, v2Data);
                } catch (e) {
                    console.error('Error processing data:', e);
                    showError(e.message);
                }
            }
        }
        
        // Fetch V1 data
        fetchJSON(v1Url, function(err, data) {
            if (err) {
                console.error('Error fetching V1:', err);
                hasError = true;
                showError('Failed to fetch price data');
            } else {
                v1Data = data;
            }
            checkComplete();
        });
        
        // Fetch V2 data
        fetchJSON(v2Url, function(err, data) {
            if (err) {
                console.error('Error fetching V2:', err);
                hasError = true;
                showError('Failed to fetch price data');
            } else {
                v2Data = data;
            }
            checkComplete();
        });
    }
    
    // ============================================
    // Scaling for Different Screen Sizes
    // ============================================
    
    /**
     * Scale the app to fit the viewport
     */
    function scaleToFit() {
        var app = document.getElementById('app');
        if (!app) return;
        
        var scale = Math.min(
            window.innerWidth / CONFIG.DESIGN_WIDTH,
            window.innerHeight / CONFIG.DESIGN_HEIGHT
        );
        
        app.style.transform = 'scale(' + scale + ')';
        app.style.transformOrigin = 'top left';
        app.style.marginLeft = ((window.innerWidth - CONFIG.DESIGN_WIDTH * scale) / 2) + 'px';
        app.style.marginTop = ((window.innerHeight - CONFIG.DESIGN_HEIGHT * scale) / 2) + 'px';
        
        // Force repaint for TV browsers
        void app.offsetHeight;
    }
    
    // ============================================
    // TV Browser Compatibility
    // ============================================
    
    /**
     * Force repaint for TV browsers
     */
    function forceRepaint() {
        var app = document.getElementById('app');
        if (app) {
            app.style.opacity = '0.9999';
            setTimeout(function() {
                app.style.opacity = '1';
                void app.offsetHeight;
            }, 10);
        }
    }
    
    /**
     * Initialize TV browser fixes
     */
    function initTVFixes() {
        // Force multiple repaints
        setTimeout(forceRepaint, 100);
        setTimeout(forceRepaint, 500);
        setTimeout(forceRepaint, 1000);
        
        // Handle visibility change (TV wake from sleep)
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                forceRepaint();
                scaleToFit();
            }
        });
    }
    
    // ============================================
    // Initialization
    // ============================================
    
    /**
     * Initialize the application
     */
    function init() {
        if (CONFIG.DEBUG) console.log('Initializing KPV Gold Price Monitor...');
        
        // Scale to fit viewport
        scaleToFit();
        window.addEventListener('resize', scaleToFit);
        
        // Apply TV browser fixes
        initTVFixes();
        
        // Initial data fetch
        fetchPriceData();
        
        // Set up auto-refresh
        setInterval(fetchPriceData, CONFIG.REFRESH_INTERVAL);
        
        if (CONFIG.DEBUG) console.log('Initialization complete');
    }
    
    // ============================================
    // Start Application
    // ============================================
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
