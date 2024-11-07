

module.exports = {
  // @see   https://tailwindcss.com/docs/upcoming-changes
    future: {
      removeDeprecatedGapUtilities: true,
      purgeLayersByDefault: true,
    },
    content: [
      './src/components/**/*.js',
      './pages/**/*.js'],
    theme: {
      fontSize: {
        pers:'0.6rem',
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
        '6xl': '4.052rem',
      },
  
       
       
      extend: {
        height: {
          'almost-screen': 'calc(-16rem + 100vh)',
          '308px': '19.25rem',
          'sliderlg': '100vh',
          'slidersm': '100vh',
          'gallerysm': '47rem',
          'galleryxsm': '37rem',
          '600': '600px',
        },
        width: {
          '600': '600px',
        },
        purplebt:{
          DEFAULT: '#783ea8',
        },
        
        backdropBlur: {
          '14': '14px',
        },
        colors: {
          transparent: 'transparent',
          current: 'currentColor',
         
        'custom-dark': '#190000cc',
       
          blue: {
           
            DEFAULT: '#1e1e1e',
            
          },
          purple: {
            DEFAULT: '#e44244'
          },
          very_peri: {
            DEFAULT: '#ffffff'
          },
          very_peri_dark: {
            DEFAULT: '#413f5d'
          },
          pink: {
            light: '#e44244',
            DEFAULT: '#e44244',
            dark: '#e44244',
          },
          text_grey: {
           
            DEFAULT: '#222222',
          
          },
          text_title:{
            DEFAULT: '#333333',
          },
          bottons:{
            DEFAULT: '#ffbb56',
          },
          bottons_hover:{
            DEFAULT: '#ffd597',
          },
          gray: {
            darkest: '#1f2d3d',
            dark: '#3c4858',
            DEFAULT: '#c0ccda',
            light: '#e0e6ed',
            lightest: '#f9fafc',
          }
        },
        width: {
          '308px': '19.25rem',
          '600px': '37.5rem',
        },
       
      },
    },
    variants: {},
    plugins: [
      require( 'tailwindcss' ),
     
      require( 'autoprefixer' )
    ]
  }