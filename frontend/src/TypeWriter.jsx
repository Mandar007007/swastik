import { useState, useEffect } from 'react';

const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Typing logic goes here
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      
      return () => {
        clearTimeout(timeout)
    };
    }
  }, [currentIndex, delay, text]);

  return (
    <>
        {currentText}
    </>
  )
};

export default Typewriter;

Typewriter.js

Typewriter.js
