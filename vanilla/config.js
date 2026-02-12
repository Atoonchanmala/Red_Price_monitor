/**
 * Configuration for KPV Gold Price Monitor
 * Change these values according to your environment
 */

var CONFIG = {
    // API Base URL - Change this to your API server
    API_BASE_URL: 'https://prod-api.kpvgroup.com/price-and-comition-service',
    
    // API Endpoints
    API_V1_PATH: '/api/v1/price',
    API_V2_PATH: '/api/v2/price/current',
    
    // Refresh interval in milliseconds (30 seconds)
    REFRESH_INTERVAL: 30000,
    
    // Design dimensions
    DESIGN_WIDTH: 1920,
    DESIGN_HEIGHT: 1080,
    
    // Enable debug logging
    DEBUG: false
};

// Label mappings for composition rows
var COMPOSITION_LABELS = {
    'one_baht': '1 ບາດ',
    'two_salung': '2 ສະຫຼຶງ',
    'one_salung': '1 ສະຫຼຶງ',
    'five_hun': '5 ຫຸນ',
    'three_hun': '3 ຫຸນ',
    'two_hun': '2 ຫຸນ',
    'one_hun': '1 ຫຸນ'
};

// Label mappings for gold bar rows
var GOLDBAR_LABELS = {
    'one_baht': '1 ບາດ',
    'one_gram': '1 ກຣາມ'
};

// Fallback data when API is not available
var FALLBACK_COMPOSITION = [
    { label: '1 ບາດ', sell: '—', buy: '—' },
    { label: '2 ສະຫຼຶງ', sell: '—', buy: '—' },
    { label: '1 ສະຫຼຶງ', sell: '—', buy: '—' },
    { label: '5 ຫຸນ', sell: '—', buy: '—' },
    { label: '3 ຫຸນ', sell: '—', buy: '—' },
    { label: '2 ຫຸນ', sell: '—', buy: '—' },
    { label: '1 ຫຸນ', sell: '—', buy: '—' }
];

var FALLBACK_GOLDBAR = [
    { label: '1 ບາດ', sell: '—', buy: '—' },
    { label: '1 ກຣາມ', sell: '—', buy: '—' }
];
