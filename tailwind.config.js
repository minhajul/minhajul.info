const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: [
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/**/*.js'
    ],

    theme: {
        extend: {},
    },

    variants: {},

    plugins: [
        require('@tailwindcss/forms')
    ],
};
