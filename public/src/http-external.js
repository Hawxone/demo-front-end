import axios from "axios";

export default axios.create({
    baseURL: "https://api.pexels.com/v1/",
    headers: {
        Authorization:'563492ad6f9170000100000173fb438d8dcf4235928084398194fb69'
    }
});
