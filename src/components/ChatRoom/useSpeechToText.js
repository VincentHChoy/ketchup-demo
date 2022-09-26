"use strict";
exports.__esModule = true;
exports.useSpeechToText = void 0;
var react_1 = require("react");
var useSpeechToText = function () {
    var _a = react_1["default"].useState(false), isRecording = _a[0], setIsRecording = _a[1];
    var _b = react_1["default"].useState(''), results = _b[0], setResults = _b[1];
    var _c = react_1["default"].useState(''), error = _c[0], setError = _c[1];
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    // const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    var startRecording = function () {
        console.log('start recording');
        recognition.start();
        setIsRecording(true);
        setResults('');
        setError('');
        console.log('Ready to receive a color command.');
        recognition.onresult = function (event) {
            var result = event.results[0][0].transcript;
            console.log(result);
            setResults(result);
        };
        recognition.onnomatch = function () {
            setError('Error converting speech to text');
        };
    };
    var stopRecording = function () {
        console.log('stop recording');
        recognition.stop();
        setIsRecording(false);
    };
    return { startRecording: startRecording, results: results, stopRecording: stopRecording, error: error, setIsRecording: setIsRecording, isRecording: isRecording };
};
exports.useSpeechToText = useSpeechToText;
