import axios from "axios";

const client = axios.create({ base_url: process.env.REACT_APP_API });

export default client;
