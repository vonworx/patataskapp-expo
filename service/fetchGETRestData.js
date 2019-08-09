export default {
    async fetchData(restURI) {
        try {
                const URI = restURI;
                let response = await fetch(URI);
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log('ERR : ' + e)
        }
    }
}
