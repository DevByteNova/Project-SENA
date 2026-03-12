// Login Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeLoginForm();
    initializeForgotPassword();
    initializeSignUpLink();
});

// Initialize Login Form
function initializeLoginForm() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Basic validation
        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            showError('Password must be at least 6 characters');
            return;
        }

        // Simulate login
        performLogin(email, password);
    });

    // Real-time validation
    emailInput.addEventListener('blur', () => {
        if (emailInput.value && !isValidEmail(emailInput.value)) {
            emailInput.style.borderColor = '#ef4444';
        } else {
            emailInput.style.borderColor = '#e5e7eb';
        }
    });
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Perform Login
function performLogin(email, password) {
    const loginButton = document.querySelector('.login-button');
    const originalText = loginButton.textContent;

    // Show loading state
    loginButton.textContent = 'Signing in...';
    loginButton.disabled = true;
    loginButton.classList.add('loading');

    // Simulate API call
    setTimeout(() => {
        loginButton.textContent = originalText;
        loginButton.disabled = false;
        loginButton.classList.remove('loading');

        // Show success message
        showSuccess(`Welcome back! Redirecting to dashboard...`);

        // Simulate redirect
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    }, 2000);
}

// Show Error Message
function showError(message) {
    const form = document.getElementById('loginForm');
    removeMessages();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'message error-message';
    errorDiv.textContent = '❌ ' + message;
    form.insertBefore(errorDiv, form.firstChild);

    setTimeout(() => errorDiv.remove(), 5000);
}

// Show Success Message
function showSuccess(message) {
    const form = document.getElementById('loginForm');
    removeMessages();

    const successDiv = document.createElement('div');
    successDiv.className = 'message success-message';
    successDiv.textContent = '✓ ' + message;
    form.insertBefore(successDiv, form.firstChild);
}

// Remove Previous Messages
function removeMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(msg => msg.remove());
}

// Forgot Password
function initializeForgotPassword() {
    const forgotLink = document.querySelector('.forgot-password');

    forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        showForgotPasswordModal();
    });
}

function showForgotPasswordModal() {
    const email = prompt('Enter your email address:');

    if (email && isValidEmail(email)) {
        alert('Password reset link has been sent to ' + email);
    } else if (email) {
        alert('Please enter a valid email address');
    }
}

// Sign Up Link
function initializeSignUpLink() {
    const signupLink = document.querySelector('.signup-link a');

    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Sign up page would open here');
    });
}

// Add CSS for messages dynamically
const styles = `
    .message {
        padding: 0.75rem 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-weight: 600;
        animation: slideDown 0.3s ease;
    }

    .error-message {
        background-color: #fee2e2;
        color: #991b1b;
        border: 1px solid #fca5a5;
    }

    .success-message {
        background-color: #dcfce7;
        color: #166534;
        border: 1px solid #86efac;
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Console message
console.log('%c Login Page Ready!', 'color: #a855f7; font-size: 16px; font-weight: bold;');
console.log('Use test credentials: any@email.com / password123');
