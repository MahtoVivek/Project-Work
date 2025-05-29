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
 const studentCount = document.getElementById('studentCount');
 const hamburger = document.querySelector('.hamburger');
 const navMenu = document.getElementById('navMenu');

 // Toggle hamburger menu
 hamburger.addEventListener('click', () => {
     navMenu.classList.toggle('active');
 });

 // Update student count
 studentCount.textContent = students.length;