import AxiosService from './AxiosService';
import Utils from '../environment/ContactForm';

class AxiosClient extends AxiosService {
  constructor() {
    if (!AxiosClient.instance) {
      // if an instance does not exist
      super();
      super.getAxios().defaults.baseURL = Utils.getBackEndBaseURL();
      AxiosClient.instance = this;
    }
    return AxiosClient.instance;
  }
  submitContactForm(payload) {
    return super.getAxios().post('server/', payload); // Returns A PROMISE
  }
}

const instance = new AxiosClient();
Object.freeze(instance);

export default instance; //Singleton pattern.
