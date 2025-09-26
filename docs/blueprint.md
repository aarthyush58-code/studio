# **App Name**: QuickScan: Mobile Checkout

## Core Features:

- Camera Interface: Display a live video feed from the device's camera using the navigator.mediaDevices.getUserMedia API.
- Simulated Product Recognition: Simulate product recognition by randomly selecting products from a predefined, hardcoded database upon user interaction. A tool for the Scan feature may utilize reasoning and dynamically update parameters of what is a matching result, if the intial 'scan' is inconclusive.
- Shopping Cart Management: Manage the shopping cart by allowing users to add, remove, and view items.
- Real-time Totals Display: Display real-time updates of the total number of items and the total cost in the cart.
- Remove Item Functionality: Enable users to remove individual items from the cart using a 'Remove' button next to each item.
- Clear Cart Functionality: Provide a 'Clear Cart' button to empty the entire list of items.
- Feedback Messages: Display animated 'Scanning...' and 'Product Added!' messages to provide visual feedback during product scanning.

## Style Guidelines:

- Primary color: Soft Blue (#A0D2EB) for a light and user-friendly feel, reminiscent of clear skies and trust.
- Background color: Light gray (#F0F4F8), very close in hue to the primary, but highly desaturated.
- Accent color: Light Orange (#FFB347) to highlight CTAs and interactive elements, standing apart in saturation and brightness.
- Body and headline font: 'PT Sans' for a modern, readable, and slightly warm feel, suitable for all text elements.
- Mobile-first design with a responsive layout that adapts to different screen sizes using Tailwind CSS.
- Simple, minimalist icons for cart actions, ensuring clarity and ease of use.
- Subtle animations for scanning feedback and cart updates to enhance the user experience.