// Warte bis die Seite vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu
    const hamMenu = document.querySelector(".ham-menu");
    const offScreenMenu = document.querySelector(".off-screen-menu");
    
    if (hamMenu && offScreenMenu) {
        hamMenu.addEventListener("click", () => {
            hamMenu.classList.toggle("active");
            offScreenMenu.classList.toggle("active");
            document.body.classList.toggle("menu-open"); 
        });
    }


    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    
    // Nur ausführen wenn Lightbox existiert
    if (!lightbox || !lightboxImg) return;
    
    // Finde alle Projekt-Bilder
    const projectImages = document.querySelectorAll('.picture-big, .project-positioning-picture-description-grid img');
    
    console.log('Bilder gefunden:', projectImages.length);
    
    projectImages.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            console.log('Bild geklickt!');
            lightbox.style.display = 'block';
            lightboxImg.src = this.src;
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Schließen mit X
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Schließen mit Hintergrund-Klick
    lightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Nicht schließen bei Bild-Klick
    lightboxImg.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // ESC-Taste
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

async function submitForm(event) {
  event.preventDefault(); // Prevent default form submission
  
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
// Add your access key (replace with your actual key)
  data.accessKey = '9a1412b7394a4a4b11f8e109e97533c1ba5e267a5f9b9094a61aa3415aaa188d';

  try {
    const response = await fetch ('/server/api/submit', {
      method: 'POST',      
      headers: {      
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },     
      body: JSON.stringify(data)
});

const result = await response.json();
   
if(result.status === 'success') {   
  console.log('Form submitted successfully!', result);
  form.reset();  
  alert('Form submitted successfully!');
} else {
  console.error('Form submission failed:', result);    
  alert('Error: ' + (result.message || 'Submission failed'));   
} 
} catch(error) {
  console.error('Network error submitting form:', error);   
  alert('Network error. Please try again.'); 
  }
}


// Attach the handler to your form (ensure form has id="contactForm")
const contactForm = document.getElementById('contactForm');
if(contactForm) { contactForm.addEventListener('submit', submitForm); 

}

 const form = document.getElementById('contact-form');

    form.addEventListener('submit', function(event) {
        // Formular normal absenden
        // Eventuell kurz verhindern, falls du es validieren willst:
        // event.preventDefault();

        // Nach Absenden auf Dankeseite weiterleiten
        setTimeout(() => {
            window.location.href = 'merci.html'; // Name deiner Dankeseite
        }, 100); // kurzer Timeout, damit das Formular noch abgeschickt wird
    });



