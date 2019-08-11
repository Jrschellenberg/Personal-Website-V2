import HomeController from '../controllers/home';
//import AuthenticationService from '../services/authentication';

//Route for JavaScript for Home page.
export default function members(ctx, next) {
  //new HomeController(new AuthenticationService());
  new HomeController();

  next();
}
