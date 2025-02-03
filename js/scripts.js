document.addEventListener("DOMContentLoaded", function () {
    let currentLang = localStorage.getItem("selectedLanguage") || "en";
    const languageToggle = document.getElementById("language-toggle");


    document.body.style.visibility = "hidden";

    function setLanguage(lang) {
        localStorage.setItem("selectedLanguage", lang);

        document.querySelectorAll("[data-en], [data-es]").forEach(element => {
            const key = element.hasAttribute(`data-${lang}`) ? `data-${lang}` : "data-en";
            element.textContent = element.getAttribute(key);
        });

        languageToggle.textContent = lang === "en" ? "🇬🇧 Eng" : "🇨🇱 Esp";

        document.body.style.visibility = "visible";
    }

    languageToggle.addEventListener("click", function () {
        currentLang = currentLang === "en" ? "es" : "en";
        setLanguage(currentLang);
    });

    setLanguage(currentLang);
});