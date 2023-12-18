import axios from "axios";
import urlPage from "../url/urlPath.js"
const AllUsers = async ()=>{
    try {
      const respons = await axios.post(urlPage + "users/allUsers")
      return respons.data
    } catch (error) {
      console.log(error);
    }
  }
  export default AllUsers