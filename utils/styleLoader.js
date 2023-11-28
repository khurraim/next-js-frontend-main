// utils/styleLoader.js
export function importCSS(styles) {
    styles.forEach((style) => {
      import(style);
    });
  }
  
  export function unloadCSS(styles) {
    styles.forEach((style) => {
      const styleElement = document.querySelector(`link[href*="${style}"]`);
      if (styleElement) {
        styleElement.parentNode.removeChild(styleElement);
      }
    });
  }
  