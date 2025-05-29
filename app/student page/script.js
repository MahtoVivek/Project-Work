   // Load students from localStorage with error handling
   let students = [];
   try {
       const stored = localStorage.getItem('students');
       if (stored) students = JSON.parse(stored);
       if (!Array.isArray(students)) students = [];
   } catch (e) {
       console.error('Error loading students:', e);
       students = [];
   }

   // Get DOM elements
   const studentForm = document.getElementById('studentForm');
   const nameInput = document.getElementById('name');
   const rollNoInput = document.getElementById('rollNo');
   const courseInput = document.getElementById('course');
   const sessionInput = document.getElementById('session');
   const phoneInput = document.getElementById('phone');
   const submitBtn = document.getElementById('submitBtn');
   const nameError = document.getElementById('nameError');
   const rollNoError = document.getElementById('rollNoError');
   const courseError = document.getElementById('courseError');
   const sessionError = document.getElementById('sessionError');
   const phoneError = document.getElementById('phoneError');
   const successMessage = document.getElementById('successMessage');
   const hamburger = document.querySelector('.hamburger');
   const navMenu = document.getElementById('navMenu');

   // Variable to track editing student ID
   let editId = null;

   // Check if editing a student
   window.onload = () => {
       const urlParams = new URLSearchParams(window.location.search);
       const editIndex = parseInt(urlParams.get('edit'));
       if (!isNaN(editIndex) && students[editIndex]) {
           const student = students[editIndex];
           nameInput.value = student.name;
           rollNoInput.value = student.rollNo;
           courseInput.value = student.course;
           sessionInput.value = student.session;
           phoneInput.value = student.phone;
           editId = student.id;
           submitBtn.textContent = 'Update Student';
       }
   };

   // Toggle hamburger menu
   hamburger.addEventListener('click', () => {
       navMenu.classList.toggle('active');
   });

   // Validate form inputs
   function validateForm() {
       let isValid = true;

       // Reset error messages
       nameError.style.display = 'none';
       rollNoError.style.display = 'none';
       courseError.style.display = 'none';
       sessionError.style.display = 'none';
       phoneError.style.display = 'none';

       // Validate name
       if (!nameInput.value.trim()) {
           nameError.style.display = 'block';
           isValid = false;
       }

       // Validate roll number (unique if not editing)
       const rollNoExists = students.some((student, index) => 
           student.rollNo === rollNoInput.value && 
           (editId ? student.id !== editId : true)
       );
       if (!rollNoInput.value.trim() || rollNoExists) {
           rollNoError.style.display = 'block';
           isValid = false;
       }

       // Validate course
       if (!courseInput.value.trim()) {
           courseError.style.display = 'block';
           isValid = false;
       }

       // Validate session
       if (!sessionInput.value.trim()) {
           sessionError.style.display = 'block';
           isValid = false;
       }

       // Validate phone number (10 digits)
       const phoneRegex = /^\d{10}$/;
       if (!phoneRegex.test(phoneInput.value)) {
           phoneError.style.display = 'block';
           isValid = false;
       }

       return isValid;
   }

   // Add or update student
   studentForm.addEventListener('submit', (e) => {
       e.preventDefault();

       if (validateForm()) {
           const student = {
               id: editId || Date.now().toString(),
               name: nameInput.value.trim(),
               rollNo: rollNoInput.value.trim(),
               course: courseInput.value.trim(),
               session: sessionInput.value.trim(),
               phone: phoneInput.value,
               updatedAt: new Date().toISOString() // Store update time
           };

           if (editId) {
               // Update existing student
               const index = students.findIndex(s => s.id === editId);
               if (index !== -1) students[index] = student;
               editId = null;
               submitBtn.textContent = 'Add Student';
           } else {
               // Add new student
               students.push(student);
           }

           // Save to localStorage with error handling
           try {
               localStorage.setItem('students', JSON.stringify(students));
           } catch (e) {
               console.error('Error saving students:', e);
               alert('Failed to save student data. Storage may be full.');
               return;
           }

           // Show success message
           successMessage.style.display = 'block';
           setTimeout(() => {
               successMessage.style.display = 'none';
           }, 3000);

           // Clear form
           studentForm.reset();
       }
   });

   // Cursor click animation
   document.addEventListener('click', (e) => {
       const ripple = document.createElement('div');
       ripple.classList.add('ripple');
       ripple.style.width = ripple.style.height = '50px';
       ripple.style.left = `${e.clientX - 25}px`;
       ripple.style.top = `${e.clientY - 25}px`;
       document.body.appendChild(ripple);
       setTimeout(() => ripple.remove(), 600);
   });