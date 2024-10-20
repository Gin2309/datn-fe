import account from "./account";
import config from "./config";
import price from "./price";
import overview from "./overview";
import move from "./move";
import support from "./support";
import transaction from "./transaction";

const menuItems = {
  items: [overview, account, move, price, transaction, support, config],
};

export default menuItems;
