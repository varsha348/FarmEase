document.addEventListener('DOMContentLoaded', function() {
    // Service Selection
    const serviceCards = document.querySelectorAll('.service-card');
    const summaryService = document.getElementById('summaryService');
    const summaryTotal = document.getElementById('summaryTotal');
    const baseRate = document.getElementById('baseRate');
    
    // Pricing (in Indian Rupees)
    const servicePricing = {
        equipment: 2500,    // ₹2,500 per hour for equipment rental
        storage: 5000,      // ₹5,000 per hour for storage space
        transport: 3500,    // ₹3,500 per hour for transportation
        consultation: 1500  // ₹1,500 per hour for consultation
    };

    let selectedService = null;
    let selectedDate = null;
    let selectedTime = null;
    let selectedDuration = null;

    // Service Selection
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            serviceCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedService = this.dataset.service;
            const serviceName = this.querySelector('h3').textContent;
            document.getElementById('summaryService').textContent = serviceName;
            document.getElementById('baseRate').textContent = `₹${servicePricing[selectedService].toLocaleString('en-IN')}`;
            updateTimeSlots();
            updateTotal();
            checkBookingComplete();
        });
    });

    // Calendar Implementation
    const calendar = {
        currentDate: new Date(),
        selectedDate: null,
        
        init: function() {
            this.updateCalendar();
            document.getElementById('prevMonth').addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.updateCalendar();
            });
            document.getElementById('nextMonth').addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.updateCalendar();
            });
        },

        updateCalendar: function() {
            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth();
            
            // Update header
            document.getElementById('currentMonth').textContent = 
                new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
            
            // Clear existing calendar days
            const calendarGrid = document.querySelector('.calendar-grid');
            const dayHeaders = document.querySelectorAll('.calendar-day-header');
            calendarGrid.innerHTML = '';
            dayHeaders.forEach(header => calendarGrid.appendChild(header.cloneNode(true)));
            
            // Add empty cells for days before first of month
            const firstDay = new Date(year, month, 1).getDay();
            for(let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day disabled';
                calendarGrid.appendChild(emptyDay);
            }
            
            // Add days of month
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const today = new Date();
            
            for(let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                
                const currentDate = new Date(year, month, day);
                
                // Disable past dates
                if (currentDate < today) {
                    dayElement.classList.add('disabled');
                } else {
                    dayElement.addEventListener('click', () => {
                        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                        dayElement.classList.add('selected');
                        this.selectedDate = currentDate;
                        selectedDate = currentDate;
                        document.getElementById('summaryDate').textContent = 
                            currentDate.toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric' });
                        updateTimeSlots();
                        checkBookingComplete();
                    });
                }
                
                calendarGrid.appendChild(dayElement);
            }
        }
    };

    // Initialize calendar
    calendar.init();

    // Time Slots Management
    function updateTimeSlots() {
        if (!selectedDate || !selectedService) return;

        const timeSlotsGrid = document.querySelector('.time-slots-grid');
        timeSlotsGrid.innerHTML = '';

        // Generate time slots from 8 AM to 6 PM
        const timeSlots = [
            '08:00', '09:00', '10:00', '11:00', '12:00',
            '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
        ];

        timeSlots.forEach(time => {
            const slot = document.createElement('div');
            slot.className = 'time-slot';
            
            // Check if slot is available (you can implement actual availability check here)
            const isAvailable = Math.random() > 0.3; // Simulated availability
            
            if (isAvailable) {
                slot.classList.add('available');
                slot.innerHTML = `
                    <span class="time">${time}</span>
                    <span class="status">Available</span>
                `;
                slot.addEventListener('click', () => {
                    document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                    slot.classList.add('selected');
                    selectedTime = time;
                    document.getElementById('summaryTime').textContent = time;
                    checkBookingComplete();
                    
                    // Show booking details preview
                    updateBookingPreview();
                });
            } else {
                slot.classList.add('unavailable');
                slot.innerHTML = `
                    <span class="time">${time}</span>
                    <span class="status">Booked</span>
                `;
            }
            
            timeSlotsGrid.appendChild(slot);
        });
    }

    function updateBookingPreview() {
        const previewBox = document.querySelector('.booking-preview');
        if (!previewBox) {
            const preview = document.createElement('div');
            preview.className = 'booking-preview';
            preview.innerHTML = `
                <h3>Booking Preview</h3>
                <div class="preview-details">
                    <p><strong>Service:</strong> <span id="previewService"></span></p>
                    <p><strong>Date:</strong> <span id="previewDate"></span></p>
                    <p><strong>Time:</strong> <span id="previewTime"></span></p>
                    <p><strong>Duration:</strong> <span id="previewDuration"></span></p>
                    <p><strong>Total:</strong> <span id="previewTotal"></span></p>
                </div>
            `;
            document.querySelector('.booking-section.booking-details').appendChild(preview);
        }
        
        // Update preview details
        document.getElementById('previewService').textContent = document.getElementById('summaryService').textContent;
        document.getElementById('previewDate').textContent = document.getElementById('summaryDate').textContent;
        document.getElementById('previewTime').textContent = selectedTime;
        document.getElementById('previewDuration').textContent = `${selectedDuration} hour(s)`;
        document.getElementById('previewTotal').textContent = document.getElementById('summaryTotal').textContent;
    }

    // Duration Selection
    const durationSelect = document.getElementById('duration');
    durationSelect.addEventListener('change', function() {
        selectedDuration = this.value;
        document.getElementById('summaryDuration').textContent = 
            this.value === '24' ? 'Full day' : `${this.value} hour${this.value > 1 ? 's' : ''}`;
        updateTotal();
        checkBookingComplete();
    });

    // Update Total Price
    function updateTotal() {
        if (selectedService && selectedDuration) {
            const basePrice = servicePricing[selectedService];
            const total = basePrice * parseInt(selectedDuration);
            // Format in Indian currency style
            summaryTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
        } else {
            summaryTotal.textContent = '₹0';
        }
    }

    // Form Validation
    const bookingForm = document.getElementById('bookingForm');
    const formInputs = bookingForm.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('input', checkBookingComplete);
    });

    // Check if booking is complete
    function checkBookingComplete() {
        const confirmButton = document.getElementById('confirmBooking');
        const isFormValid = Array.from(formInputs).every(input => {
            return !input.required || input.value.trim() !== '';
        });
        
        confirmButton.disabled = !(
            selectedService &&
            selectedDate &&
            selectedTime &&
            selectedDuration &&
            isFormValid
        );
    }

    // Confirm Booking
    document.getElementById('confirmBooking').addEventListener('click', function() {
        if (this.disabled) return;
        
        const serviceDetails = document.getElementById('serviceDetails').value;
        
        // Create booking confirmation modal
        const modal = document.createElement('div');
        modal.className = 'booking-confirmation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Booking Confirmed!</h2>
                <div class="confirmation-details">
                    <p><strong>Booking ID:</strong> ${generateBookingId()}</p>
                    <p><strong>Service:</strong> ${document.getElementById('summaryService').textContent}</p>
                    <p><strong>Service Details:</strong> ${serviceDetails || 'No specific requirements'}</p>
                    <p><strong>Date:</strong> ${document.getElementById('summaryDate').textContent}</p>
                    <p><strong>Time:</strong> ${selectedTime}</p>
                    <p><strong>Duration:</strong> ${selectedDuration} hour(s)</p>
                    <p><strong>Base Rate:</strong> ${document.getElementById('baseRate').textContent}/hour</p>
                    <p><strong>Total Amount:</strong> ${document.getElementById('summaryTotal').textContent}</p>
                </div>
                <button class="close-modal">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
            resetBookingForm();
        });
    });

    function generateBookingId() {
        return 'BK-' + Date.now().toString().slice(-6);
    }

    // Reset Form
    function resetBookingForm() {
        // Reset selections
        selectedService = null;
        selectedDate = null;
        selectedTime = null;
        selectedDuration = null;
        
        // Reset UI
        serviceCards.forEach(card => card.classList.remove('selected'));
        document.querySelectorAll('.calendar-day').forEach(day => day.classList.remove('selected'));
        document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
        bookingForm.reset();
        
        // Reset summary
        summaryService.textContent = 'Not selected';
        document.getElementById('summaryDate').textContent = 'Not selected';
        document.getElementById('summaryTime').textContent = 'Not selected';
        document.getElementById('summaryDuration').textContent = 'Not selected';
        summaryTotal.textContent = '₹0';
        baseRate.textContent = '';
        
        // Disable confirm button
        document.getElementById('confirmBooking').disabled = true;
    }
});
