// // AuctionApiFunctions.js
// import { Get } from "../utils/ApiMethods";
// import { AuctionEndpoints } from "./AuctionEndpoints";

import { Get } from "../ApiMethod";
import { AuctionEndpoints } from "./AuctionApiEndPoints";

export const getAuctionList = (data) => {
 
  return Get(AuctionEndpoints.getAuctionList, false); 
  
};
<<<<<<< HEAD
=======

export const getVehicleDetailsByAuctionId = (auctionId) => {
  return Get(`${AuctionEndpoints.getVehicleDetails}/${auctionId}`, false);
};
>>>>>>> 8b8bf4cbfea0814f3ffede99f7725647b1fa0285
