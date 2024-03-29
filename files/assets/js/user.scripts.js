

$(document).ready( function() {
    $.ajax({
        url: 'http://localhost:3000/api/users',
        type: 'get',
        dataType: 'JSON'
    })
    .done( function(response) {

        let data = response.data;
        let status = response.status;

        if (status) {
            createTbody(data);
        } else {
            console.log("Πρόβλημα στην Αναζητηση των χρηστων");
        }
    });

    $('.row').on('click', '.btnSubmit', function() {
        
        let username = $('#username').val();
        let password = $('#password').val();
        let name = $('#name').val();
        let surname = $('#surname').val();
        let email = $('#email').val();

        const item = {
            'username': username,
            'password': password,
            'name': name,
            'surname': surname,
            'email': email
        }

        $.ajax({
            url: 'http://localhost:3000/api/users',
            type: 'post',
            data: item,
            dataType: 'JSON'
        })
        .done (function (response) {
            console.log(response);
        })

    })

});



function createTbody(data) {
    
    const len = data.length;

    for (let i = 0; i < len; i++) {

        let username = data[i].username;
        let name = data[i].name;
        let surname = data[i].surname;
        let email = data[i].email;


        let tr_str = "<tr>" + 
        "<td>" + username + "</td>" +
        "<td>" + name + "</td>" +
        "<td>" + surname + "</td>" +
        "<td>" + email + "</td>" +
        "</tr>";

        $("#userTable tbody").append(tr_str);

    }
}