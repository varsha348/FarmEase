document.addEventListener('DOMContentLoaded', function() {
    // Toggle Password Visibility
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Form Validation
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateLoginForm()) {
                // Simulate login
                showLoadingState(this);
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateRegisterForm()) {
                // Simulate registration
                showLoadingState(this);
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }
        });
    }

    // Social Login Handlers
    document.querySelectorAll('.social-button').forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            alert(`${provider} login will be implemented with backend integration`);
        });
    });

    // Password Strength Checker
    function checkPasswordStrength(password) {
        let strength = 0;
        const feedback = {
            strength: '',
            message: ''
        };

        // Length check
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;

        // Character variety checks
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;

        // Determine strength level
        if (strength <= 2) {
            feedback.strength = 'weak';
            feedback.message = 'Too weak - Use longer password with mixed characters';
        } else if (strength <= 3) {
            feedback.strength = 'fair';
            feedback.message = 'Fair - Consider adding more variety';
        } else if (strength <= 4) {
            feedback.strength = 'good';
            feedback.message = 'Good - Password meets basic requirements';
        } else {
            feedback.strength = 'strong';
            feedback.message = 'Strong - Password meets all requirements';
        }

        return feedback;
    }

    // Update password strength indicator
    function updatePasswordStrength(input) {
        const strength = checkPasswordStrength(input.value);
        const formGroup = input.closest('.form-group');
        const strengthBar = formGroup.querySelector('.password-strength');
        const strengthText = formGroup.querySelector('.password-strength-text');

        if (strengthBar && strengthText) {
            strengthBar.className = 'password-strength strength-' + strength.strength;
            strengthText.textContent = strength.message;
        }
    }

    // Handle verification code inputs
    function setupVerificationInputs() {
        const inputs = document.querySelectorAll('.verification-inputs input');
        inputs.forEach((input, index) => {
            input.addEventListener('keyup', (e) => {
                if (e.key === 'Backspace' && !input.value && index > 0) {
                    inputs[index - 1].focus();
                    return;
                }
                
                if (input.value) {
                    if (index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                    validateVerificationCode();
                }
            });
        });
    }

    function validateVerificationCode() {
        const inputs = document.querySelectorAll('.verification-inputs input');
        const code = Array.from(inputs).map(input => input.value).join('');
        return code.length === 6;
    }

    // Enhanced form validation
    function validateLoginForm() {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        let isValid = true;

        if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            showSuccess(email);
        }

        if (password.value.length < 8) {
            showError(password, 'Password must be at least 8 characters');
            isValid = false;
        } else {
            showSuccess(password);
        }

        return isValid;
    }

    function validateRegisterForm() {
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const farmType = document.getElementById('farmType');
        const terms = document.querySelector('input[name="terms"]');
        let isValid = true;

        // Enhanced name validation
        if (!/^[a-zA-Z\s]{2,30}$/.test(firstName.value.trim())) {
            showError(firstName, 'First name must be 2-30 characters, letters only');
            isValid = false;
        } else {
            showSuccess(firstName);
        }

        if (!/^[a-zA-Z\s]{2,30}$/.test(lastName.value.trim())) {
            showError(lastName, 'Last name must be 2-30 characters, letters only');
            isValid = false;
        } else {
            showSuccess(lastName);
        }

        if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            showSuccess(email);
        }

        if (!validatePhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        } else {
            showSuccess(phone);
        }

        const passwordStrength = checkPasswordStrength(password.value);
        if (passwordStrength.strength === 'weak') {
            showError(password, 'Password is too weak. ' + passwordStrength.message);
            isValid = false;
        } else {
            showSuccess(password);
        }

        if (confirmPassword.value !== password.value) {
            showError(confirmPassword, 'Passwords do not match');
            isValid = false;
        } else {
            showSuccess(confirmPassword);
        }

        if (farmType.value === '') {
            showError(farmType, 'Please select a farm type');
            isValid = false;
        } else {
            showSuccess(farmType);
        }

        if (!terms.checked) {
            showError(terms, 'You must accept the terms and conditions');
            isValid = false;
        }

        return isValid;
    }

    // Reset password flow
    const resetForm = document.getElementById('resetForm');
    const verificationForm = document.getElementById('verificationForm');
    const newPasswordForm = document.getElementById('newPasswordForm');
    const resendCodeBtn = document.getElementById('resendCode');

    if (resetForm) {
        resetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateResetEmail()) {
                showLoadingState(this);
                // Simulate email sending
                setTimeout(() => {
                    document.getElementById('resetStepEmail').style.display = 'none';
                    document.getElementById('resetStepVerification').style.display = 'block';
                    setupVerificationInputs();
                }, 1500);
            }
        });
    }

    if (verificationForm) {
        verificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateVerificationCode()) {
                showLoadingState(this);
                // Simulate verification
                setTimeout(() => {
                    document.getElementById('resetStepVerification').style.display = 'none';
                    document.getElementById('resetStepPassword').style.display = 'block';
                }, 1500);
            }
        });
    }

    if (newPasswordForm) {
        const newPassword = document.getElementById('newPassword');
        if (newPassword) {
            newPassword.addEventListener('input', function() {
                updatePasswordStrength(this);
            });
        }

        newPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateNewPassword()) {
                showLoadingState(this);
                // Simulate password reset
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            }
        });
    }

    if (resendCodeBtn) {
        resendCodeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.opacity = '0.5';
            this.textContent = 'Sending...';
            // Simulate resending code
            setTimeout(() => {
                this.style.opacity = '1';
                this.textContent = 'Resend Code';
                alert('New verification code sent!');
            }, 1500);
        });
    }

    // Add password strength indicator to registration
    const registerPassword = document.getElementById('password');
    if (registerPassword) {
        registerPassword.addEventListener('input', function() {
            updatePasswordStrength(this);
        });
    }
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(String(phone));
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    
    let errorMessage = formGroup.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        formGroup.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
}

function showSuccess(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showLoadingState(form) {
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    button.disabled = true;
    
    return function() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

function validateResetEmail() {
    const email = document.getElementById('resetEmail');
    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        return false;
    }
    showSuccess(email);
    return true;
}

function validateNewPassword() {
    const newPassword = document.getElementById('newPassword');
    const confirmNewPassword = document.getElementById('confirmNewPassword');
    let isValid = true;

    const passwordStrength = checkPasswordStrength(newPassword.value);
    if (passwordStrength.strength === 'weak') {
        showError(newPassword, 'Password is too weak. ' + passwordStrength.message);
        isValid = false;
    } else {
        showSuccess(newPassword);
    }

    if (confirmNewPassword.value !== newPassword.value) {
        showError(confirmNewPassword, 'Passwords do not match');
        isValid = false;
    } else {
        showSuccess(confirmNewPassword);
    }

    return isValid;
}
