document.addEventListener("copy", function (event) {
    event.preventDefault();
    navigator.clipboard.writeText("Nice try, now back");
});

document.addEventListener("paste", function (event) {
    event.preventDefault();
    let customText = "Nice try, now back";

    if (document.activeElement && document.activeElement.value !== undefined) {
        document.activeElement.value += customText;
    }
});

let tabChangeCount = 0;
let maxTabSwitches = 6;
let isMCQsFilled = false;

// Function to handle tab switching
function handleTabSwitch() {
    if (document.hidden && !isMCQsFilled) {
        tabChangeCount++;

        if (tabChangeCount >= maxTabSwitches) {
            alert("⚠️ You switched tabs too many times! Redirecting...");
            window.location.href = "cheat.html";
        } else {
            alert(`⚠️ Warning: Don't switch tabs! (${tabChangeCount}/${maxTabSwitches})`);
        }
    }
}

// Function to handle minimizing or switching windows
function handleBlur() {
    if (!isMCQsFilled) {
        tabChangeCount++;

        if (tabChangeCount >= maxTabSwitches) {
            alert("⚠️ You switched tabs or minimized too many times! Redirecting...");
            window.location.href = "cheat.html";
        } else {
            alert(`⚠️ Don't minimize or switch tabs! (${tabChangeCount}/${maxTabSwitches})`);
        }
    }
}

// Attach event listeners for tab change and blur
document.addEventListener("visibilitychange", handleTabSwitch);
window.addEventListener("blur", handleBlur);

// Function to check if all MCQs are answered
function checkMCQsFilled() {
    let allMCQs = document.querySelectorAll("input[type='radio']");
    
    // Find all unique MCQ groups
    let mcqGroups = new Set();
    allMCQs.forEach((radio) => mcqGroups.add(radio.name));

    // Check if each group has one selected option
    isMCQsFilled = Array.from(mcqGroups).every((group) => {
        return document.querySelector(`input[name="${group}"]:checked`) !== null;
    });

    if (isMCQsFilled) {
        removeTabListeners(); // Turn off tab-switch detection
    }
}

// Remove tab detection when MCQs are fully answered
function removeTabListeners() {
    document.removeEventListener("visibilitychange", handleTabSwitch);
    window.removeEventListener("blur", handleBlur);
}

// Attach event listener to MCQs using event delegation
document.addEventListener("change", function (event) {
    if (event.target.matches("input[type='radio']")) {
        checkMCQsFilled();
    }
});
