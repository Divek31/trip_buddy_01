// LanguageContext to provide i18n functionality throughout the app

const LanguageContext = React.createContext();

const LanguageProvider = ({ children }) => {
    const [language, setLanguageState] = React.useState(StorageUtils.get('language', 'en'));

    const setLanguage = (lang) => {
        I18n.setLanguage(lang);
        StorageUtils.set('language', lang);
        setLanguageState(lang);
    };

    // Set initial language
    I18n.setLanguage(language);

    const t = (key) => I18n.t(key);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};