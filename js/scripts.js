document.addEventListener("DOMContentLoaded", function () {
    let currentLang = localStorage.getItem("selectedLanguage") || "en";
    const languageToggle = document.getElementById("language-toggle");
    const title = document.getElementById('title');

    document.body.style.visibility = "hidden";

    function setLanguage(lang) {
        currentLang = lang;
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


    function alternateName() {
        const title = document.getElementById('title');
        const currentText = title.textContent;
        const originalSpanishName = title.dataset.es;
        const originalEnglishName = title.dataset.en;
        const englishNickname = "I'm Zprit3";
        const spanishNickname = "Soy Zprit3";
    
        title.style.opacity = 0;
    
        requestAnimationFrame(() => {
            if (currentText === originalSpanishName) {
                title.textContent = spanishNickname;
            } else if (currentText === originalEnglishName) {
                title.textContent = englishNickname;
            } else if (currentText === englishNickname) {
                title.textContent = originalEnglishName;
            } else if (currentText === spanishNickname) {
                title.textContent = originalSpanishName;
            }
    
            requestAnimationFrame(() => { // Otro requestAnimationFrame para la opacidad
                title.style.opacity = 1;
            });
        });
    }

    setInterval(alternateName, 5000); // Ejecutar cada 3 segundos

});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


document.querySelector('.contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            alert('¡Mensaje enviado con éxito!');
            form.reset();
        } else {
            alert('Hubo un problema al enviar el mensaje. Intenta de nuevo.');
        }
    } catch (error) {
        alert('Error al conectar con el servidor.');
    }
});