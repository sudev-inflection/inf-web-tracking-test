# TrackFlow Test Website

A multi-page static website designed for testing website tracking tools and analytics implementations. This website mimics a typical SaaS marketing landing page with various interactive elements and forms that can be used to test tracking functionality.

## Features

- Responsive design that works on all devices
- Multiple pages with different layouts and content
- Various forms for testing form submission tracking:
  - Newsletter signup form
  - Demo request form
  - Pricing tier signup forms
  - Contact form
- Interactive elements for testing user behavior tracking
- Clean, modern UI with consistent styling

## Pages

1. **Homepage** (`index.html`)
   - Hero section with CTA buttons
   - Features overview
   - Newsletter signup form

2. **Features** (`features.html`)
   - Detailed feature descriptions
   - Demo request form
   - Feature comparison

3. **Pricing** (`pricing.html`)
   - Three pricing tiers
   - Signup forms for each tier
   - FAQ section

4. **Contact** (`contact.html`)
   - Contact information
   - Contact form
   - Support options

## Setup

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Open any of the HTML files in your browser to view the website.

## Testing Website Tracking

This website is designed to help test various aspects of website tracking:

- **Page Views**: Test tracking of page visits across different pages
- **Form Submissions**: Test form submission tracking with various forms
- **User Interactions**: Test tracking of button clicks and other interactions
- **Navigation**: Test tracking of user navigation between pages
- **Responsive Design**: Test tracking across different device sizes

## Adding Your Tracking Script

To add your tracking script:

1. Open any of the HTML files
2. Add your tracking script in the `<head>` section:
   ```html
   <head>
       <!-- Your tracking script here -->
       <script src="path/to/your/tracking.js"></script>
   </head>
   ```

## Development

The website is built with:
- HTML5
- CSS3 (with modern features like Grid and Flexbox)
- No JavaScript (to keep it simple for testing)

## License

This project is open source and available for testing purposes.

## Contributing

Feel free to fork this repository and modify it for your specific tracking testing needs. 