import axios from "axios";

// Function to fetch users from GitHub with optional filters
export const fetchUserData = async (username, location = "", minRepos = 0) => {
  try {
    let query = `${username} in:login`;

    if (location) {
      query += ` location:${location}`;
    }

    if (minRepos > 0) {
      query += ` repos:>=${minRepos}`;
    }

    const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
};