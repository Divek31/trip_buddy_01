// TripBuddy - Internationalization (i18n) and Localization (l10n)

const translations = {
    en: {
        // Navbar
        home: 'Home',
        destinations: 'Destinations',
        my_bookings: 'My Bookings',
        login: 'Login',
        logout: 'Logout',
        // Hero
        hero_title: 'Namaste! Discover Incredible India',
        hero_subtitle: 'Plan smarter trips with AI-powered recommendations and cost calculations',
        search_placeholder: 'Enter destination ',
        search_button: '     Search Destinations   ',
        ai_decide_text: "or, what's your mood?",
        ai_decide_button: 'Let AI Decide',
        // Emergency
        emergency_button_title: 'Emergency Alert',
        emergency_modal_title: 'Emergency Alert',
        use_voice_command: 'Use Voice Command',
        listening: 'Listening...',
        voice_prompt: 'Say "Police", "Fire", or "Ambulance" to send an alert.',
        // Categories
        adventure: 'Adventure',
        religious: 'Religious Places',
        historical: 'Historical & Heritage',
        nature: 'Nature & Wildlife',
        beaches: 'Beaches',
        food_culture: 'Food & Culture',
        hill_stations: 'Hill Stations',
        more_categories: 'More...',
        show_less: 'Show Less',
        // New Categories
        deserts: 'Deserts & Dunes',
        lakes_rivers: 'Lakes & Rivers',
        islands: 'Islands',
        urban_escapes: 'Urban Escapes',
        villages: 'Villages & Countryside',
        wellness: 'Wellness & Ayurveda',
        festivals: 'Festivals & Fairs',
        road_trips: 'Road Trips',
        international: 'International Trips',
    },
    hi: {
        // Navbar
        home: 'होम',
        destinations: 'गंतव्य',
        my_bookings: 'मेरी बुकिंग',
        login: 'लॉग इन करें',
        logout: 'लॉग आउट करें',
        // Hero
        hero_title: 'नमस्ते! अतुल्य भारत की खोज करें',
        hero_subtitle: 'AI-संचालित सिफारिशों और लागत गणनाओं के साथ बेहतर यात्राओं की योजना बनाएं',
        search_placeholder: 'गंतव्य दर्ज करें (जैसे दिल्ली, शिमला...)',
        search_button: 'गंतव्य खोजें',
        ai_decide_text: "या, आपका मूड कैसा है?",
        ai_decide_button: 'AI को तय करने दें',
        // Emergency
        emergency_button_title: 'आपातकालीन चेतावनी',
        emergency_modal_title: 'आपातकालीन चेतावनी',
        use_voice_command: 'वॉयस कमांड का प्रयोग करें',
        listening: 'सुन रहा है...',
        voice_prompt: 'अलर्ट भेजने के लिए "पुलिस", "फायर", या "एम्बुलेंस" कहें।',
        // Categories
        adventure: 'साहसिक',
        religious: 'धार्मिक स्थल',
        historical: 'ऐतिहासिक और विरासत',
        nature: 'प्रकृति और वन्यजीव',
        beaches: 'समुद्र तट',
        food_culture: 'भोजन और संस्कृति',
        hill_stations: 'हिल स्टेशन',
        more_categories: 'और देखें...',
        show_less: 'कम दिखाएं',
        // New Categories
        deserts: 'रेगिस्तान और टीले',
        lakes_rivers: 'झीलें और नदियाँ',
        islands: 'द्वीप',
        urban_escapes: 'शहरी छुट्टियाँ',
        villages: 'गाँव और ग्रामीण इलाके',
        wellness: 'कल्याण और आयुर्वेद',
        festivals: 'त्योहार और मेले',
        road_trips: 'सड़क यात्राएं',
        international: 'अंतर्राष्ट्रीय यात्राएं',
    }
};

const I18n = {
    language: 'en',

    setLanguage: (lang) => {
        I18n.language = lang;
        // In a full app, you'd trigger a re-render here.
        // With our setup, components will re-render when language state changes.
    },

    t: (key) => {
        return translations[I18n.language]?.[key] || translations['en'][key] || key;
    }
};

window.I18n = I18n;
window.translations = translations;