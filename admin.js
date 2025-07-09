document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const modal = document.getElementById('bookingDetailsModal');
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const searchInput = document.querySelector('.search-bar input');
    const serviceFilter = document.getElementById('serviceFilter');
    const statusFilter = document.getElementById('statusFilter');
    const dateFilter = document.getElementById('dateFilter');
    const refreshBtn = document.querySelector('.refresh-btn');
    const exportBtn = document.querySelector('.export-btn');

    // Sample booking data (replace with actual data from backend)
    const bookings = [
        {
            id: 'BK001',
            service: 'Tractor Rental',
            serviceIcon: 'tractor',
            customer: {
                name: 'John Doe',
                avatar: 'assets/user1.jpg'
            },
            datetime: '2024-02-20 09:00 AM',
            duration: '4 hours',
            status: 'pending',
            amount: 10000  // ₹10,000
        },
        // Add more sample bookings here
    ];

    // Modal Functions
    function openModal(bookingId) {
        const booking = bookings.find(b => b.id === bookingId);
        if (booking) {
            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = generateBookingDetails(booking);
            modal.classList.add('active');
        }
    }

    function closeModal() {
        modal.classList.remove('active');
    }

    function generateBookingDetails(booking) {
        return `
            <div class="booking-details">
                <div class="detail-group">
                    <h3>Booking Information</h3>
                    <p><strong>Booking ID:</strong> #${booking.id}</p>
                    <p><strong>Service:</strong> ${booking.service}</p>
                    <p><strong>Date & Time:</strong> ${booking.datetime}</p>
                    <p><strong>Duration:</strong> ${booking.duration}</p>
                    <p><strong>Amount:</strong> ₹${booking.amount.toLocaleString('en-IN')}</p>
                    <p><strong>Status:</strong> <span class="status ${booking.status}">${booking.status}</span></p>
                </div>
                <div class="detail-group">
                    <h3>Customer Information</h3>
                    <p><strong>Name:</strong> ${booking.customer.name}</p>
                    <p><strong>Email:</strong> john.doe@example.com</p>
                    <p><strong>Phone:</strong> +1 234 567 8900</p>
                </div>
                <div class="detail-group">
                    <h3>Additional Notes</h3>
                    <p>Special requirements or notes from the customer will appear here.</p>
                </div>
            </div>
        `;
    }

    // Event Listeners
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // View booking details
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookingId = this.closest('tr').querySelector('td').textContent.replace('#', '');
            openModal(bookingId);
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterBookings();
    });

    // Filter functionality
    [serviceFilter, statusFilter, dateFilter].forEach(filter => {
        filter.addEventListener('change', filterBookings);
    });

    function filterBookings() {
        const searchTerm = searchInput.value.toLowerCase();
        const service = serviceFilter.value;
        const status = statusFilter.value;
        const date = dateFilter.value;

        // Implement filtering logic here
        console.log('Filtering bookings:', { searchTerm, service, status, date });
    }

    // Refresh button
    refreshBtn.addEventListener('click', function() {
        // Implement refresh logic here
        console.log('Refreshing booking data...');
    });

    // Export functionality
    exportBtn.addEventListener('click', function() {
        // Implement export logic here
        console.log('Exporting booking data...');
    });

    // Edit booking
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookingId = this.closest('tr').querySelector('td').textContent.replace('#', '');
            // Implement edit logic here
            console.log('Editing booking:', bookingId);
        });
    });

    // Delete/Cancel booking
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookingId = this.closest('tr').querySelector('td').textContent.replace('#', '');
            if (confirm('Are you sure you want to cancel this booking?')) {
                // Implement delete/cancel logic here
                console.log('Cancelling booking:', bookingId);
            }
        });
    });

    // Pagination
    document.querySelectorAll('.pagination button').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('active') && !this.disabled) {
                document.querySelector('.pagination button.active')?.classList.remove('active');
                this.classList.add('active');
                // Implement pagination logic here
                console.log('Loading page:', this.textContent);
            }
        });
    });
});
