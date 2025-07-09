// Initialize Charts
document.addEventListener('DOMContentLoaded', function() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue (₹)',
                data: [900000, 1400000, 1100000, 1875000, 1650000, 1875000],  // Values in ₹
                borderColor: '#2ecc71',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(46, 204, 113, 0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '₹' + context.raw.toLocaleString('en-IN');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        callback: function(value) {
                            return '₹' + (value/100000).toFixed(1) + 'L';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Crop Distribution Chart
    const cropCtx = document.getElementById('cropChart').getContext('2d');
    const cropChart = new Chart(cropCtx, {
        type: 'doughnut',
        data: {
            labels: ['Rice', 'Wheat', 'Corn', 'Vegetables', 'Fruits'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    '#2ecc71',
                    '#3498db',
                    '#f1c40f',
                    '#e74c3c',
                    '#9b59b6'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    // Profile Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const profileSections = document.querySelectorAll('.profile-section');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update active section
            profileSections.forEach(section => {
                if (section.classList.contains(targetTab + '-profile')) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });

    // Profile Interactions
    // Edit Profile Button
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            // TODO: Implement edit profile modal
            alert('Edit profile functionality coming soon!');
        });
    }

    // Edit Avatar
    const editAvatarBtn = document.querySelector('.edit-avatar');
    if (editAvatarBtn) {
        editAvatarBtn.addEventListener('click', function() {
            // TODO: Implement avatar upload
            alert('Avatar upload functionality coming soon!');
        });
    }

    // Profile Navigation
    const profileNavLinks = document.querySelectorAll('.profile-nav-link');
    profileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            profileNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // TODO: Implement profile section switching
            const targetSection = this.getAttribute('data-section');
            console.log('Switching to section:', targetSection);
        });
    });

    // Verification Status Updates
    const verificationItems = document.querySelectorAll('.verification-item:not(.verified)');
    verificationItems.forEach(item => {
        item.addEventListener('click', function() {
            // TODO: Implement verification process
            alert('Verification process will be implemented soon!');
        });
    });

    // Edit Profile Button Handler
    const editProfileBtns = document.querySelectorAll('.edit-profile-btn');
    editProfileBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // TODO: Implement edit profile functionality
            alert('Edit profile functionality coming soon!');
        });
    });

    // Contact Button Handler
    const contactBtns = document.querySelectorAll('.contact-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // TODO: Implement contact functionality
            alert('Contact functionality coming soon!');
        });
    });
});

// Notifications Toggle
document.querySelector('.notifications').addEventListener('click', function() {
    alert('You have 3 new notifications');
});

// Messages Toggle
document.querySelector('.messages').addEventListener('click', function() {
    alert('You have 5 unread messages');
});

// Search Functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    // Add your search logic here
});

// Sidebar Navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.nav-links li').forEach(li => {
            li.classList.remove('active');
        });
        
        // Add active class to clicked link's parent li
        this.parentElement.classList.add('active');
        
        // Add your navigation logic here
        const section = this.getAttribute('href').substring(1);
        console.log(`Navigating to ${section}`);
    });
});

// Add animation to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Update real-time data (simulated)
function updateDashboardData() {
    const revenue = document.querySelector('.card:nth-child(1) .number');
    const orders = document.querySelector('.card:nth-child(2) .number');
    const storage = document.querySelector('.card:nth-child(3) .number');
    const deliveries = document.querySelector('.card:nth-child(4) .number');
    
    // Simulate real-time updates
    setInterval(() => {
        // Update revenue
        let currentRevenue = parseInt(revenue.textContent.replace('₹', '').replace(',', ''));
        currentRevenue += Math.floor(Math.random() * 10000);
        revenue.textContent = '₹' + currentRevenue.toLocaleString('en-IN');
        
        // Update orders
        let currentOrders = parseInt(orders.textContent);
        if (Math.random() > 0.7) {
            currentOrders += 1;
            orders.textContent = currentOrders;
        }
        
        // Update storage
        let currentStorage = parseInt(storage.textContent.replace('%', ''));
        currentStorage += Math.floor(Math.random() * 3) - 1;
        currentStorage = Math.max(0, Math.min(100, currentStorage));
        storage.textContent = currentStorage + '%';
        
        // Update deliveries
        let currentDeliveries = parseInt(deliveries.textContent);
        if (Math.random() > 0.8) {
            currentDeliveries += 1;
            deliveries.textContent = currentDeliveries;
        }
    }, 5000);
}

// Start real-time updates
updateDashboardData();
