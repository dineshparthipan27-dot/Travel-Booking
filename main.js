 
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('mainNav');
const headerActions = document.getElementById('headerActions');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    headerActions.classList.toggle('active');
});

 
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        headerActions.classList.remove('active');
    });
});




window.addEventListener('load', () => {
 
    gsap.from(".site-header", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    });

 
    gsap.from(".logo", {
        opacity: 0,
        x: -50,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
    });

 
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

 
    const locationInput = document.getElementById("locationInput");
    const dateInput = document.getElementById("dateInput");
    const guestInput = document.getElementById("guestInput");

 
    const locationGroup = document.getElementById("locationGroup");
    const locationError = document.getElementById("locationError");

    const dateGroup = document.getElementById("dateGroup");
    const dateError = document.getElementById("dateError");

    const guestGroup = document.getElementById("guestGroup");
    const guestError = document.getElementById("guestError");

 
    const searchBtn = document.getElementById("searchBtn");
    const btnText = document.querySelector(".btn-text");
    const btnLoader = document.getElementById("btnLoader");

 
    locationInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, ''); // Removes numbers and special chars immediately
        clearError(locationGroup, locationError);
    });

 
    dateInput.addEventListener("change", () => clearError(dateGroup, dateError));
    guestInput.addEventListener("input", () => clearError(guestGroup, guestError));

 
    searchForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default submission
        let isValid = true;

 
        clearError(locationGroup, locationError);
        clearError(dateGroup, dateError);
        clearError(guestGroup, guestError);

 
        const locationVal = locationInput.value.trim();
        if (locationVal === "") {
            showError(locationGroup, locationError, "Destination is required!");
            isValid = false;
        } else if (locationVal.length < 3) {
            showError(locationGroup, locationError, "Enter at least 3 characters.");
            isValid = false;
        }

 
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

 
        if (isValid) {
 
            btnText.style.display = "none";
            btnLoader.style.display = "inline-block";
            searchBtn.disabled = true;

 
            setTimeout(() => {
                btnText.style.display = "inline-block";
                btnLoader.style.display = "none";
                searchBtn.disabled = false;

                 window.location.href = "404.html"; // Fallback redirect if needed
            }, 2000);
        }
    });

 
    function showError(groupEle, errorEle, message) {
        errorEle.innerText = message;
        errorEle.style.display = "block";
        groupEle.classList.add("error-border");

 
        groupEle.classList.remove("shake");
        void groupEle.offsetWidth; // Trigger reflow for animation restart
        groupEle.classList.add("shake");
    }

 
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

 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 
    if (emailInput) {
        emailInput.addEventListener("input", () => {
            clearError(emailWrapper, emailError);
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent page reload

            const emailValue = emailInput.value.trim();

 
            if (emailValue === "") {
                showError(emailWrapper, emailError, "Email address is required!");
                return; // 🛑 Stops further execution
            }

 
            if (!emailRegex.test(emailValue)) {
                showError(emailWrapper, emailError, "Please enter a valid email (e.g., name@gmail.com)");
                return; // 🛑 Stops further execution
            }

 

 
            btnText.style.display = "none";
            subLoader.style.display = "inline-block";
            subscribeBtn.disabled = true;

 
            setTimeout(() => {
 
                gsap.to(newsletterForm, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    onComplete: () => {
                        newsletterForm.style.display = "none";
                        successMessage.style.display = "inline-block";

 
                        gsap.fromTo(successMessage,
                            { opacity: 0, scale: 0.8 },
                            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }
                        );
                    }
                });
            }, 2000);
        });
    }

 
    function showError(groupEle, errorEle, message) {
        if (!groupEle || !errorEle) return;
        errorEle.innerText = message;
        errorEle.style.display = "block";
        groupEle.classList.add("error-border");

 
        groupEle.classList.remove("shake");
        void groupEle.offsetWidth; // Reflow trick to restart animation
        groupEle.classList.add("shake");
    }

 
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
 
        nextBtn.addEventListener("click", () => {
 
            const scrollAmount = slider.querySelector('.testimonial-card').clientWidth + 30;
            slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });

 
        prevBtn.addEventListener("click", () => {
            const scrollAmount = slider.querySelector('.testimonial-card').clientWidth + 30;
            slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {

 
    const hotelsData = [
        {
            id: 'h1',
            name: 'Grand Resort & Spa',
            location: 'Bali, Indonesia',
            image: 'asset/tb5.webp',
            badge: 'Top Rated',
            actualPrice: 150,
            discountPrice: 120,
            rating: 5.0
        },
        {
            id: 'h2',
            name: 'Oceanview Villas',
            location: 'Phuket, Thailand',
            image: 'asset/tb6.webp',
            badge: 'Best Value',
            actualPrice: 200,
            discountPrice: 160,
            rating: 4.5
        },
        {
            id: 'h3',
            name: 'Metropolitan Suites',
            location: 'New York, USA',
            image: 'asset/tb7.webp',
            badge: 'Popular',
            actualPrice: 300,
            discountPrice: 250,
            rating: 4.8
        },
        {
            id: 'h4',
            name: 'Desert Mirage Resort',
            location: 'Dubai, UAE',
            image: 'asset/tb8.webp',
            badge: 'Luxury',
            actualPrice: 400,
            discountPrice: 320,
            rating: 4.9
        },
        {
            id: 'h5',
            name: 'Alpine Chalet Retreat',
            location: 'Swiss Alps, Switzerland',
            image: 'asset/tb9.webp',
            badge: 'Nature',
            actualPrice: 350,
            discountPrice: 280,
            rating: 4.7
        },
        {
            id: 'h6',
            name: 'Tokyo Sakura Hotel',
            location: 'Tokyo, Japan',
            image: 'asset/tb1.webp',
            badge: 'City Center',
            actualPrice: 180,
            discountPrice: 140,
            rating: 4.6
        },
        {
            id: 'h7',
            name: 'Parisian Palace',
            location: 'Paris, France',
            image: 'asset/tb2.webp',
            badge: 'Romantic',
            actualPrice: 450,
            discountPrice: 380,
            rating: 4.9
        },
        {
            id: 'h8',
            name: 'Santorini Blue Domes',
            location: 'Santorini, Greece',
            image: 'asset/tb3.webp',
            badge: 'Trending',
            actualPrice: 250,
            discountPrice: 190,
            rating: 5.0
        },
        {
            id: 'h9',
            name: 'Maldives Water Villa',
            location: 'Male, Maldives',
            image: 'asset/tb4.webp',
            badge: 'Honeymoon',
            actualPrice: 500,
            discountPrice: 420,
            rating: 4.9
        },
        {
            id: 'h10',
            name: 'Serengeti Safari Lodge',
            location: 'Serengeti, Tanzania',
            image: 'asset/tb.webp',
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

 
    let wishlist = JSON.parse(localStorage.getItem("travelMachanWishlist")) || [];

 
    function renderHotels(data) {
        hotelsGrid.innerHTML = ""; // Clear existing grid

        if (data.length === 0) {
            hotelsGrid.innerHTML = `<h3 style="text-align:center; width:100%; color:#888; grid-column: 1 / -1; padding: 40px 0;">No hotels match your filters. Try adjusting the price or rating.</h3>`;
            return;
        }

        data.forEach((hotel, index) => {
            const isWished = wishlist.includes(hotel.id) ? 'active' : '';
            const heartIcon = isWished ? 'fas fa-heart' : 'far fa-heart';

 
 
            const delay = (index % 3) * 150;

 
            const cardHTML = `
                <div class="hotel-card" data-aos="zoom-in-up" data-aos-duration="800" data-aos-delay="${delay}">
                     
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

 
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', toggleWishlist);
        });
    }

 
    function getStarsHTML(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) stars += '<i class="fas fa-star"></i>';
            else if (i === Math.ceil(rating) && !Number.isInteger(rating)) stars += '<i class="fas fa-star-half-alt"></i>';
            else stars += '<i class="far fa-star"></i>';
        }
        return stars;
    }

 
    function toggleWishlist(e) {
        const btn = e.currentTarget;
        const hotelId = btn.getAttribute('data-id');
        const icon = btn.querySelector('i');

        if (wishlist.includes(hotelId)) {
 
            wishlist = wishlist.filter(id => id !== hotelId);
            btn.classList.remove('active');
            icon.classList.replace('fas', 'far');
        } else {
 
            wishlist.push(hotelId);
            btn.classList.add('active');
            icon.classList.replace('far', 'fas');

 
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(btn, { scale: 0.8 }, { scale: 1, duration: 0.3, ease: "back.out(2)" });
            }
        }

 
        localStorage.setItem("travelMachanWishlist", JSON.stringify(wishlist));
    }

 
    function applyFiltersAndSort() {
        let filteredData = [...hotelsData];

 
        const maxPrice = parseInt(priceFilter.value);
        filteredData = filteredData.filter(hotel => hotel.discountPrice <= maxPrice);

 
        const minRating = parseFloat(ratingFilter.value);
        filteredData = filteredData.filter(hotel => hotel.rating >= minRating);

 
        const sortVal = sortFilter.value;
        if (sortVal === 'price-low') {
            filteredData.sort((a, b) => a.discountPrice - b.discountPrice);
        } else if (sortVal === 'price-high') {
            filteredData.sort((a, b) => b.discountPrice - a.discountPrice);
        }

        renderHotels(filteredData);
    }

 
    priceFilter.addEventListener('input', (e) => {
        priceValue.innerText = e.target.value;
        applyFiltersAndSort();
    });
    ratingFilter.addEventListener('change', applyFiltersAndSort);
    sortFilter.addEventListener('change', applyFiltersAndSort);

 
    const maxHotelPrice = Math.max(...hotelsData.map(h => h.discountPrice));
    priceFilter.max = Math.ceil(maxHotelPrice / 50) * 50; // Round up to nearest 50
    priceFilter.max = 500; // Hardcoded fallback for slider scale
    priceFilter.value = 500; // Set default slider value to max to show all initially
    priceValue.innerText = 500;

 
    applyFiltersAndSort(); // Calls render function with default values
});

 
document.addEventListener("DOMContentLoaded", () => {
    
 
    const copyTriggers = document.querySelectorAll(".copy-trigger");

    copyTriggers.forEach(trigger => {
        trigger.addEventListener("click", function() {
 
            const couponCode = this.getAttribute("data-code");
            
 
            navigator.clipboard.writeText(couponCode).then(() => {
                
 
                if(this.tagName.toLowerCase() === 'button') {
                    const originalText = this.innerText;
                    this.innerText = "Copied! 🎉";
                    this.classList.add("copy-success");
                    
 
                    setTimeout(() => {
                        this.innerText = originalText;
                        this.classList.remove("copy-success");
                    }, 2000);
                } 
                
 
                else {
                    const icon = this.querySelector(".copy-icon");
                    icon.classList.remove("far", "fa-copy");
                    icon.classList.add("fas", "fa-check-circle");
                    icon.style.color = "#4CAF50"; // Green tick
                    
 
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