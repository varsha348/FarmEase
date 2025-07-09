// Sample user data (replace with actual backend integration)
const userData = {
    firstName: 'Sindhu',
    lastName: 'Rathod',
    email: 'SindhuRathod@example.com',
    phone: '+91 9876543210',
    farmType: 'Crop Farming',
    location: 'Telangana, India',
    memberSince: '2024-01-15',
    totalBookings: 12,
    averageRating: 4.5,
    recentActivity: [
        {
            type: 'booking',
            service: 'Tractor Rental',
            date: '2024-12-10',
            status: 'completed'
        },
        {
            type: 'review',
            service: 'Equipment Maintenance',
            date: '2024-12-05',
            rating: 5
        }
    ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();
    setupEventListeners();
});

// Load user profile data
function loadUserProfile() {
    // Update profile overview
    document.getElementById('userName').textContent = `${userData.firstName} ${userData.lastName}`;
    document.getElementById('userFarmType').textContent = userData.farmType;
    document.getElementById('totalBookings').textContent = userData.totalBookings;
    document.getElementById('averageRating').textContent = userData.averageRating.toFixed(1);
    document.getElementById('memberSince').textContent = formatDate(userData.memberSince);

    // Update personal information
    document.getElementById('firstName').textContent = userData.firstName;
    document.getElementById('lastName').textContent = userData.lastName;
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('userPhone').textContent = userData.phone;
    document.getElementById('detailedFarmType').textContent = userData.farmType;
    document.getElementById('userLocation').textContent = userData.location;

    // Load recent activity
    loadRecentActivity();
}

// Load recent activity
function loadRecentActivity() {
    const activityList = document.getElementById('recentActivity');
    activityList.innerHTML = '';

    userData.recentActivity.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';

        let icon, actionText;
        if (activity.type === 'booking') {
            icon = 'calendar-check';
            actionText = `Booked ${activity.service}`;
        } else if (activity.type === 'review') {
            icon = 'star';
            actionText = `Rated ${activity.service}`;
        }

        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="activity-details">
                <p class="activity-text">${actionText}</p>
                <span class="activity-date">${formatDate(activity.date)}</span>
            </div>
            ${activity.type === 'review' ? 
                `<div class="activity-rating">
                    ${generateStars(activity.rating)}
                </div>` : 
                `<div class="activity-status ${activity.status}">
                    ${activity.status}
                </div>`
            }
        `;
        activityList.appendChild(activityItem);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Edit profile button
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    editProfileBtn.addEventListener('click', openEditProfileModal);

    // Close modal button
    const closeModalBtn = document.querySelector('.close-modal');
    closeModalBtn.addEventListener('click', closeEditProfileModal);

    // Cancel button in modal
    const cancelBtn = document.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', closeEditProfileModal);

    // Edit profile form submission
    const editProfileForm = document.getElementById('editProfileForm');
    editProfileForm.addEventListener('submit', handleProfileUpdate);

    // Profile image change
    const changePhotoBtn = document.querySelector('.change-photo-btn');
    changePhotoBtn.addEventListener('click', handleProfilePhotoChange);
}

// Open edit profile modal
function openEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    
    // Pre-fill form with current data
    document.getElementById('editFirstName').value = userData.firstName;
    document.getElementById('editLastName').value = userData.lastName;
    document.getElementById('editPhone').value = userData.phone;
    document.getElementById('editLocation').value = userData.location;
    document.getElementById('editFarmType').value = userData.farmType.toLowerCase().replace(' farming', '');

    modal.style.display = 'block';
}

// Close edit profile modal
function closeEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    modal.style.display = 'none';
}

// Handle profile update
function handleProfileUpdate(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const updatedData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        phone: formData.get('phone'),
        location: formData.get('location'),
        farmType: formData.get('farmType')
    };

    // Update user data (replace with actual API call)
    Object.assign(userData, updatedData);
    
    // Refresh profile display
    loadUserProfile();
    
    // Close modal
    closeEditProfileModal();

    // Show success message
    showNotification('Profile updated successfully!');
}

// Handle profile photo change
function handleProfilePhotoChange() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('profileImage').src = event.target.result;
                // Here you would typically upload the image to your server
            };
            reader.readAsDataURL(file);
        }
    };

    input.click();
}

// Helper function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Helper function to generate star ratings
function generateStars(rating) {
    return Array(5).fill(0).map((_, index) => 
        `<i class="fas fa-star${index < rating ? '' : '-o'}"></i>`
    ).join('');
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Add to document
    document.body.appendChild(notification);

    // Remove after animation
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
