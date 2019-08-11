require('dotenv').config();

class ContactForm {
  constructor() {
    if (!ContactForm.instance) {
      // if an instance does not exist
      this.recaptchaToken = null;
      let ContactFormClass = this;
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(ContactForm.getRecaptchaKey(), { action: 'contact_form' }).then(token => {
          ContactFormClass.setRecaptchaToken(token);
          // Set token here to be passed to server request later..
        });
      });
      ContactForm.instance = this;
    }
    return ContactForm.instance;
  }
  getFrontEndBaseURL() {
    // NODE_ENV passed through package.json
    return process.env.NODE_ENV === 'production'
      ? process.env.FRONTEND_PROD_BASE_URL
      : process.env.FRONTEND_DEV_BASE_URL;
  }
  getBackEndBaseURL() {
    return process.env.NODE_ENV === 'production'
      ? process.env.BACKEND_PROD_BASE_URL
      : process.env.BACKEND_DEV_BASE_URL;
  }

  isTestEnvironment() {
    return process.env.NODE_ENV === 'test';
  }
  static getRecaptchaKey() {
    return process.env.CAPTCHA_KEY;
  }
  setRecaptchaToken(token) {
    this.recaptchaToken = token;
  }
  getRecaptchaToken() {
    return this.recaptchaToken;
  }
  log(data) {
    process.env.NODE_ENV === 'production' ? void 0 : console.log(data);
  }
}

const instance = new ContactForm();

export default instance; //Singleton pattern. only exposing this one instance.
