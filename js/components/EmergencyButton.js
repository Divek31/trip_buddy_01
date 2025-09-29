const { useState, useEffect } = React;

function getRiskLevel(weather) {
    if (!weather) return { level: 'green', label: 'Safe', emoji: '🟢' };
    const main = weather.weather?.[0]?.main?.toLowerCase() || '';
    const temp = weather.main?.temp;
    // High risk
    if (
        main.includes('thunderstorm') ||
        main.includes('tornado') ||
        main.includes('extreme') ||
        main.includes('flood') ||
        main.includes('hurricane') ||
        main.includes('storm') ||
        main.includes('landslide') ||
        (typeof temp === 'number' && (temp < 275.15 || temp > 315.15)) // <2°C or >42°C
    ) {
        return { level: 'red', label: 'High Risk', emoji: '🔴' };
    }
    // Medium risk
    if (
        main.includes('fog') ||
        main.includes('mist') ||
        main.includes('rain') ||
        main.includes('drizzle') ||
        (typeof temp === 'number' && (temp < 278.15 || temp > 311.15)) // <5°C or >38°C
    ) {
        return { level: 'orange', label: 'Medium Risk', emoji: '🟠' };
    }
    // Safe
    return { level: 'green', label: 'Safe', emoji: '🟢' };
}

function EmergencyButton({ weather, fetchWeather }) {
    const [showAlert, setShowAlert] = useState(false);
    const [risk, setRisk] = useState(getRiskLevel(weather));

    useEffect(() => {
        setRisk(getRiskLevel(weather));
    }, [weather]);

    // Optionally poll weather every 5 min
    useEffect(() => {
        if (!fetchWeather) return;
        const interval = setInterval(() => fetchWeather(), 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [fetchWeather]);

    return (
        <>
            <div
                className={`fixed bottom-6 left-6 z-50 flex flex-col items-center`}
                style={{ cursor: 'pointer' }}
            >
                <button
  className={`flex items-center justify-center rounded-full shadow-lg w-20 h-20 text-3xl font-bold border-4 border-white focus:outline-none transition-all animate-bounce bg-white ${
    risk.level === 'green'
      ? 'text-green-600'
      : risk.level === 'orange'
      ? 'text-orange-500'
      : 'text-red-600'
  }`}
  title={`Emergency Alert: ${risk.label}`}
  onClick={() => setShowAlert(true)}
>
  {risk.emoji}
</button>

                <span className={`mt-2 text-xs font-semibold ${risk.level === 'green' ? 'text-green-600' : risk.level === 'orange' ? 'text-orange-500' : 'text-red-600'}`}>{risk.label}</span>
            </div>
            {showAlert && (
                <EmergencyAlert onClose={() => setShowAlert(false)} />
            )}
        </>
    );
}

window.EmergencyButton = EmergencyButton;
