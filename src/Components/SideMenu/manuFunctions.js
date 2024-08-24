import axios from "axios";
import { BaseURL } from "../Masters/masterPagefunctions";


export const getMenuItems = async (setMenuItems) => {
  const userid = sessionStorage.getItem('userid');
  try {
    const response = await axios.get(
      `https://operations.${BaseURL}/api/menus/${userid}`
    );

    if (response.status === 200) {
      console.log("Menu data", response.data);
      setMenuItems(response.data)
    } else {
      console.error("Request failed with status:", response.status);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};