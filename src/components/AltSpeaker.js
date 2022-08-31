import { useEffect, useState, useRef } from 'react';
import Speech from 'speak-tts';

import TextChunker from '../util/textChunker';

const SpeakerTts = () => {
    const [supportStatus, setSupportStatus] = useState(
        'Your browser does NOT support speech synthesis. Try using Chrome of Safari instead !'
    );
    const [currspeech, setCurrSpeech] = useState(null);
    const textInputRef = useRef();
    const [textInput, setTextInput] = useState();

    const langRef = useRef();
    const [selectedLang, setSelectedLang] = useState();
    const [langOptions, setLangOptions] = useState([]);

    const SpeechSynthesis = () => {
        const speech = new Speech();
        speech.init({
            volume: 0.5,
            lang: 'en-GB',
            rate: 1,
            pitch: 1,
            voice: 'Google UK English Male',
            splitSentences: false,
            listeners: {
                onvoiceschanged: (voices) => {
                    console.log('Voices changed', voices);
                },
            },
        });
        return speech;
    };
    useEffect(() => {
        const init = () => {
            const speech = new Speech();

            speech.hasBrowserSupport() &&
                setSupportStatus(
                    'Hurray, your browser supports speech synthesis'
                );
        };
    }, []);

    const speak = (utternace) => {
        const speechUtternace = SpeechSynthesis();
        speechUtternace
            .speak({
                text: utternace,
            })
            .then(() => {
                console.log('Success !');
            })
            .catch((e) => {
                console.error('An error occurred :', e);
            });
        // currspeech
        //     .speak({
        //         text: utternace,
        //         listeners: {
        //             onstart: () => {
        //                 console.log('Start utterance');
        //             },
        //             onend: () => {
        //                 console.log('End utterance');
        //             },
        //             onresume: () => {
        //                 console.log('Resume utterance');
        //             },
        //             onboundary: (event) => {
        //                 console.log(
        //                     event.name +
        //                         ' boundary reached after ' +
        //                         event.elapsedTime +
        //                         ' milliseconds.'
        //                 );
        //             },
        //         },
        //     })
        //     .then(() => {
        //         console.log('Success !');
        //     })
        //     .catch((e) => {
        //         console.error('An error occurred :', e);
        //     });
    };

    const handlePlay = (e) => {
        console.log('oh hi playing!', e);
        console.log('currspeech', currspeech);
        e.preventDefault();

        const utternaceArray = TextChunker(textInputRef.current.value, 250);

        console.log('utternaceArray', utternaceArray);

        utternaceArray.forEach((utter) => {
            speak(utter);
        });
    };

    const _addVoicesList = (voices) => {
        //console.log('langOptions', langOptions);
        let arr = [];
        voices.forEach((voice) => {
            arr.push(
                `<option value="${voice.lang}" data-name="${voice.name}">${voice.name} (${voice.lang})</option>`
            );
        });
        setLangOptions(arr);
        console.log('langOptions', langOptions);
    };

    const handlePause = () => {
        return console.log('Paused');
    };

    const handleResume = () => {
        return console.log('Resuming...');
    };

    let content;
    content = (
        <div className="App">
            <h1>Speech Synthesis</h1>
            <h2 id="supported">{supportStatus}</h2>
            <section>
                <textarea
                    id="text"
                    ref={textInputRef}
                    value={textInput}
                    onChange={handlePlay}
                    style={{ width: '500px', height: '300px' }}
                ></textarea>
                <div>
                    <button onClick={handlePlay}>Play</button>
                    <button onClick={handlePause}>Pause</button>
                    <button onClick={handleResume}>Resume</button>
                </div>
            </section>
            <section>
                <select id="languages" ref={langRef} options={langOptions}>
                    <option value={selectedLang}>autodetect language</option>
                    {langOptions}
                </select>
            </section>
        </div>
    );

    return content;
};

export default SpeakerTts;
