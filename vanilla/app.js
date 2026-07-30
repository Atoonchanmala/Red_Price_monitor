/**
 * KPV Gold Price Monitor - Main Application
 * Vanilla JavaScript - TV Browser Compatible
 */

(function() {
    'use strict';

    // Safe console wrapper — some TV browsers lack console entirely
    function safeLog() {
        if (typeof console !== 'undefined' && console.log) {
            try { console.log.apply(console, arguments); } catch(e) {}
        }
    }
    function safeError() {
        if (typeof console !== 'undefined' && console.error) {
            try { console.error.apply(console, arguments); } catch(e) {}
        }
    }

    // Global error handler — prevents TV browsers from crashing on uncaught errors
    window.onerror = function(msg, url, line, col, err) {
        safeError('Global error:', msg, 'at', url, line);
        return true; // Suppress the error — don't let the TV kill the page
    };

    // Track in-flight XHRs so they can be aborted on the next refresh cycle
    var activeXHRs = [];
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
        
        var day = parsedDate.getDate();
        var month = parsedDate.getMonth() + 1;
        var dayStr = (day < 10 ? '0' : '') + day;
        var monthStr = (month < 10 ? '0' : '') + month;
        var yearStr = String(parsedDate.getFullYear());
        
        return dayStr + '.' + monthStr + '.' + yearStr;
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
                if (xhr.status === 0) {
                    // Request was aborted — do not invoke callback
                    return;
                }
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
        return xhr;
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
     * Update price rows in-place to avoid DOM churn and GPU layer reallocation.
     * Falls back to full recreate only if row count has changed.
     */
    function updateRows(containerId, rows) {
        var container = document.getElementById(containerId);
        if (!container) return;

        var existing = container.querySelectorAll('.price-row');

        if (existing.length === rows.length) {
            // Update text content in-place — no DOM nodes created or destroyed
            for (var i = 0; i < rows.length; i++) {
                var label = existing[i].querySelector('.row-label');
                var sell = existing[i].querySelector('.sell-price');
                var buy = existing[i].querySelector('.buy-price');
                if (label) label.textContent = rows[i].label;
                if (sell) sell.textContent = rows[i].sell;
                if (buy) buy.textContent = rows[i].buy;
            }
        } else {
            // Fallback: recreate rows if count differs
            container.innerHTML = '';
            for (var j = 0; j < rows.length; j++) {
                container.appendChild(createPriceRow(rows[j].label, rows[j].sell, rows[j].buy));
            }
        }
    }

    /**
     * Update composition rows in the DOM
     */
    function updateCompositionRows(rows) {
        updateRows('composition-rows', rows);
    }

    /**
     * Update gold bar rows in the DOM
     */
    function updateGoldbarRows(rows) {
        updateRows('goldbar-rows', rows);
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
    function processData(response) {
        var priceData = response && response.data;

        if (!priceData || response.error === true) {
            throw new Error('Error fetching price data from API');
        }
        
        var goldbarRows = [
            {
                label: GOLDBAR_LABELS['one_baht'],
                sell: formatPrice(priceData.one_baht_sale_price_gold_bar),
                buy: formatPrice(priceData.one_baht_buy_price_gold_bar)
            },
            {
                label: GOLDBAR_LABELS['one_gram'],
                sell: formatPrice(priceData.one_gram_sale_price),
                buy: formatPrice(priceData.one_gram_buy_price)
            }
        ];
        
        var compositionRows = [
            {
                label: COMPOSITION_LABELS['one_baht'],
                sell: formatPrice(priceData.one_baht_sale_price),
                buy: formatPrice(priceData.one_baht_buy_price)
            },
            {
                label: COMPOSITION_LABELS['two_salung'],
                sell: formatPrice(priceData.two_salung_sale_price),
                buy: formatPrice(priceData.two_salung_buy_price)
            },
            {
                label: COMPOSITION_LABELS['one_salung'],
                sell: formatPrice(priceData.one_salung_sale_price),
                buy: formatPrice(priceData.one_salung_buy_price)
            },
            {
                label: COMPOSITION_LABELS['five_hun'],
                sell: formatPrice(priceData.five_hun_sale_price),
                buy: formatPrice(priceData.five_hun_buy_price)
            },
            {
                label: COMPOSITION_LABELS['three_hun'],
                sell: formatPrice(priceData.three_hun_sale_price),
                buy: formatPrice(priceData.three_hun_buy_price)
            },
            {
                label: COMPOSITION_LABELS['two_hun'],
                sell: formatPrice(priceData.two_hun_sale_price),
                buy: formatPrice(priceData.two_hun_buy_price)
            },
            {
                label: COMPOSITION_LABELS['one_hun'],
                sell: formatPrice(priceData.one_hun_sale_price),
                buy: formatPrice(priceData.one_hun_buy_price)
            }
        ];
        
        // Update DOM
        updateGoldbarRows(goldbarRows);
        updateCompositionRows(compositionRows);
        updateDateDisplay(priceData.show_date_time || priceData.created_at || '');
        hideError();
    }
    
    // ============================================
    // API Fetching
    // ============================================
    
    /**
     * Fetch price data from the shop-price API
     */
    function fetchPriceData() {
        // Abort any in-flight requests from the previous cycle
        for (var i = 0; i < activeXHRs.length; i++) {
            if (activeXHRs[i]) activeXHRs[i].abort();
        }
        activeXHRs = [];

        setLoading(true);

        var url = CONFIG.API_BASE_URL + CONFIG.API_PATH;

        activeXHRs.push(fetchJSON(url, function(err, data) {
            activeXHRs = [];
            setLoading(false);

            if (err) {
                safeError('Error fetching shop price:', err);
                showError('Failed to fetch price data');
                return;
            }

            try {
                processData(data);
            } catch (e) {
                safeError('Error processing data:', e);
                showError(e.message);
            }
        }));
    }
    
    // ============================================
    // Scaling for Different Screen Sizes
    // ============================================
    
    /**
     * Reliably detect the visible viewport size across TV browsers.
     * Sources are tried in priority order; each is validated before use.
     * screen.* values are divided by devicePixelRatio to convert to CSS pixels.
     */
    function getViewportDimensions() {
        var MIN = 320; // sanity floor — any smaller value is a browser bug

        // 1. visualViewport: most accurate, skips browser chrome/scrollbars
        //    Available on WebOS 6+, Tizen 5+, Android TV Chromium 68+
        if (window.visualViewport &&
            window.visualViewport.width >= MIN &&
            window.visualViewport.height >= MIN) {
            return {
                w: Math.round(window.visualViewport.width),
                h: Math.round(window.visualViewport.height)
            };
        }

        // 2. window.inner*: CSS pixels, reliable on modern browsers
        var iw = window.innerWidth || 0;
        var ih = window.innerHeight || 0;
        if (iw >= MIN && ih >= MIN) {
            return { w: iw, h: ih };
        }

        // 3. documentElement.client*: fallback for older WebKit TV browsers
        var cw = document.documentElement ? (document.documentElement.clientWidth || 0) : 0;
        var ch = document.documentElement ? (document.documentElement.clientHeight || 0) : 0;
        if (cw >= MIN && ch >= MIN) {
            return { w: cw, h: ch };
        }

        // 4. document.body.client*: some TV browsers report here when others fail
        var bw = document.body ? (document.body.clientWidth || 0) : 0;
        var bh = document.body ? (document.body.clientHeight || 0) : 0;
        if (bw >= MIN && bh >= MIN) {
            return { w: bw, h: bh };
        }

        // 5. screen.*: last resort — divide by DPR to convert physical → CSS pixels
        var dpr = window.devicePixelRatio || 1;
        var sw = Math.round((screen.width || CONFIG.DESIGN_WIDTH) / dpr);
        var sh = Math.round((screen.height || CONFIG.DESIGN_HEIGHT) / dpr);
        return { w: sw, h: sh };
    }

    /**
     * Debounced scaleToFit — coalesces rapid resize/poll events into a single
     * GPU recomposition. Prevents TV browsers from OOM-crashing when many
     * transform updates fire in quick succession.
     */
    var _scaleTimer = null;
    function scaleToFitDebounced() {
        if (_scaleTimer) return;            // already scheduled
        _scaleTimer = setTimeout(function() {
            _scaleTimer = null;
            _scaleToFitNow();
        }, 100);
    }

    /**
     * Scale the app to fit the viewport.
     * Accounts for TV overscan and falls back to CSS zoom
     * on browsers where CSS transforms fail silently.
     */
    function _scaleToFitNow() {
        var app = document.getElementById('app');
        if (!app) return;

        var vp = getViewportDimensions();

        // Shrink effective viewport by overscan percentage so content
        // stays inside the TV-safe zone (edges are often cropped).
        var overscan = (CONFIG.TV_OVERSCAN_PERCENT || 0) / 100;
        var safeW = vp.w * (1 - overscan);
        var safeH = vp.h * (1 - overscan);

        var scale = Math.min(
            safeW / CONFIG.DESIGN_WIDTH,
            safeH / CONFIG.DESIGN_HEIGHT
        );

        // Center within the full viewport (not the safe area)
        var offsetX = (vp.w - CONFIG.DESIGN_WIDTH * scale) / 2;
        var offsetY = (vp.h - CONFIG.DESIGN_HEIGHT * scale) / 2;

        // Prefer CSS transform; fall back to zoom for very old TV WebKit.
        var hasTransform = ('transform' in app.style) || ('webkitTransform' in app.style);

        if (hasTransform) {
            var t = 'translate(' + offsetX + 'px,' + offsetY + 'px) scale(' + scale + ') translateZ(0)';
            app.style.webkitTransform = t;
            app.style.transform = t;
            app.style.webkitTransformOrigin = 'top left';
            app.style.transformOrigin = 'top left';
        } else if ('zoom' in app.style) {
            // zoom changes layout size — position via margin instead
            app.style.zoom = scale;
            app.style.marginLeft = offsetX + 'px';
            app.style.marginTop = offsetY + 'px';
        }

        // Reset any previously-set left/top so only transform controls position
        app.style.left = '0';
        app.style.top = '0';

        // Force repaint for TV browsers
        void app.offsetHeight;

        if (CONFIG.DEBUG) {
            updateDebugOverlay(vp, scale, overscan);
        }
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
     * Debug overlay — shows viewport info on screen when CONFIG.DEBUG = true.
     * Useful for diagnosing scaling issues on TVs you can't inspect remotely.
     */
    function updateDebugOverlay(vp, scale, overscan) {
        var overlay = document.getElementById('debug-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'debug-overlay';
            overlay.style.cssText =
                'position:fixed;bottom:0;left:0;background:rgba(0,0,0,0.85);' +
                'color:#0f0;font:14px monospace;padding:10px 14px;z-index:99999;' +
                'max-width:100%;word-break:break-all;pointer-events:none;';
            document.body.appendChild(overlay);
        }
        var iw = window.innerWidth || 0;
        var ih = window.innerHeight || 0;
        var cw = document.documentElement ? (document.documentElement.clientWidth || 0) : 0;
        var ch = document.documentElement ? (document.documentElement.clientHeight || 0) : 0;
        overlay.innerHTML =
            'VP: ' + vp.w + '×' + vp.h +
            ' | Scale: ' + scale.toFixed(4) +
            ' | Overscan: ' + (overscan * 100).toFixed(1) + '%' +
            '<br>innerW/H: ' + iw + '/' + ih +
            ' | clientW/H: ' + cw + '/' + ch +
            ' | screen: ' + (screen.width || 0) + '×' + (screen.height || 0) +
            ' | DPR: ' + (window.devicePixelRatio || 1);
    }

    /**
     * Initialize TV browser fixes
     */
    function initTVFixes() {
        // Single deferred repaint — avoid hammering the GPU on init
        setTimeout(forceRepaint, 500);
        
        // Handle visibility change (TV wake from sleep)
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                forceRepaint();
                scaleToFitDebounced();
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
        if (CONFIG.DEBUG) safeLog('Initializing KPV Gold Price Monitor...');
        
        // Scale to fit viewport — call once immediately, then debounced for events
        _scaleToFitNow();
        setTimeout(function() { _scaleToFitNow(); }, 300);
        window.addEventListener('resize', scaleToFitDebounced);
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', scaleToFitDebounced);
        }

        // -- Gentle polling --
        // Some TV browsers report stale viewport dimensions during boot.
        // Poll every 500 ms for up to 3 s; stop once stable for 2 checks.
        var pollInterval = CONFIG.SCALE_POLL_INTERVAL || 500;
        var pollDuration = CONFIG.SCALE_POLL_DURATION || 3000;
        var maxPolls = Math.ceil(pollDuration / pollInterval);
        var pollCount = 0;
        var stableCount = 0;
        var lastVP = { w: 0, h: 0 };

        var pollTimer = setInterval(function() {
            pollCount++;
            var vp = getViewportDimensions();

            if (vp.w !== lastVP.w || vp.h !== lastVP.h) {
                lastVP = vp;
                stableCount = 0;
                scaleToFitDebounced();
            } else {
                stableCount++;
            }

            if (stableCount >= 2 || pollCount >= maxPolls) {
                clearInterval(pollTimer);
                if (CONFIG.DEBUG) {
                    safeLog('Viewport poll done — stable at ' + lastVP.w + 'x' + lastVP.h);
                }
            }
        }, pollInterval);

        // Re-scale on full page load (images, fonts, etc.)
        window.addEventListener('load', function() {
            scaleToFitDebounced();
        });

        // Apply TV browser fixes
        initTVFixes();
        
        // Initial data fetch
        fetchPriceData();
        
        // Set up auto-refresh
        setInterval(fetchPriceData, CONFIG.REFRESH_INTERVAL);
        
        if (CONFIG.DEBUG) safeLog('Initialization complete');
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
