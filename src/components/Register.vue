<template>
  <section id="register" class="register-section">
    <div class="register-container">
      <div class="tabs">
        <div class="tab active">Create new account</div>
        <router-link to="/login" class="tab">Log in</router-link>
      </div>

      <form @submit.prevent="handleSubmit" class="register-form">
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="email">Email address *</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required
            >
            <div class="field-help">A valid email address. All emails from the system will be sent to this address.</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="password">Password *</label>
            <input 
              type="password" 
              id="password" 
              v-model="form.password" 
              required
            >
            <div class="field-help">Create a strong password with at least 6 characters.</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="confirmPassword">Confirm Password *</label>
            <input 
              type="password" 
              id="confirmPassword" 
              v-model="form.confirmPassword" 
              required
            >
            <div class="field-help">Please confirm your password.</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="display_name">Display Name *</label>
            <input 
              type="text" 
              id="display_name" 
              v-model="form.display_name"
              placeholder="How you want to be displayed"
              required
            >
            <div class="field-help">This will be shown to other users instead of your email.</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name *</label>
            <input 
              type="text" 
              id="firstName" 
              v-model="form.firstName"
              placeholder="Your first name"
              required
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="lastName">Last Name *</label>
            <input 
              type="text" 
              id="lastName" 
              v-model="form.lastName"
              placeholder="Your last name"
              required
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="company">Company *</label>
            <input 
              type="text" 
              id="company" 
              v-model="form.company"
              placeholder="Your company or institution"
              required
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="mobile">Mobile *</label>
            <input 
              type="tel" 
              id="mobile" 
              v-model="form.mobile"
              placeholder="Your mobile number"
              required
            >
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-btn">Create Account</button>
          <button type="button" class="cancel-btn" @click="$router.push('/')">Cancel</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService'

const router = useRouter()
const error = ref('')
const loading = ref(false)

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  display_name: '',
  firstName: '',
  lastName: '',
  company: '',
  mobile: ''
})

const handleSubmit = async () => {
  error.value = ''
  
  if (!form.display_name.trim()) {
    error.value = 'Display Name is required'
    return
  }
  
  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }
  
  if (form.password.length < 6) {
    error.value = 'Password must be at least 6 characters long'
    return
  }
  
  loading.value = true
  
  try {
    const registrationData = {
      email: form.email,
      password: form.password
    }
    
    // Only include display_name if provided
    if (form.display_name.trim()) {
      registrationData.display_name = form.display_name.trim()
    }
    
    // Create details object with optional fields
    const details = {}
    if (form.firstName.trim()) {
      details.firstName = form.firstName.trim()
    }
    if (form.lastName.trim()) {
      details.lastName = form.lastName.trim()
    }
    if (form.company.trim()) {
      details.company = form.company.trim()
    }
    if (form.mobile.trim()) {
      details.mobile = form.mobile.trim()
    }
    
    // Only include details if it has any properties
    if (Object.keys(details).length > 0) {
      registrationData.details = details
    }
    
    await authService.register(registrationData)
    router.push('/login')
  } catch (err) {
    error.value = err.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-section {
  padding: 3rem 2rem;
  background: #f5f7fa;
  color: #333;
}

.register-container {
  max-width: 1000px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 2rem;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
}

.tab {
  padding: 1rem 2rem;
  color: #666;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 3px solid transparent;
}

.tab.active {
  border-bottom-color: #666;
  font-weight: bold;
  color: #333;
}

.warning-message {
  background: #fff3cd;
  color: #856404;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 4px;
}

.warning-message a {
  color: #0066cc;
  text-decoration: underline;
}

.form-row {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.form-group {
  width: 100%;
  max-width: 600px;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.field-help {
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.25rem;
}

input[type="text"],
input[type="email"],
input[type="tel"],
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  background-color: #fff;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
select:focus {
  outline: none;
  border-color: #666;
  box-shadow: 0 0 0 2px rgba(102,102,102,0.1);
}

.radio-group {
  display: flex;
  gap: 2rem;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
  color: #333;
}

.checkbox-group {
  margin-bottom: 0.5rem;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
  color: #333;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
}

.submit-btn {
  background: #0066cc;
  color: #fff;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: #0052a3;
}

.cancel-btn {
  background: #fff;
  color: #333;
  padding: 0.75rem 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background: #f8f9fa;
  border-color: #999;
}

@media (max-width: 600px) {
  .register-container {
    padding: 1.5rem;
  }
  
  .tabs {
    flex-direction: column;
    border-bottom: none;
  }
  
  .tab {
    padding: 0.75rem 0;
    border-bottom: 1px solid #ddd;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .submit-btn,
  .cancel-btn {
    width: 100%;
  }
}
</style> 