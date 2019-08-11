import AxiosService from './AxiosService';
import Environment from '../environment/Environment';

class NetlifyBackendClient extends AxiosService {
  constructor() {
    const backendStoreURL = Environment.getNetlifyBackendURL();
    super({ baseURL: backendStoreURL });
  }

  static getInstance = () => {
    if (!NetlifyBackendClient.instance) {
      NetlifyBackendClient.instance = new NetlifyBackendClient();
    }
    return NetlifyBackendClient.instance;
  };
}

export default NetlifyBackendClient;
