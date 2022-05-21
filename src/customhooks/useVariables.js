const useVariables = () => {
   const posts_url = 'http://127.0.0.1:8000/api/posts/'
   const host_url = 'http://127.0.0.1:8000'

   const token_url = 'http://127.0.0.1:8000/api/users/token/'
   const refresh_url = 'http://127.0.0.1:8000/api/users/token/refresh/'
   const token_key = 'seefriends.auth.key'

   return {posts_url, host_url, token_url, refresh_url, token_key};
}

export default useVariables;