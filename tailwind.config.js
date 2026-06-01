import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
    content: [ './resources/js/**/*.tsx' ],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#09090b', // Deep Carbon
                    card: '#121214', // Slightly lighter
                    border: '#27272a', // Subtle gray
                    primary: '#3b82f6', // Electric Blue
                }
            }
        },
    },
};
