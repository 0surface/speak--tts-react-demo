import { useEffect, useState } from 'react';
import Speech from 'speak-tts';

const SpeakerTts = () => {
    const [supportStatus, setSupportStatus] = useState(
        'Your browser does NOT support speech synthesis. Try using Chrome of Safari instead !'
    );
    const init = () => {
        const speech = new Speech();
        speech
            .init({
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
            })
            .then((data) => {
                console.log('Speech is ready', data);
                //_addVoicesList(data.voices);
                //_prepareSpeakButton(speech);
                handlePlay(speech);
            })
            .catch((e) => {
                console.error('An error occured while initializing : ', e);
            });
        speech.hasBrowserSupport() &&
            setSupportStatus('Hurray, your browser supports speech synthesis');
    };

    useEffect(() => {
        init();
    }, []);

    const handlePlay = (speech) => {
        console.log('oh hi playing!');
        speech
            .speak({
                text: 'hello, therr is something here that you need to speak out loud.',
                listeners: {
                    onstart: () => {
                        console.log('Start utterance');
                    },
                    onend: () => {
                        console.log('End utterance');
                    },
                    onresume: () => {
                        console.log('Resume utterance');
                    },
                    onboundary: (event) => {
                        console.log(
                            event.name +
                                ' boundary reached after ' +
                                event.elapsedTime +
                                ' milliseconds.'
                        );
                    },
                },
            })
            .then((data) => {
                console.log('Success !', data);
            })
            .catch((e) => {
                console.error('An error occurred :', e);
            });
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
                    style={{ width: '500px', height: '300px' }}
                ></textarea>
                <div>
                    <button onClick={handlePlay}>Play</button>
                    <button onClick={handlePause}>Pause</button>
                    <button onClick={handleResume}>Resume</button>
                </div>
            </section>
        </div>
    );

    return content;
};

export default SpeakerTts;
