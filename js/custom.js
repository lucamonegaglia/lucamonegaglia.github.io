// Custom JavaScript for Interactive Project Cards
console.log('Custom JavaScript file loaded!');

// Wait for everything to load, including the slides framework
setTimeout(function() {
    console.log('Starting project card initialization...');
    
    // Helper function to hide description
    function hideDescription(card) {
        const description = card.querySelector('.project-description');
        if (description) {
            description.style.display = 'none';
            description.style.opacity = '0';
            description.style.maxHeight = '0';
        }
    }
    
    // Helper function to show description
    function showDescription(card) {
        const description = card.querySelector('.project-description');
        if (description) {
            console.log('Found description element, making it visible');
            description.style.display = 'block';
            description.style.opacity = '1';
            description.style.maxHeight = 'none';
        } else {
            console.log('Description element not found!');
        }
    }
    
    // Get all project cards using vanilla JavaScript
    const projectCards = document.querySelectorAll('.project-card');
    console.log('Found project cards:', projectCards.length);
    
    projectCards.forEach(function(card, index) {
        console.log('Setting up card', index);
        let isExpanded = false;
        
        // Ensure description is hidden initially
        hideDescription(card);
        
        // Add visual feedback on hover
        card.style.border = '2px solid transparent';
        
        card.addEventListener('mouseenter', function() {
            card.style.border = '2px solid #007acc';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!isExpanded) {
                card.style.border = '2px solid transparent';
            }
        });
        
        card.addEventListener('click', function(e) {
            console.log('Card clicked:', index);
            e.preventDefault();
            e.stopPropagation();
            
            // If clicking on the "View Project" button when expanded
            const linkBtn = e.target.closest('.project-link-btn');
            if (isExpanded && linkBtn) {
                console.log('Link button clicked');
                const link = card.getAttribute('data-link');
                if (link && link.trim() !== '') {
                    window.open(link, '_blank');
                    return;
                }
            }
            
            // Toggle expansion
            if (!isExpanded) {
                console.log('Expanding card', index);
                
                // Close any other expanded cards first
                projectCards.forEach(function(otherCard, otherIndex) {
                    if (otherCard !== card) {
                        otherCard.classList.remove('expanded');
                        otherCard.style.border = '2px solid transparent';
                        hideDescription(otherCard);
                        console.log('Closed card', otherIndex);
                    }
                });
                
                // Expand this card
                card.classList.add('expanded');
                card.style.border = '3px solid #007acc';
                isExpanded = true;
                
                console.log('Card expanded, classes:', card.classList.toString());
                
                // Show description
                showDescription(card);
                
                // Smooth scroll to the card
                setTimeout(function() {
                    card.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
                
            } else {
                console.log('Collapsing card', index);
                // Collapse this card
                card.classList.remove('expanded');
                card.style.border = '2px solid transparent';
                isExpanded = false;
                
                // Hide description
                hideDescription(card);
            }
        });
        
        // Add click indicator for testing
        card.title = 'Click to expand project details';
    });
    
    console.log('Project cards initialized successfully');
    
    // Close expanded cards when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.project-card')) {
            projectCards.forEach(function(card) {
                card.classList.remove('expanded');
                card.style.border = '2px solid transparent';
                hideDescription(card);
            });
        }
    });
    
    // Handle escape key to close expanded cards
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            projectCards.forEach(function(card) {
                card.classList.remove('expanded');
                card.style.border = '2px solid transparent';
                hideDescription(card);
            });
        }
    });
    
}, 1000); // Wait 1 second for everything to load

// Global test function
window.testClick = function() {
    alert('JavaScript is working! Cards found: ' + document.querySelectorAll('.project-card').length);
};
