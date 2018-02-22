
let dataHandler = {

    getResidentsApi: function () {
        let residentsAPI = document.getElementsByClassName('residentsData');
        for (let i = 0, i < residentsAPI.length, i++){
            console.log(residentsAPI[i])
        }
    }
};
getResidentsApi();
