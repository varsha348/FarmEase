// Sample user data (replace with actual backend integration)
let users = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        farmType: 'Crop Farming',
        registrationDate: '2024-01-15',
        status: 'active'
    },
    // Add more sample users as needed
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateUserStats();
    displayUsers();
    setupEventListeners();
});

// Update user statistics
function updateUserStats() {
    document.getElementById('totalUsers').textContent = users.length;
    const newUsers = users.filter(user => {
        const regDate = new Date(user.registrationDate);
        const currentDate = new Date();
        return regDate.getMonth() === currentDate.getMonth() &&
               regDate.getFullYear() === currentDate.getFullYear();
    }).length;
    document.getElementById('newUsers').textContent = newUsers;
    
    const activeUsers = users.filter(user => user.status === 'active').length;
    document.getElementById('activeUsers').textContent = activeUsers;
}

// Display users in the table
function displayUsers() {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${user.id}</td>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.farmType}</td>
            <td>${formatDate(user.registrationDate)}</td>
            <td><span class="status-badge ${user.status}">${user.status}</span></td>
            <td>
                <button class="action-btn view-btn" data-id="${user.id}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit-btn" data-id="${user.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" data-id="${user.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('userSearch').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredUsers = users.filter(user => 
            user.firstName.toLowerCase().includes(searchTerm) ||
            user.lastName.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
        displayFilteredUsers(filteredUsers);
    });

    // View user details
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = this.dataset.id;
            showUserDetails(userId);
        });
    });

    // Export functionality
    document.querySelector('.export-btn').addEventListener('click', exportUsers);
}

// Show user details in modal
function showUserDetails(userId) {
    const user = users.find(u => u.id === parseInt(userId));
    if (!user) return;

    const modal = document.getElementById('userModal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <div class="user-detail-grid">
            <div class="detail-group">
                <label>Full Name</label>
                <p>${user.firstName} ${user.lastName}</p>
            </div>
            <div class="detail-group">
                <label>Email</label>
                <p>${user.email}</p>
            </div>
            <div class="detail-group">
                <label>Phone</label>
                <p>${user.phone}</p>
            </div>
            <div class="detail-group">
                <label>Farm Type</label>
                <p>${user.farmType}</p>
            </div>
            <div class="detail-group">
                <label>Registration Date</label>
                <p>${formatDate(user.registrationDate)}</p>
            </div>
            <div class="detail-group">
                <label>Status</label>
                <p><span class="status-badge ${user.status}">${user.status}</span></p>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Helper function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Export users to CSV
function exportUsers() {
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Farm Type', 'Registration Date', 'Status'];
    const csvContent = [
        headers.join(','),
        ...users.map(user => [
            user.id,
            user.firstName,
            user.lastName,
            user.email,
            user.phone,
            user.farmType,
            user.registrationDate,
            user.status
        ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'farmease-users.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Display filtered users
function displayFilteredUsers(filteredUsers) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';

    filteredUsers.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${user.id}</td>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.farmType}</td>
            <td>${formatDate(user.registrationDate)}</td>
            <td><span class="status-badge ${user.status}">${user.status}</span></td>
            <td>
                <button class="action-btn view-btn" data-id="${user.id}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit-btn" data-id="${user.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" data-id="${user.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
