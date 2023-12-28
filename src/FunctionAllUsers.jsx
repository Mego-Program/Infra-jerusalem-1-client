import axios from "axios";
// import urlPage from "../url/urlPath.js";
// import { json } from "react-router-dom";
const AllUsers = async () => {
  try {
    const respons = await axios.post("https://infra-jerusalem-1-server-five.vercel.app/users/allusers");
    // console.log((respons.data));
    return (respons.data);
  } catch (error) {
    console.log(error);
  }
};
export default AllUsers;
