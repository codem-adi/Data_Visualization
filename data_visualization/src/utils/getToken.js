export default function getToken() {
     try {
          const Token = localStorage.getItem("visualization_user_token")
          if (Token.length) {
               return JSON.parse(Token);
          }
          else {
               return null
          }
     } catch (error) {
          return null
     }
}