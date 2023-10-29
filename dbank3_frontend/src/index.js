import { dbank3_backend } from "../../declarations/dbank3_backend";

// Assuming the imported module exposes the needed functionality.
const dbank = dbank3_backend;

// DOM elements
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");
const registerName = document.getElementById("registerName");
const registerPassword = document.getElementById("registerPassword");
const registerButton = document.getElementById("registerButton");
const registerMessage = document.getElementById("registerMessage");
const accountSection = document.getElementById("accountSection");
const balanceDisplay = document.getElementById("balanceDisplay");
const topupInput = document.getElementById("topupAmount");
const topupButton = document.getElementById("topupButton");
const withdrawInput = document.getElementById("withdrawAmount");
const withdrawButton = document.getElementById("withdrawButton");

// Handle user registration
registerButton.addEventListener("click", async () => {
    const username = registerName.value;
    const password = registerPassword.value;

    try {
        const result = await dbank.createUser(username, password);
        registerMessage.innerText = result;
        if (result === "Account successfully created!") {
            registerMessage.innerText = result;
            // Clear input fields after successful registration
            registerName.value = "";
            registerPassword.value = "";
            setTimeout(() => {
                registerMessage.innerText = "";  // Clear the message after 3 seconds
            }, 3000);  // 3000 milliseconds = 3 seconds
        }
    } catch (error) {
        console.error("Error during registration:", error);
        registerMessage.innerText = "Registration failed!";
    }
});

// Handle user login
loginButton.addEventListener("click", async () => {
    const username = loginUsername.value;
    const password = loginPassword.value;

    try {
        const result = await dbank.loginUser(username, password);
        if (result === "Login successful!") {
            // Switch view to account section after successful login
            loginUsername.value = "";
            loginPassword.value = "";
            accountSection.style.display = "block";
            refreshBalance();
        } else {
            alert(result); // Displaying the message to the user in a simple alert for now. In a real application, you'd use a more user-friendly way.
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed!");
    }
});

// Handle logout functionality
logoutButton.addEventListener("click", logout);

function logout() {
    dbank.logoutUser();
    accountSection.style.display = "none";
}

// Utility function to refresh balance display
async function refreshBalance() {
    try {
        const balance = await dbank.checkBalance();
        balanceDisplay.innerText = balance.toFixed(2); // Display balance with 2 decimal places
    } catch (error) {
        console.error("Error fetching balance:", error);
    }
}

// Initially fetch the balance on page load (for cases when user is already logged in)
refreshBalance();

// Event Listeners
topupButton.addEventListener("click", topup);
withdrawButton.addEventListener("click", withdraw);

// Top-up Function
function topup() {
    const amount = parseFloat(topupInput.value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount to top up.");
        return;
    }
    dbank3_backend.topUp(amount).then(response => {
        if (response === "Amount added successfully.") {
            // Refresh the balance on successful top-up.
            refreshBalance();
            alert("Top-up successful!");
        } else {
            alert(response);  // Display the error message from backend
        }
    });
}

// Withdraw Function
function withdraw() {
    const amount = parseFloat(withdrawInput.value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount to withdraw.");
        return;
    }
    dbank3_backend.withdraw(amount).then(response => {
        if (response === "Withdrawal successful.") {
            // Refresh the balance on successful withdrawal.
            refreshBalance();
            alert("Withdrawal successful!");
        } else {
            alert(response);  // Display the error message from backend
        }
    });
}

// Transfer Function
document.getElementById("transferButton").addEventListener("click", async function() {
    const targetUsername = document.getElementById("targetUsername").value;
    const transferAmount = parseFloat(document.getElementById("transferAmount").value);

    if (isNaN(transferAmount) || transferAmount <= 0) {
        document.getElementById("transferStatus").innerText = "Please enter a valid transfer amount.";
        return;
    }

    try {
        const result = await dbank.transferTo(targetUsername, transferAmount);
        document.getElementById("transferStatus").innerText = result;
        
        if (result === "Transfer successful.") {
            document.getElementById("transferStatus").innerText = result;
            // Update the displayed balance after a successful transfer.
            const balance = await dbank.checkBalance();
            document.getElementById("balanceDisplay").innerText = balance.toFixed(2);
            setTimeout(() => {
                document.getElementById("transferStatus").innerText = "";  // Clear the message after 3 seconds
            }, 3000);
        }
        
    } catch (error) {
        console.error("Error transferring funds:", error);
        document.getElementById("transferStatus").innerText = "Error transferring funds. Please try again.";
    }
});

