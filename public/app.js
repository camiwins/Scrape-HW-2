$.getJSON("/all", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<h2 data-id='" + data[i]._id + "'>" + data[i].title + "</h2><button class='btn-info btn-sm' id='savearticle'>Save</button><br /><br/>" + data[i].link + "</p>")    
        ;
    }
})

$(document).on("click", "#savearticle", function() {
    console.log("clicked save")
})