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

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


document.querySelector('.contact-form').addEventListener('submit', (e) => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        e.preventDefault();
        alert('Por favor, completa todos los campos.');
    }
});