document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const startBtn = document.getElementById('startBtn');
    const symptomForm = document.getElementById('symptomForm');
    const loadingState = document.getElementById('loadingState');
    const resultsSection = document.getElementById('resultsSection');
    const generateBtn = document.getElementById('generateBtn');
    const newCheckBtn = document.getElementById('newCheckBtn');
    const printBtn = document.getElementById('printBtn');
    const saveBtn = document.getElementById('saveBtn');
    const shareBtn = document.getElementById('shareBtn');
    const symptomInput = document.getElementById('symptomInput');
    const addSymptomBtn = document.getElementById('addSymptomBtn');
    const symptomTags = document.getElementById('symptomTags');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const contactForm = document.getElementById('contactForm');
    
    // Sample data for demonstration
    const diagnoses = [
        { name: "acute sinusitis", severity: "moderate", action: "home care" },
        { name: "migraine", severity: "moderate", action: "medication" },
        { name: "tension headache", severity: "mild", action: "home care" },
        { name: "common cold", severity: "mild", action: "home care" },
        { name: "influenza", severity: "moderate", action: "see doctor" },
        { name: "allergic rhinitis", severity: "mild", action: "medication" },
        { name: "gastroenteritis", severity: "moderate", action: "home care" }
    ];

    const medications = [
        { name: "Acetaminophen (Tylenol)", dosage: "500mg every 6 hours as needed for pain/fever" },
        { name: "Ibuprofen (Advil)", dosage: "200-400mg every 6-8 hours as needed for pain/fever" },
        { name: "Pseudoephedrine (Sudafed)", dosage: "30mg every 6 hours for congestion (max 4 days)" },
        { name: "Diphenhydramine (Benadryl)", dosage: "25-50mg every 4-6 hours as needed for allergies" },
        { name: "Loratadine (Claritin)", dosage: "10mg once daily for allergies" },
        { name: "Omeprazole (Prilosec)", dosage: "20mg once daily for heartburn" }
    ];

    const homeCare = [
        { name: "Nasal Saline Irrigation", instructions: "Use a neti pot or saline spray 2-3 times daily" },
        { name: "Hydration", instructions: "Drink plenty of fluids to thin mucus" },
        { name: "Rest", instructions: "Get adequate sleep to support immune function" },
        { name: "Steam Inhalation", instructions: "Breathe in steam from hot water to relieve congestion" },
        { name: "Warm Compress", instructions: "Apply to affected area for 15-20 minutes to relieve pain" },
        { name: "Gargle Salt Water", instructions: "Mix 1/2 teaspoon salt in warm water to soothe throat" }
    ];

    // Navigation functionality
    function switchPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        document.getElementById(pageId).classList.add('active');
        
        // Close mobile menu if open
        mobileMenu.classList.add('hidden');
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
        });
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Set home as default page
    switchPage('home');

    // Event Listeners
    startBtn.addEventListener('click', function() {
        switchPage('home');
        setTimeout(() => {
            symptomForm.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    });

    generateBtn.addEventListener('click', function() {
        // Validate form
        const primarySymptom = document.getElementById('primarySymptom').value;
        if (!primarySymptom) {
            showAlert('Please enter at least your primary symptom', 'error');
            return;
        }
        
        // Show loading state
        symptomForm.classList.add('hidden');
        loadingState.classList.remove('hidden');
        
        // Simulate API call with timeout
        setTimeout(function() {
            loadingState.classList.add('hidden');
            
            // Generate random diagnosis for demo
            const randomDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];
            const randomMeds = [...medications].sort(() => 0.5 - Math.random()).slice(0, 2);
            const randomHomeCare = [...homeCare].sort(() => 0.5 - Math.random()).slice(0, 3);
            
            // Update results
            document.getElementById('diagnosisText').innerHTML = 
                `Based on your symptoms, you may be experiencing <span class="font-semibold text-blue-600">${randomDiagnosis.name}</span>.`;
            
            document.getElementById('severityText').innerHTML = 
                `Your condition appears to be <span class="font-semibold text-yellow-600">${randomDiagnosis.severity}</span> in severity.`;
            
            let actionText = "";
            if (randomDiagnosis.action === "see doctor") {
                actionText = "You should consult a healthcare provider for proper evaluation and treatment.";
            } else if (randomDiagnosis.action === "medication") {
                actionText = "This can likely be managed with over-the-counter medications.";
            } else {
                actionText = "This can likely be managed at home, but see a doctor if symptoms worsen or persist beyond 10 days.";
            }
            document.getElementById('actionText').textContent = actionText;
            
            // Update medications
            const medsList = document.getElementById('medicationsList');
            medsList.innerHTML = '';
            randomMeds.forEach((med, index) => {
                medsList.innerHTML += `
                    <li class="flex items-start">
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mr-3">${index + 1}</span>
                        <div>
                            <p class="font-medium">${med.name}</p>
                            <p class="text-sm text-gray-600">${med.dosage}</p>
                        </div>
                    </li>
                `;
            });
            
            // Update home care
            const homeCareList = document.getElementById('homeCareList');
            homeCareList.innerHTML = '';
            randomHomeCare.forEach((care, index) => {
                homeCareList.innerHTML += `
                    <li class="flex items-start">
                        <span class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded mr-3">${index + 1}</span>
                        <div>
                            <p class="font-medium">${care.name}</p>
                            <p class="text-sm text-gray-600">${care.instructions}</p>
                        </div>
                    </li>
                `;
            });
            
            // Show results with animation
            resultsSection.classList.remove('hidden');
            resultsSection.classList.add('fade-in');
            
            // Scroll to results
            setTimeout(() => {
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }, 2000);
    });

    newCheckBtn.addEventListener('click', function() {
        // Reset form
        document.getElementById('primarySymptom').value = '';
        document.getElementById('symptomInput').value = '';
        document.getElementById('duration').value = '';
        document.querySelector('input[name="severity"]:checked')?.removeAttribute('checked');
        document.getElementById('notes').value = '';
        symptomTags.innerHTML = '';
        
        // Hide results and show form
        resultsSection.classList.add('hidden');
        symptomForm.classList.remove('hidden');
        
        // Scroll to form
        symptomForm.scrollIntoView({ behavior: 'smooth' });
    });

    printBtn.addEventListener('click', function() {
        window.print();
    });

    saveBtn.addEventListener('click', function() {
        showAlert('Report saved to your account', 'success');
    });

    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'My MediQuick Health Report',
                text: 'Check out my health report generated by MediQuick AI Symptom Checker',
                url: window.location.href
            }).catch(err => {
                showAlert('Error sharing: ' + err, 'error');
            });
        } else {
            showAlert('Web Share API not supported in your browser', 'info');
        }
    });

    // Symptom tag functionality
    addSymptomBtn.addEventListener('click', addSymptomTag);
    symptomInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addSymptomTag();
        }
    });

    function addSymptomTag() {
        const symptom = symptomInput.value.trim();
        if (symptom) {
            const tag = document.createElement('div');
            tag.className = 'symptom-chip bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center';
            tag.innerHTML = `
                ${symptom}
                <button class="ml-2 text-blue-600 hover:text-blue-800">
                    <i class="fas fa-times text-xs"></i>
                </button>
            `;
            
            tag.querySelector('button').addEventListener('click', function() {
                tag.remove();
            });
            
            symptomTags.appendChild(tag);
            symptomInput.value = '';
        }
    }

    // FAQ accordion functionality
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle answer visibility
            answer.classList.toggle('hidden');
            
            // Rotate icon
            icon.classList.toggle('rotate-180');
        });
    });

    // Contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real app, you would send this data to your server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        showAlert('Your message has been sent successfully! We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });

    // Show alert function
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        let bgColor = 'bg-blue-100 text-blue-800';
        
        if (type === 'error') {
            bgColor = 'bg-red-100 text-red-800';
        } else if (type === 'success') {
            bgColor = 'bg-green-100 text-green-800';
        } else if (type === 'info') {
            bgColor = 'bg-blue-100 text-blue-800';
        }
        
        alertDiv.className = `fixed top-4 right-4 ${bgColor} px-6 py-3 rounded-lg shadow-lg flex items-center z-50`;
        alertDiv.innerHTML = `
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : type === 'success' ? 'fa-check-circle' : 'fa-info-circle'} mr-3"></i>
            ${message}
            <button class="ml-4">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        alertDiv.querySelector('button').addEventListener('click', function() {
            alertDiv.remove();
        });
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
});
