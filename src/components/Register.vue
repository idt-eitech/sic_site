<template>
  <section id="register" class="register-section">
    <div class="register-container">
      <div class="tabs">
        <div class="tab active">Create new account</div>
        <router-link to="/login" class="tab">Log in</router-link>
        <router-link to="/reset-password" class="tab">Reset password</router-link>
      </div>

      <div class="warning-message">
        We use reCaptcha during our registration process, but please note that reCaptcha may not work in all regions. 
        If you have issues with reCaptcha, contact <a href="mailto:info@sic.org">info@sic.org</a> for assistance.
      </div>

      <form @submit.prevent="handleSubmit" class="register-form">
        <div class="form-row">
          <div class="form-group">
            <label for="username">Username *</label>
            <input 
              type="text" 
              id="username" 
              v-model="form.username" 
              required
            >
            <div class="field-help">Spaces are allowed; punctuation is not allowed except for periods, hyphens, apostrophes, and underscores.</div>
          </div>
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
            <div class="field-help">A valid email address. All emails from the system will be sent to this address. The email address is not made public and will only be used if you wish to receive a new password or wish to receive certain news or notifications by email.</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name *</label>
            <input 
              type="text" 
              id="firstName" 
              v-model="form.firstName" 
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
              required
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="jobTitle">Job Title</label>
            <input 
              type="text" 
              id="jobTitle" 
              v-model="form.jobTitle"
            >
            <div class="field-help">(Example: Manager, System Engineer, etc.)</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="company">Company/Institution</label>
            <input 
              type="text" 
              id="company" 
              v-model="form.company"
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="address1">Address 1 *</label>
            <input 
              type="text" 
              id="address1" 
              v-model="form.address1"
              required
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="address2">Address 2</label>
            <input 
              type="text" 
              id="address2" 
              v-model="form.address2"
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="city">City *</label>
            <input 
              type="text" 
              id="city" 
              v-model="form.city"
              required
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="state">State *</label>
            <select id="state" v-model="form.state" required>
              <option value="">- Select -</option>
              <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="zip">ZIP code *</label>
            <input 
              type="text" 
              id="zip" 
              v-model="form.zip"
              required
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="sector">In what sector do you work? *</label>
            <select id="sector" v-model="form.sector" required>
              <option value="">- Select a value -</option>
              <option value="academic">Academic</option>
              <option value="industry">Industry</option>
              <option value="government">Government</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="jobFunction">What is your primary job function? *</label>
            <select id="jobFunction" v-model="form.jobFunction" required>
              <option value="">- Select a value -</option>
              <option value="academic">Academic/Researcher</option>
              <option value="engineer">Engineer/Developer</option>
              <option value="admin">System/Network Administration</option>
              <option value="manager">Manager/Director</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Are you a full time student? *</label>
            <div class="radio-group">
              <label>
                <input type="radio" v-model="form.isStudent" :value="false"> No
              </label>
              <label>
                <input type="radio" v-model="form.isStudent" :value="true"> Yes
              </label>
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <h3>Communications Preferences</h3>
            <div class="checkbox-group">
              <label>
                <input type="checkbox" v-model="form.optOutEmail">
                Opt out of all email from SIC
              </label>
            </div>
            <div class="checkbox-group">
              <label>
                <input type="checkbox" v-model="form.optOutMail">
                Opt out of paper mail
              </label>
            </div>
            <div class="checkbox-group">
              <label>
                <input type="checkbox" v-model="form.optOutThirdParty">
                Opt out of paper mail from third-party partners
              </label>
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <div class="captcha-container">
              <!-- Add reCAPTCHA component here -->
              <div class="captcha-placeholder">reCAPTCHA will be implemented here</div>
            </div>
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
import { reactive } from 'vue'

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
  'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
  'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
]

const form = reactive({
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  jobTitle: '',
  company: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  sector: '',
  jobFunction: '',
  isStudent: false,
  optOutEmail: false,
  optOutMail: false,
  optOutThirdParty: false
})

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', form)
}
</script>

<style scoped>
.register-section {
  padding: 3rem 2rem;
  background: #f5f7fa;
  color: #333;
}

.register-container {
  max-width: 800px;
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
}

.form-group {
  width: 100%;
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

.captcha-container {
  margin: 1rem 0;
}

.captcha-placeholder {
  padding: 2rem;
  background: #f8f9fa;
  border: 1px dashed #ccc;
  text-align: center;
  color: #666;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
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