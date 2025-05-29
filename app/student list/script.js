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
 const studentTableBody = document.getElementById('studentTableBody');
 const noData = document.getElementById('noData');
 const hamburger = document.querySelector('.hamburger');
 const navMenu = document.getElementById('navMenu');

 // Toggle hamburger menu
 hamburger.addEventListener('click', () => {
     navMenu.classList.toggle('active');
 });

 // Sort table by name
 let sortDirection = 1;
 function sortTable() {
     students.sort((a, b) => {
         const nameA = a.name.toLowerCase();
         const nameB = b.name.toLowerCase();
         return sortDirection * (nameA < nameB ? -1 : nameA > nameB ? 1 : 0);
     });
     sortDirection *= -1;
     renderTable();
 }

 // Render the student table
 function renderTable() {
     studentTableBody.innerHTML = '';
     if (students.length === 0) {
         noData.style.display = 'block';
         return;
     }
     noData.style.display = 'none';
     students.forEach((student, index) => {
         const updatedAt = new Date(student.updatedAt).toLocaleString('en-US', {
             year: 'numeric',
             month: 'long',
             day: 'numeric',
             hour: '2-digit',
             minute: '2-digit'
         });
         const row = document.createElement('tr');
         row.innerHTML = `
             <td>${student.name}</td>
             <td>${student.rollNo}</td>
             <td>${student.course}</td>
             <td>${student.session}</td>
             <td>${student.phone}</td>
             <td>${updatedAt}</td>
             <td>
                 <button class="action-btn edit-btn" onclick="editStudent('${student.id}')">Edit</button>
                 <button class="action-btn delete-btn" onclick="deleteStudent('${student.id}')">Delete</button>
             </td>
         `;
         studentTableBody.appendChild(row);
     });
 }

 // Edit a student (redirect to index.html with index)
 function editStudent(id) {
     const index = students.findIndex(student => student.id === id);
     if (index !== -1) {
         window.location.href = `index.html?edit=${index}`;
     }
 }

 // Delete a student
 function deleteStudent(id) {
     if (confirm('Are you sure you want to delete this student?')) {
         students = students.filter(student => student.id !== id);
         try {
             localStorage.setItem('students', JSON.stringify(students));
         } catch (e) {
             console.error('Error saving students:', e);
             alert('Failed to save changes. Storage may be full.');
         }
         renderTable();
     }
 }

 // Initial render of the table
 renderTable();