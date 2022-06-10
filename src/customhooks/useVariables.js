const useVariables = () => {

   const main_host_url = "127.0.0.1:8000";
   const host_url = 'http://127.0.0.1:8000';
   const posts_url = 'http://127.0.0.1:8000/api/posts/';
   const tells_url = 'http://127.0.0.1:8000/api/tells/';
   const discover_url = 'http://127.0.0.1:8000/api/discover/';
   const search_url = 'http://127.0.0.1:8000/api/search/';
   const messages_url = 'http://127.0.0.1:8000/api/messages/';
   const requests_url = 'http://127.0.0.1:8000/api/messages/requests/';

   const owner_url = 'http://127.0.0.1:8000/api/users/';
   const users_host_url = 'http://127.0.0.1:8000/api/users/';

   const register_url = 'http://127.0.0.1:8000/api/users/register/';
   
   const activity_url = 'http://127.0.0.1:8000/api/users/activity/';
   const saved_posts_url = 'http://127.0.0.1:8000/api/users/saved-posts/';
   const saved_tells_url = 'http://127.0.0.1:8000/api/users/saved-tells/';

   const token_url = 'http://127.0.0.1:8000/api/users/token/';
   const refresh_url = 'http://127.0.0.1:8000/api/users/token/refresh/';
   const token_key = 'seefriends.auth.key';

   let access_token = JSON.parse(localStorage.getItem(token_key));
   let refresh_token = JSON.parse(localStorage.getItem(token_key));

   // Simply grabs an access token and refresh token if available
   if (access_token === null) access_token = "";
   else access_token = access_token.access;
   if (refresh_token === null) refresh_token = "";
   else refresh_token = refresh_token.refresh;

   
   return {
      main_host_url, host_url, posts_url, tells_url, discover_url, search_url, messages_url, requests_url, owner_url, activity_url, users_host_url, saved_posts_url, saved_tells_url, register_url,

      token_url, refresh_url, token_key,
      
      access_token, refresh_token,
   };
}

export default useVariables;