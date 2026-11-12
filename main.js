// Mobile Menu Toggle Logic
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('mainNav');
const headerActions = document.getElementById('headerActions');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    headerActions.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        headerActions.classList.remove('active');
    });
});




window.addEventListener('load', () => {
    // Animate Header sliding down
    gsap.from(".site-header", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    });

    // Animate Logo
    gsap.from(".logo", {
        opacity: 0,
        x: -50,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
    });

    // Animate Nav Links
    gsap.from(".nav-item", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        ease: "power3.out"
    });
 
});



document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");

    // Inputs
    const locationInput = document.getElementById("locationInput");
    const dateInput = document.getElementById("dateInput");
    const guestInput = document.getElementById("guestInput");

    // Groups & Error Messages
    const locationGroup = document.getElementById("locationGroup");
    const locationError = document.getElementById("locationError");

    const dateGroup = document.getElementById("dateGroup");
    const dateError = document.getElementById("dateError");

    const guestGroup = document.getElementById("guestGroup");
    const guestError = document.getElementById("guestError");

    // Button parts
    const searchBtn = document.getElementById("searchBtn");
    const btnText = document.querySelector(".btn-text");
    const btnLoader = document.getElementById("btnLoader");

    // 1. Real-time Input Sanitization for Location (Only letters and spaces)
    locationInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, ''); // Removes numbers and special chars immediately
        clearError(locationGroup, locationError);
    });

    // Clear errors on input for other fields
    dateInput.addEventListener("change", () => clearError(dateGroup, dateError));
    guestInput.addEventListener("input", () => clearError(guestGroup, guestError));

    // Form Submit Event
    searchForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default submission
        let isValid = true;

        // Reset all errors first
        clearError(locationGroup, locationError);
        clearError(dateGroup, dateError);
        clearError(guestGroup, guestError);

        // 2. Validate Location (Min 3 chars required)
        const locationVal = locationInput.value.trim();
        if (locationVal === "") {
            showError(locationGroup, locationError, "Destination is required!");
            isValid = false;
        } else if (locationVal.length < 3) {
            showError(locationGroup, locationError, "Enter at least 3 characters.");
            isValid = false;
        }

        // 3. Validate Date (Cannot be empty and cannot be a past date)
        const dateVal = dateInput.value;
        if (dateVal === "") {
            showError(dateGroup, dateError, "Please select a date.");
            isValid = false;
        } else {
            const selectedDate = new Date(dateVal).setHours(0, 0, 0, 0);
            const today = new Date().setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                showError(dateGroup, dateError, "Past dates are not allowed!");
                isValid = false;
            }
        }

        // 4. Validate Guests (Min 1, Max 20)
        const guestVal = parseInt(guestInput.value);
        if (isNaN(guestVal) || guestInput.value === "") {
            showError(guestGroup, guestError, "Enter number of guests.");
            isValid = false;
        } else if (guestVal < 1) {
            showError(guestGroup, guestError, "Minimum 1 guest required.");
            isValid = false;
        } else if (guestVal > 20) {
            showError(guestGroup, guestError, "Maximum 20 guests allowed.");
            isValid = false;
        }

        // 5. Final Action if Valid
        if (isValid) {
            // Show Loading State
            btnText.style.display = "none";
            btnLoader.style.display = "inline-block";
            searchBtn.disabled = true;

            // Simulate API Call / Page Redirect (You can replace this with your actual logic)
            setTimeout(() => {
                btnText.style.display = "inline-block";
                btnLoader.style.display = "none";
                searchBtn.disabled = false;

                 window.location.href = "404.html"; // Fallback redirect if needed
            }, 2000);
        }
    });

    // Helper Function to Show Error & Shake
    function showError(groupEle, errorEle, message) {
        errorEle.innerText = message;
        errorEle.style.display = "block";
        groupEle.classList.add("error-border");

        // Trigger Shake Animation
        groupEle.classList.remove("shake");
        void groupEle.offsetWidth; // Trigger reflow for animation restart
        groupEle.classList.add("shake");
    }

    // Helper Function to Clear Error
    function clearError(groupEle, errorEle) {
        errorEle.style.display = "none";
        errorEle.innerText = "";
        groupEle.classList.remove("error-border", "shake");
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const newsletterForm = document.getElementById("newsletterForm");
    const emailInput = document.getElementById("emailInput");
    const emailWrapper = document.getElementById("emailWrapper");
    const emailError = document.getElementById("emailError");

    const subscribeBtn = document.getElementById("subscribeBtn");
    const btnText = subscribeBtn.querySelector(".btn-text");
    const subLoader = document.getElementById("subLoader");
    const successMessage = document.getElementById("successMessage");

    // Regular Expression for valid Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear error dynamically when user starts typing
    if (emailInput) {
        emailInput.addEventListener("input", () => {
            clearError(emailWrapper, emailError);
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent page reload

            const emailValue = emailInput.value.trim();

            // 1. Check if Empty (எதுவும் என்டர் பண்ணலனா இங்கயே பிளாக் ஆகிடும்)
            if (emailValue === "") {
                showError(emailWrapper, emailError, "Email address is required!");
                return; // 🛑 Stops further execution
            }

            // 2. Check if Valid Email (தப்பான ஈமெயில் குடுத்தாலும் பிளாக் ஆகிடும்)
            if (!emailRegex.test(emailValue)) {
                showError(emailWrapper, emailError, "Please enter a valid email (e.g., name@gmail.com)");
                return; // 🛑 Stops further execution
            }

            // --- எல்லாமே கரெக்டா இருந்தா மட்டும் தான் இந்த இடத்துக்கு வரும் ---

            // Show Loading on Button
            btnText.style.display = "none";
            subLoader.style.display = "inline-block";
            subscribeBtn.disabled = true;

            // Simulate API Call (e.g., 2 seconds delay)
            setTimeout(() => {
                // Hide Form and Show Success Message with GSAP Animation
                gsap.to(newsletterForm, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    onComplete: () => {
                        newsletterForm.style.display = "none";
                        successMessage.style.display = "inline-block";

                        // Bounce in success message
                        gsap.fromTo(successMessage,
                            { opacity: 0, scale: 0.8 },
                            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }
                        );
                    }
                });
            }, 2000);
        });
    }

    // Helper Function to Show Error & Shake Effect
    function showError(groupEle, errorEle, message) {
        if (!groupEle || !errorEle) return;
        errorEle.innerText = message;
        errorEle.style.display = "block";
        groupEle.classList.add("error-border");

        // Trigger Shake Animation
        groupEle.classList.remove("shake");
        void groupEle.offsetWidth; // Reflow trick to restart animation
        groupEle.classList.add("shake");
    }

    // Helper Function to Clear Error
    function clearError(groupEle, errorEle) {
        if (!groupEle || !errorEle) return;
        errorEle.style.display = "none";
        errorEle.innerText = "";
        groupEle.classList.remove("error-border", "shake");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("testimonialSlider");
    const prevBtn = document.getElementById("prevTestimonial");
    const nextBtn = document.getElementById("nextTestimonial");

    if (slider && prevBtn && nextBtn) {
        // Scroll right
        nextBtn.addEventListener("click", () => {
            // Calculates the width of one card plus gap
            const scrollAmount = slider.querySelector('.testimonial-card').clientWidth + 30;
            slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });

        // Scroll left
        prevBtn.addEventListener("click", () => {
            const scrollAmount = slider.querySelector('.testimonial-card').clientWidth + 30;
            slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {

    // 1. Array of Hotel Data (10 Hotels for Dynamic Rendering)
    const hotelsData = [
        {
            id: 'h1',
            name: 'Grand Resort & Spa',
            location: 'Bali, Indonesia',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            badge: 'Top Rated',
            actualPrice: 150,
            discountPrice: 120,
            rating: 5.0
        },
        {
            id: 'h2',
            name: 'Oceanview Villas',
            location: 'Phuket, Thailand',
            image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            badge: 'Best Value',
            actualPrice: 200,
            discountPrice: 160,
            rating: 4.5
        },
        {
            id: 'h3',
            name: 'Metropolitan Suites',
            location: 'New York, USA',
            image: 'https://images.unsplash.com/photo-1542314831-c6a4d1409e1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            badge: 'Popular',
            actualPrice: 300,
            discountPrice: 250,
            rating: 4.8
        },
        {
            id: 'h4',
            name: 'Desert Mirage Resort',
            location: 'Dubai, UAE',
            image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            badge: 'Luxury',
            actualPrice: 400,
            discountPrice: 320,
            rating: 4.9
        },
        {
            id: 'h5',
            name: 'Alpine Chalet Retreat',
            location: 'Swiss Alps, Switzerland',
            image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            badge: 'Nature',
            actualPrice: 350,
            discountPrice: 280,
            rating: 4.7
        },
        {
            id: 'h6',
            name: 'Tokyo Sakura Hotel',
            location: 'Tokyo, Japan',
            image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            badge: 'City Center',
            actualPrice: 180,
            discountPrice: 140,
            rating: 4.6
        },
        {
            id: 'h7',
            name: 'Parisian Palace',
            location: 'Paris, France',
            image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            badge: 'Romantic',
            actualPrice: 450,
            discountPrice: 380,
            rating: 4.9
        },
        {
            id: 'h8',
            name: 'Santorini Blue Domes',
            location: 'Santorini, Greece',
            image: 'https://images.unsplash.com/photo-1515238152791-8216bf240989?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            badge: 'Trending',
            actualPrice: 250,
            discountPrice: 190,
            rating: 5.0
        },
        {
            id: 'h9',
            name: 'Maldives Water Villa',
            location: 'Male, Maldives',
            image: 'https://images.unsplash.com/photo-1439066615861-d1fac78becce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            badge: 'Honeymoon',
            actualPrice: 500,
            discountPrice: 420,
            rating: 4.9
        },
        {
            id: 'h10',
            name: 'Serengeti Safari Lodge',
            location: 'Serengeti, Tanzania',
            image: 'https://images.unsplash.com/photo-1504280387929-e09218d6e3c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            badge: 'Adventure',
            actualPrice: 280,
            discountPrice: 220,
            rating: 4.8
        }
    ];

    const hotelsGrid = document.getElementById("dynamicHotelsGrid");
    const priceFilter = document.getElementById("priceFilter");
    const priceValue = document.getElementById("priceValue");
    const ratingFilter = document.getElementById("ratingFilter");
    const sortFilter = document.getElementById("sortFilter");

    // Retrieve Wishlist from LocalStorage
    let wishlist = JSON.parse(localStorage.getItem("travelMachanWishlist")) || [];

    // 2. Render Hotels Function
    function renderHotels(data) {
        hotelsGrid.innerHTML = ""; // Clear existing grid

        if (data.length === 0) {
            hotelsGrid.innerHTML = `<h3 style="text-align:center; width:100%; color:#888; grid-column: 1 / -1; padding: 40px 0;">No hotels match your filters. Try adjusting the price or rating.</h3>`;
            return;
        }

        data.forEach((hotel, index) => {
            const isWished = wishlist.includes(hotel.id) ? 'active' : '';
            const heartIcon = isWished ? 'fas fa-heart' : 'far fa-heart';

            // Set max price limit for input dynamically if you want, or just rely on fixed HTML values.
            // Using AOS animation with stagger effect
            const delay = (index % 3) * 150;

            // Create Card HTML
            const cardHTML = `
                <div class="hotel-card" data-aos="zoom-in-up" data-aos-duration="800" data-aos-delay="${delay}">
                    <!-- Wishlist Button -->
                    <button class="wishlist-btn ${isWished}" data-id="${hotel.id}">
                        <i class="${heartIcon}"></i>
                    </button>
                    
                    <img src="${hotel.image}" alt="${hotel.name}" class="hotel-img" loading="lazy">
                    <div class="hotel-badge">${hotel.badge}</div>
                    
                    <div class="hotel-info">
                        <div class="hotel-stars">
                            ${getStarsHTML(hotel.rating)}
                        </div>
                        <h3 class="hotel-name">${hotel.name}</h3>
                        <p class="hotel-location"><i class="fas fa-map-marker-alt"></i> ${hotel.location}</p>
                        
                        <div class="hotel-bottom">
                            <div class="hotel-price">
                                <span class="discount-price">$${hotel.actualPrice}</span>
                                <span class="actual-price">$${hotel.discountPrice} <span>/night</span></span>
                            </div>
                            <a href='404.html' class="btn view-btn"">Book Now</a>
                        </div>
                    </div>
                </div>
            `;
            hotelsGrid.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Attach event listeners to new wishlist buttons
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', toggleWishlist);
        });
    }

    // Helper: Generate Star Icons based on rating number
    function getStarsHTML(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) stars += '<i class="fas fa-star"></i>';
            else if (i === Math.ceil(rating) && !Number.isInteger(rating)) stars += '<i class="fas fa-star-half-alt"></i>';
            else stars += '<i class="far fa-star"></i>';
        }
        return stars;
    }

    // 3. Wishlist Functionality (LocalStorage)
    function toggleWishlist(e) {
        const btn = e.currentTarget;
        const hotelId = btn.getAttribute('data-id');
        const icon = btn.querySelector('i');

        if (wishlist.includes(hotelId)) {
            // Remove from wishlist
            wishlist = wishlist.filter(id => id !== hotelId);
            btn.classList.remove('active');
            icon.classList.replace('fas', 'far');
        } else {
            // Add to wishlist
            wishlist.push(hotelId);
            btn.classList.add('active');
            icon.classList.replace('far', 'fas');

            // Add small pop animation via GSAP if available, else fallback to CSS
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(btn, { scale: 0.8 }, { scale: 1, duration: 0.3, ease: "back.out(2)" });
            }
        }

        // Save back to LocalStorage
        localStorage.setItem("travelMachanWishlist", JSON.stringify(wishlist));
    }

    // 4. Filtering and Sorting Logic
    function applyFiltersAndSort() {
        let filteredData = [...hotelsData];

        // Filter by Price
        const maxPrice = parseInt(priceFilter.value);
        filteredData = filteredData.filter(hotel => hotel.discountPrice <= maxPrice);

        // Filter by Rating
        const minRating = parseFloat(ratingFilter.value);
        filteredData = filteredData.filter(hotel => hotel.rating >= minRating);

        // Sort Data
        const sortVal = sortFilter.value;
        if (sortVal === 'price-low') {
            filteredData.sort((a, b) => a.discountPrice - b.discountPrice);
        } else if (sortVal === 'price-high') {
            filteredData.sort((a, b) => b.discountPrice - a.discountPrice);
        }

        renderHotels(filteredData);
    }

    // Event Listeners for Filters
    priceFilter.addEventListener('input', (e) => {
        priceValue.innerText = e.target.value;
        applyFiltersAndSort();
    });
    ratingFilter.addEventListener('change', applyFiltersAndSort);
    sortFilter.addEventListener('change', applyFiltersAndSort);

    // Update the max value of the price range slider dynamically based on highest hotel price
    const maxHotelPrice = Math.max(...hotelsData.map(h => h.discountPrice));
    priceFilter.max = Math.ceil(maxHotelPrice / 50) * 50; // Round up to nearest 50
    priceFilter.max = 500; // Hardcoded fallback for slider scale
    priceFilter.value = 500; // Set default slider value to max to show all initially
    priceValue.innerText = 500;

    // Initial Render on page load
    applyFiltersAndSort(); // Calls render function with default values
});

 
document.addEventListener("DOMContentLoaded", () => {
    
    // Select all elements that can trigger the copy action (both div and button)
    const copyTriggers = document.querySelectorAll(".copy-trigger");

    copyTriggers.forEach(trigger => {
        trigger.addEventListener("click", function() {
            // Get the promo code from the data-code attribute
            const couponCode = this.getAttribute("data-code");
            
            // Copy to Clipboard API
            navigator.clipboard.writeText(couponCode).then(() => {
                
                // --- Visual Feedback for Buttons ---
                if(this.tagName.toLowerCase() === 'button') {
                    const originalText = this.innerText;
                    this.innerText = "Copied! 🎉";
                    this.classList.add("copy-success");
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        this.innerText = originalText;
                        this.classList.remove("copy-success");
                    }, 2000);
                } 
                
                // --- Visual Feedback for Promo Code Div ---
                else {
                    const icon = this.querySelector(".copy-icon");
                    icon.classList.remove("far", "fa-copy");
                    icon.classList.add("fas", "fa-check-circle");
                    icon.style.color = "#4CAF50"; // Green tick
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        icon.classList.remove("fas", "fa-check-circle");
                        icon.classList.add("far", "fa-copy");
                        icon.style.color = "var(--primary-color)";
                    }, 2000);
                }
                
            }).catch(err => {
                console.error("Failed to copy coupon code: ", err);
                alert("Machan, couldn't copy the code. Please try manually!");
            });
        });
    });
});