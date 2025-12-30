const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
  document.body.classList.toggle("menu-open"); 
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