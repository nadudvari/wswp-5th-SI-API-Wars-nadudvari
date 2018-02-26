

let main = {

    init: function () {
        $(document).ready( function () {
            main.buttonsEventHandler();
        });
    },

    loadResidentsTable: function  (title, residents) {
        $('.residentsModalBody').html('');
        $('.modal-title').html('');
        $('.modal-title').append('Residents of the planet ' + title);
        for (let resident of residents) {
            $.getJSON(resident, function (info) {
                    $('.residentsModalBody').append('<tr><td>' + info.name + '</td>' +
                        '<td>' + info.height + '</td>' +
                        '<td>' + info.mass + '</td>' +
                        '<td>' + info.skin_color + '</td>' +
                        '<td>' + info.hair_color + '</td>' +
                        '<td>' + info.eye_color + '</td>' +
                        '<td>' + info.birth_year + '</td>' +
                        '<td>' + info.gender + '</td></tr>'
                    );
            })
        }
    },

    buttonsEventHandler: function  () {
        $('.residentsModal').click( function() {
            $('#residentsModal').modal('show');
            let planetName = $(this).attr('data-planet-name');
            let planetUrl = $(this).attr('data-residents');
            $('#residentsModal').data('planet-url', planetUrl);
            $.getJSON(planetUrl, function(datas){
                main.loadResidentsTable(planetName, datas.residents);
            })
        })
    }


};

main.init();


