const URI = 'http://52.34.74.81';

export default {
    async fetchUsers() {
        try {
                let response = await fetch(URI + '/db.json');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    }
}
