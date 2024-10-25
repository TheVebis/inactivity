// Varibales for use in conjunction with the config file
let dialogColor;
let dialogZIndex;
let language;
let languages;
let logoutBackgroundColor;
let logoutTimer;
let logoutWarningTimer;
let userLanguage;
let warningBackgroundColor;

// Getting all the variables from the config file
fetch('config.json')
    .then((response) => response.json())
    .then((config) => {
        dialogColor = config.dialogColor;
        dialogZIndex = config.dialogZIndex;
        language = config.language;
        languages = config.languages;
        logoutBackgroundColor = config.logoutBackgroundColor;
        logoutTimer = config.logoutTimer;
        logoutWarningTimer = config.logoutWarningTimer;
        userLanguage = languages[language];
        warningBackgroundColor = config.warningBackgroundColor;
    })
    .then(inactivity);

// Function for the whole script to run after the fetch request is finished 
function inactivity() {

    // Creating a dialog to go on top of the site
    let dialog = document.createElement('div');
    dialog.id = 'dialog';
    dialog.style = 
        `z-index: ${dialogZIndex}; 
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: ${dialogColor};
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;`;

    // Making the dialog go away when you click it
    dialog.addEventListener('click', function() {
        document.getElementById('dialog').remove();
    });

    // Creating a textbox to go inside the dialog
    let alertBox = document.createElement('div');
    alertBox.id = 'alert';
    alertBox.style = 
        `border-radius: 25px; 
        padding: 2rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);`

    let alertBoxContent;

    // Adding the textbox inside the dialog
    dialog.appendChild(alertBox);


    // Variables that acts as ID for setTimeout in resetTimer()
    let timeout;
    let timeoutWarning;

    // Starting the timer
    resetTimer();

    // DOM Events
    document.onmousemove = resetTimer;  // Mouse moves
    document.onmousedown = resetTimer;  // Touchscreen presses
    document.ontouchstart = resetTimer; // Touchscreen presses
    document.onclick = resetTimer;      // Touchpad clicks
    document.onkeydown = resetTimer;    // Keyboard press
    document.addEventListener('scroll', resetTimer, true);  // Scrolling

    // Starting and resetting the timer
    function resetTimer() {
        
        // Stopping the current timeouts
        clearTimeout(timeoutWarning);
        clearTimeout(timeout);

        // Starting the timeouts from zero
        timeoutWarning = setTimeout(logoutWarning, logoutWarningTimer);
        timeout = setTimeout(logout, logoutTimer);
        
    }

    // Warning
    function logoutWarning() {
        // Checking that the dialog isn't created to prevent it from making multiple
        if (document.getElementById('dialog') == null) {
            
            // Setting the text to be inside the alert box
            alertBoxContent = userLanguage.warning;
            alertBox.innerText = alertBoxContent;

            // Setting the background color
            alertBox.style.backgroundColor = warningBackgroundColor;
            
            // Show the dialog element
            document.body.appendChild(dialog);
        }
    }

    // Log out
    function logout() {
        // Change the color for better visibility
        document.getElementById('alert').style.backgroundColor = logoutBackgroundColor;

        // Change the text content
        alertBoxContent = userLanguage.logout;
        alertBox.innerText = alertBoxContent;

        // location.href = 'logout.html'
    }
}
