import React from 'react';

interface Results {
  startRecording: ()=>void, 
  results:string, 
  stopRecording: ()=>void, 
  error:string, 
  setIsRecording: (val: boolean) => void, 
  isRecording:boolean
}


export const useSpeechToText = (): Results => {
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const [results, setResults] = React.useState('');
  const [error, setError] = React.useState('');

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const SpeechGrammarList = (window as any).SpeechGrammarList || (window as any).webkitSpeechGrammarList;
  // const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  const startRecording=()=>{
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
  const stopRecording=()=>{
    console.log('stop recording');
    recognition.stop();
    setIsRecording(false);
  }
  
  return { startRecording, results, stopRecording, error, setIsRecording, isRecording };
}

