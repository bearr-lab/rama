import type { Preview } from '@storybook/react';
import React from 'react';
import '../app/globals.css';

const preview: Preview = {
  decorators: [
    (Story: any) => (
      <div
        className="font-sans antialiased"
        style={
          {
            '--font-sans': '"Inter", "Noto Sans Arabic", system-ui, sans-serif',
            '--font-display': '"Playfair Display", serif',
            '--font-arabic': '"Noto Sans Arabic", sans-serif',
          } as React.CSSProperties
        }
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#faf9f6' },
        { name: 'dark', value: '#14151a' },
      ],
    },
  },
};

export default preview;
