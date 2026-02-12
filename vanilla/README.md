# KPV Gold Price Monitor - Vanilla Version

A TV browser-compatible version of the Gold Price Monitor built with **plain HTML, CSS, and Vanilla JavaScript**.

## Why Vanilla?

This version removes all framework dependencies (React, Chakra UI, Tailwind) for maximum TV browser compatibility:

- ✅ No React/JSX compilation needed
- ✅ No CSS-in-JS that can fail to inject
- ✅ No modern JavaScript APIs (structuredClone, etc.)
- ✅ No module bundling required
- ✅ Works directly in any browser

## Project Structure

```
vanilla/
├── index.html      # Main HTML file
├── styles.css      # All styles (TV-optimized)
├── config.js       # Configuration (API URL, etc.)
├── calculations.js # Price calculation logic
├── app.js          # Main application logic
└── assets/         # Images
    ├── Watermark.png
    ├── Layer_1 (1).png
    ├── bar.png
    ├── jewelly.png
    ├── pv.png
    ├── kpvlogo.png
    └── easy gold.png
```

## Configuration

Edit `config.js` to set your API server:

```javascript
var CONFIG = {
    // Change this to your API server URL
    API_BASE_URL: 'https://your-api-server.com',
    
    // Refresh interval (milliseconds)
    REFRESH_INTERVAL: 30000,
    
    // Enable debug logging
    DEBUG: false
};
```

## Running Locally

### Option 1: Simple HTTP Server (Python)

```bash
cd vanilla
python3 -m http.server 8080
```

Then open: http://localhost:8080

### Option 2: Using Node.js

```bash
npx serve vanilla
```

### Option 3: Using VS Code Live Server

1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: Direct File Open

For testing without an API, you can open `index.html` directly in a browser (API calls will fail but you'll see the fallback UI).

## Deploying to TV

### Via Web Server

1. Upload the `vanilla` folder to any web server
2. Point your TV browser to the URL
3. The page will auto-refresh every 30 seconds

### Via USB (Samsung/LG TVs)

1. Copy the `vanilla` folder to a USB drive
2. Plug into TV
3. Open file browser and navigate to `index.html`

## TV Browser Compatibility Features

This version includes several TV-specific optimizations:

1. **Hardware Acceleration**
   - CSS transforms use `translateZ(0)` and `backface-visibility: hidden`

2. **Forced Repaints**
   - Multiple repaints triggered on load (100ms, 500ms, 1000ms)
   - Visibility change handler for TV wake-from-sleep

3. **Fallback Gradients**
   - Solid color fallbacks for browsers that don't support linear-gradient

4. **XMLHttpRequest**
   - Uses XHR instead of fetch() for older browser compatibility

5. **No ES6+ Features**
   - Uses `var` instead of `let/const`
   - No arrow functions in critical paths
   - No template literals in DOM manipulation

6. **Responsive Scaling**
   - Auto-scales from 1920x1080 to fit any screen size

## Customization

### Changing Colors

Edit `styles.css`:

```css
/* Main background gradient */
.background {
    background: radial-gradient(... your colors ...);
}

/* Header/row gradient */
.header-cell,
.row-label {
    background: linear-gradient(90deg, #961A1E 0%, #5C0C0D 100%);
}

/* Price row gradient */
.row-prices {
    background: linear-gradient(90deg, #B4812C 0%, #ECB82D 100%);
}
```

### Changing Labels

Edit `config.js`:

```javascript
var COMPOSITION_LABELS = {
    'one_baht': '1 ບາດ',
    'two_salung': '2 ສະຫຼຶງ',
    // ... modify as needed
};
```

### Adding New Price Rows

1. Add calculation in `calculations.js`
2. Add row in `app.js` processData function
3. Add label in `config.js`

## API Requirements

The app expects two API endpoints:

### V1 API: `/api/v1/price`
Returns:
```json
{
  "data": [
    {
      "one_baht_sale_price": 12345678,
      "one_baht_sale_price_gold_bar": 12345678,
      "one_baht_buy_price_gold_bar": 12345678,
      "one_baht_sale_price_gold_bar_kpv": 12345678,
      "one_baht_buy_price_gold_bar_kpv": 12345678,
      "show_date_time": "2024-01-15T10:30:00Z",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### V2 API: `/api/v2/price/current`
Returns:
```json
{
  "data": [
    {
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Troubleshooting

### Blank screen on TV?
1. Check browser console for errors
2. Verify API URL is accessible from TV network
3. Try disabling CORS on your API server for testing

### Prices not updating?
1. Check `CONFIG.API_BASE_URL` is correct
2. Verify API is returning data
3. Set `CONFIG.DEBUG = true` and check console

### Scaling issues?
The app is designed for 1920x1080. If your TV has different resolution, the scaling should handle it automatically. If not, check browser zoom settings.

## Comparison with React Version

| Feature | React Version | Vanilla Version |
|---------|--------------|-----------------|
| Bundle Size | ~500KB | ~30KB |
| Dependencies | React, Chakra, etc. | None |
| Build Required | Yes (Vite) | No |
| TV Compatibility | Medium | High |
| Maintenance | More complex | Simpler |

## License

Same as main project.
