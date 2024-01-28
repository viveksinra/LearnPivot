// layout.js

import React from 'react';
import LayoutWrapper from './LayoutWrapper'; 
import  './globals.css';

export const metadata = {
  title: 'Chelmsford - Assisted Living Facility at Mahavir Narag, Araria',
  description: 'Best Assisted Living Facility for Elderly. Get Nutritious homestyle meals and furnished rooms. Emergency call system and 24-hour supervision. Low-impact wellness program in pool and spa. Games, walks, local visits, shopping and regular yoga activities. Grab all facilities at one place - Chelmsford. Call 984-617-3905',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper> 
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
