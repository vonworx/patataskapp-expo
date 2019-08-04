export default {
    async fetchGETRestData(restURI) {
        try {
                let response = await fetch(restURI);
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    }
}
