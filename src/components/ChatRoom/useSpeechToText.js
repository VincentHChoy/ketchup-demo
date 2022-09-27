import React from 'react';

export const useSpeechToText = () => {
  const [isRecording, setIsRecording] = React.useState(false);
  const [results, setResults] = React.useState('');
  const [error, setError] = React.useState('');

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
  // const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  

  const startRecording = () => {
    console.log('start recording');
    recognition.start();
    setIsRecording(true);
    setResults('');
    setError('');
    console.log('Ready to receive a color command.');

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      console.log(result);
      setResults(result);
    }

    recognition.onnomatch = () => {
      setError('Error converting speech to text');
    }
  }

  const stopRecording = () => {
    console.log('stop recording');
    recognition.stop();
    setIsRecording(false);
  }

  return { startRecording, results, stopRecording, error, setIsRecording, isRecording };
}