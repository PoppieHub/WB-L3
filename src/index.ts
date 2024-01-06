import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { userService } from "./services/user.service";

userService.init();
cartService.init();

new Router();

setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);
