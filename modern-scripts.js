document.addEventListener('DOMContentLoaded', function() {
    // Settings toggle
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsMenu = document.getElementById('settings-menu');
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    
    // Font size buttons
    const fontSmallBtn = document.getElementById('font-small');
    const fontMediumBtn = document.getElementById('font-medium');
    const fontLargeBtn = document.getElementById('font-large');
    
    // Toggle settings menu
    settingsToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        settingsMenu.classList.toggle('active');
    });
    
    // Close settings menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!settingsMenu.contains(e.target) && e.target !== settingsToggle) {
            settingsMenu.classList.remove('active');
        }
    });
    
    // Toggle theme
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Set font size
    fontSmallBtn.addEventListener('click', function() {
        setFontSize('small');
    });
    
    fontMediumBtn.addEventListener('click', function() {
        setFontSize('medium');
    });
    
    fontLargeBtn.addEventListener('click', function() {
        setFontSize('large');
    });
    
    // Function to set font size
    function setFontSize(size) {
        // Remove all font classes
        document.body.classList.remove('font-small', 'font-medium', 'font-large');
        
        // Add the selected font class
        document.body.classList.add(`font-${size}`);
        
        // Store the preference
        localStorage.setItem('fontSize', size);
        
        // Update button states
        fontSmallBtn.classList.remove('active');
        fontMediumBtn.classList.remove('active');
        fontLargeBtn.classList.remove('active');
        
        document.getElementById(`font-${size}`).classList.add('active');
    }
    
    // Load saved preferences
    function loadPreferences() {
        // Load theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.checked = false;
        } else {
            themeToggle.checked = true;
        }
        
        // Load font size preference
        const savedFontSize = localStorage.getItem('fontSize') || 'medium';
        setFontSize(savedFontSize);
    }
    
    // Initialize preferences
    loadPreferences();
});
