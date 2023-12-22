export default function logOutUser() {
     try {
          localStorage.removeItem("visualization_user_token")
          return true
     } catch (error) {
          return false
     }
}