document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const listingsGrid = document.getElementById('listingsGrid');
    const addListingModal = document.getElementById('addListingModal');
    const listingForm = document.getElementById('listingForm');

    // Base64 placeholder for default crop image
    const defaultCropImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAEAAAITAAMAAAABAAEAAAAAAAAAAAAASAAAAAEAAABIAAAAAf/Y/+AAEEpGSUYAAQEAAAEAAQAA/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgAgACAAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9mooorQkKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9k=';

    // Sample crop data
    const crops = [
        {
            name: 'Premium Quality Wheat',
            category: 'grains',
            location: 'Punjab, India',
            quantity: '500',
            price: '2500',
            description: 'High-quality wheat grain, perfect for flour production',
            image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
            postedDate: '2 days ago'
        },
        {
            name: 'Fresh Tomatoes',
            category: 'vegetables',
            location: 'Maharashtra, India',
            quantity: '200',
            price: '40',
            description: 'Farm-fresh, organically grown tomatoes',
            image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
            postedDate: '1 day ago'
        },
        {
            name: 'Organic Rice',
            category: 'grains',
            location: 'West Bengal, India',
            quantity: '1000',
            price: '3200',
            description: 'Premium Basmati rice, naturally grown',
            image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
            postedDate: '3 days ago'
        },
        {
            name: 'Fresh Mangoes',
            category: 'fruits',
            location: 'Uttar Pradesh, India',
            quantity: '300',
            price: '80',
            description: 'Sweet and juicy Alphonso mangoes',
            image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
            postedDate: '12 hours ago'
        },
        {
            name: 'Green Chillies',
            category: 'spices',
            location: 'Andhra Pradesh, India',
            quantity: '100',
            price: '60',
            description: 'Fresh and spicy green chillies',
            image: 'https://images.unsplash.com/photo-1588891557811-5f9464cf4d04?w=400',
            postedDate: '5 hours ago'
        },
        {
            name: 'Yellow Dal',
            category: 'pulses',
            location: 'Madhya Pradesh, India',
            quantity: '400',
            price: '110',
            description: 'High-quality yellow dal (split peas)',
            image: 'https://images.unsplash.com/photo-1585996952441-d0013bd1b13d?w=400',
            postedDate: '1 day ago'
        },
        {
            name: 'Fresh Potatoes',
            category: 'vegetables',
            location: 'Himachal Pradesh, India',
            quantity: '800',
            price: '25',
            description: 'Farm-fresh potatoes from the hills',
            image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
            postedDate: '2 days ago'
        },
        {
            name: 'Organic Turmeric',
            category: 'spices',
            location: 'Kerala, India',
            quantity: '150',
            price: '180',
            description: 'Pure organic turmeric powder',
            image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400',
            postedDate: '4 days ago'
        },
        {
            name: 'Red Onions',
            category: 'vegetables',
            location: 'Karnataka, India',
            quantity: '600',
            price: '35',
            description: 'Fresh red onions, medium size',
            image: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=400',
            postedDate: '1 day ago'
        },
        {
            name: 'Green Peas',
            category: 'pulses',
            location: 'Uttar Pradesh, India',
            quantity: '250',
            price: '90',
            description: 'Fresh green peas from the farm',
            image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400',
            postedDate: '3 days ago'
        }
    ];

    // Filter listings based on search and category
    function filterListings() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value.toLowerCase();
        
        const filteredCrops = crops.filter(crop => {
            const matchesSearch = crop.name.toLowerCase().includes(searchTerm);
            const matchesCategory = !selectedCategory || crop.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        displayListings(filteredCrops);
    }

    // Display listings in the grid
    function displayListings(cropsToDisplay) {
        listingsGrid.innerHTML = cropsToDisplay.map(crop => `
            <div class="listing-card" data-category="${crop.category}">
                <div class="listing-image">
                    <img src="${crop.image}" 
                        alt="${crop.name}"
                        onerror="this.onerror=null; this.src='${defaultCropImage}'; this.parentElement.classList.add('error')"
                        onload="this.parentElement.classList.remove('error')"
                    >
                    <span class="category-tag">${crop.category.charAt(0).toUpperCase() + crop.category.slice(1)}</span>
                </div>
                <div class="listing-details">
                    <h3>${crop.name}</h3>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${crop.location}</p>
                    <p class="description">${crop.description}</p>
                    <p class="quantity">Quantity: ${crop.quantity} kg</p>
                    <p class="price">₹${crop.price} per ${crop.category === 'grains' ? 'quintal' : 'kg'}</p>
                    <div class="listing-footer">
                        <button class="contact-btn" onclick="contactSeller('${crop.name}')">Contact Seller</button>
                        <span class="posted-date">Posted ${crop.postedDate}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Add image loading error handlers
        document.querySelectorAll('.listing-image img').forEach(img => {
            img.addEventListener('error', function() {
                this.onerror = null;
                this.src = defaultCropImage;
                this.parentElement.classList.add('error');
            });
            
            img.addEventListener('load', function() {
                this.parentElement.classList.remove('error');
            });
        });
    }

    // Show add listing modal
    window.showAddListingModal = function() {
        addListingModal.classList.add('active');
    }

    // Close add listing modal
    window.closeAddListingModal = function() {
        addListingModal.classList.remove('active');
    }

    // Contact seller function
    window.contactSeller = function(cropName) {
        alert(`Connecting you with the seller of ${cropName}. They will contact you shortly.`);
    }

    // Handle form submission
    listingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const newCrop = {
            name: document.getElementById('cropName').value,
            category: document.getElementById('category').value,
            quantity: document.getElementById('quantity').value,
            price: document.getElementById('price').value,
            location: document.getElementById('location').value,
            image: defaultCropImage, // You would handle actual image upload in a real application
            description: document.getElementById('description').value,
            postedDate: 'Just now'
        };

        // Add new crop to the list
        crops.unshift(newCrop);
        
        // Refresh display
        filterListings();
        
        // Close modal and reset form
        closeAddListingModal();
        listingForm.reset();
    });

    // Event listeners for search and filter
    searchInput.addEventListener('input', filterListings);
    categoryFilter.addEventListener('change', filterListings);

    // Close modal when clicking outside
    addListingModal.addEventListener('click', function(e) {
        if (e.target === addListingModal) {
            closeAddListingModal();
        }
    });

    // Initial display
    displayListings(crops);
});
