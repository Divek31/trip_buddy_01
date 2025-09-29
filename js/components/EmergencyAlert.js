const { useState, useEffect } = React;

const EMERGENCY_CONTACTS = [
    { name: 'Police', number: '100', type: 'police' },
    { name: 'Fire Department', number: '101', type: 'fire' },
    { name: 'Ambulance', number: '102', type: 'ambulance' },
    { name: 'Disaster Management', number: '108', type: 'disaster' },
];

const SAFETY_INSTRUCTIONS = {
    police: 'Stay calm, find a safe place, and wait for help to arrive.',
    fire: 'Evacuate the area immediately. Do not use elevators. Cover your nose and mouth.',
    ambulance: 'Keep the patient calm and safe. Provide first aid if possible.',
    disaster: 'Move to higher ground if flooding. Avoid landslide-prone areas. Follow official instructions.',
    default: 'Stay safe and follow official instructions.'
};

function EmergencyAlert({ onClose }) {
    const [location, setLocation] = useState(null);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const { t } = React.useContext(LanguageContext);

    useEffect(() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            (pos) => setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            () => setLocation(null)
        );
    }, []);

    function handleSend(contact) {
        setSending(true);
        setSelected(contact);
        setTimeout(() => {
            setSending(false);
            setSent(true);
        }, 1500);
    }

    const handleVoiceCommand = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Sorry, your browser does not support voice commands.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = I18n.language === 'hi' ? 'hi-IN' : 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setIsListening(true);

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            const foundContact = EMERGENCY_CONTACTS.find(c => command.includes(c.type));
            
            if (foundContact) {
                handleSend(foundContact);
            } else {
                alert(`Sorry, I didn't understand "${command}". Please say "Police", "Fire", or "Ambulance".`);
            }
        };

        recognition.onspeechend = () => {
            recognition.stop();
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            setIsListening(false);
            alert(`Error occurred in recognition: ${event.error}`);
        };

        recognition.start();
    };

    function getMapUrl() {
        if (!location) return '';
        return `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lon}#map=16/${location.lat}/${location.lon}`;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn">
                <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl" onClick={onClose}>&times;</button>
                <h2 className="text-2xl font-bold mb-4 text-red-700 text-center">{t('emergency_modal_title')}</h2>
                <div className="mb-4 text-center">
                    {location ? (
                        <>
                            <div className="mb-2 text-sm text-gray-600">Your Location:</div>
                            <div className="mb-2 text-blue-700 font-semibold">Lat: {location.lat.toFixed(4)}, Lon: {location.lon.toFixed(4)}</div>
                            <a href={getMapUrl()} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-xs">View on Map</a>
                        </>
                    ) : (
                        <div className="text-gray-500 text-sm mb-2">Location not available</div>
                    )}
                </div>
                <div className="mb-4">
                    <div className="font-semibold mb-2">Emergency Contacts</div>
                    <ul>
                        {EMERGENCY_CONTACTS.map((c) => (
                            <li key={c.number} className="mb-2">
                                <button
                                    className="w-full py-2 rounded bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-lg hover:scale-105 transition-all"
                                    disabled={sending || sent}
                                    onClick={() => handleSend(c)}
                                >
                                    {c.name} ({c.number})
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="my-4 text-center">
                    <button
                        onClick={handleVoiceCommand}
                        disabled={isListening || sending || sent}
                        className="w-full py-2 rounded bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold text-lg hover:scale-105 transition-all disabled:from-gray-400 disabled:to-gray-500"
                    >
                        {isListening ? (
                            <><i className="fas fa-microphone-alt fa-beat-fade mr-2"></i>{t('listening')}</>
                        ) : (
                            <><i className="fas fa-microphone-alt mr-2"></i>{t('use_voice_command')}</>
                        )}
                    </button>
                    {isListening && (
                        <p className="text-sm text-gray-500 mt-2">{t('voice_prompt')}</p>
                    )}
                </div>
                {sending && (
                    <div className="text-center text-orange-600 font-semibold mb-2">Sending help request...</div>
                )}
                {sent && selected && (
                    <div className="text-center text-green-600 font-semibold mb-2">Help request sent to {selected.name}!</div>
                )}
                {selected && (
                    <div className="mt-4 p-3 bg-gray-100 rounded text-gray-700 text-sm">
                        <div className="font-bold mb-1">Safety Instructions:</div>
                        {SAFETY_INSTRUCTIONS[selected.type] || SAFETY_INSTRUCTIONS.default}
                    </div>
                )}
            </div>
        </div>
    );
}

window.EmergencyAlert = EmergencyAlert;
