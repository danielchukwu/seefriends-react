// imports: icon headers
import sf_logo from "../images/logos/seefriends-logo-4.png";
import discover_icon from "../images/icons/search/search.png";
import msg_icon from "../images/icons/send/send.png";
import go_back_icon from "../images/icons/back icons/back-1.png";
import done_black_icon32 from "../images/icons/done/check-markb-32.png";
import done_blue_icon32 from "../images/icons/done/check-markbl-32.png";

// imports: icon footers
import feed_icon from "../images/footer icons/footer-feed.png";
import tells_icon from "../images/footer icons/footer-tells.png";
import upload_icon from "../images/footer icons/footer-add.png";
import activity_icon from "../images/footer icons/footer-likes.png";
import account_icon from "../images/footer icons/footer-user.png";

// imports: post & tells
import verified_icon from "../images/icons/verified/verified-blue2.png";
import heart_black_icon from "../images/icons/heart/heartb-16.png";
import heart_red_icon from "../images/icons/heart/heartr-16.png";
import send_small_icon from "../images/icons/send/send-16.png";
import save_icon from "../images/icons/bookmark/bookmark-16.png";
import saved_icon from "../images/icons/bookmark/bookmarkb-16.png";
import options_icon from "../images/icons/options/option-black.png";
import cancel_icon from "../images/icons/cancel/close.png";

import heart_white_icon32 from '../images/icons/heart/heartw-32.png';
import heart_red_icon32 from '../images/icons/heart/heartr-32.png';

import heart_red_icon256 from '../images/icons/heart/heartr-256.png';




const useIcons = () => {

   return {
      // header
      sf_logo, discover_icon, msg_icon, go_back_icon, done_black_icon32, done_blue_icon32,
      // footers
      feed_icon, tells_icon, upload_icon, activity_icon, account_icon, 
      // posts and tells
      verified_icon, heart_black_icon, heart_red_icon, send_small_icon, save_icon, saved_icon, options_icon, heart_white_icon32, heart_red_icon32, heart_red_icon256, cancel_icon
   };
   
}

export default useIcons;