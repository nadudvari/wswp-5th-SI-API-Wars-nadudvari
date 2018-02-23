
$(document).ready( function () {
    console.log('ready')
});

let incomingData = $('.residentsData').attr('data-residents');
console.log(incomingData);


let residentModal = $('.residentsModal');


residentModal.click(residentsModalFill());


function residentsModalFill () {
    for (let i = 0; i < incomingData.length; i++){
        console.log(incomingData[i]);
        $.getJSON(incomingData[i], function(datas){
            $.each(datas.results, function(i, data){
                    $('.residentsModal').append('<tr><td>' + data.name + '</td>' +
                        '<td>' + data.height + '</td>' +
                        '<td>' + data.mass + '</td>' +
                        '<td>' + data.skin_color + '</td>' +
                        '<td>' + data.hair_color + '</td>' +
                        '<td>' + data.eye_color + '</td>' +
                        '<td>' + data.birth_year + '</td>' +
                        '<td>' + data.gender + '</td></tr>'
                        );
                    })
            });

        }
    }






