// // AuctionApiFunctions.js
// import { Get } from "../utils/ApiMethods";
// import { AuctionEndpoints } from "./AuctionEndpoints";

import { Get } from "../ApiMethod";
import { AuctionEndpoints } from "./AuctionApiEndPoints";

export const getAuctionList = (data) => {
 
  return Get(AuctionEndpoints.getAuctionList, data); 
  
};