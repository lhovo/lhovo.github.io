$( document ).ready(function() {
    // console.log( "ready!" );
    var namesBySection = {};

    var sectionLabel = "gsx$section";
    var nameLabel= "gsx$name";
    var locations = ["Schonell","BP Park","Doomben","Whites Hill"];
    var personalStatus = ["Onsite at","Offsite Break From","In Transit To","Out"];

    // Download the google csv and create a list of sections with people
    function getCSV() {
        $.ajax({
            url: "https://spreadsheets.google.com/feeds/list/1Yp2GMe4qqFUhmdN3afjZpng2woGEQix8ccXeOcCCt9k/od6/public/values?gid=763602385&alt=json-in-script",
            type: 'get',
            dataType: "jsonp",
            success: function(data) {
                items = data["feed"]["entry"];
                sectionsList = {};

                $( items ).each(function( index, value ) {
                    //console.log( index, value );
                    if($.inArray( value[sectionLabel]["$t"], Object.keys(namesBySection) ) == -1 )
                    {
                        namesBySection[value[sectionLabel]["$t"]] = []
                        //console.log( value[nameLabel]["$t"], namesBySection );
                    }
                    namesBySection[value[sectionLabel]["$t"]].push(value[nameLabel]["$t"])
                });

                // // Call the function to insert the first level buttons in the web browser
                addRadio(Object.keys(namesBySection).sort(), "#sectionRadio", "section");
                addClick("section", addNames);
            },
            error: function(jqXHR, textStatus, errorThrow){
                alert("Error: " + jqXHR['responseText']);
            }
        });
    }

    function addNames(selection) {
        // Remove anyone already in the list from before, then add the new people
        $('#nameRadio').empty();
        addRadio(namesBySection[selection].sort(), "#nameRadio", "sectionNames");
        addClick("sectionNames", addStatus);
    }

    function addStatus(selection) {
        // Remove anyone already in the list from before, then add the new people
        $('#statusRadio').empty();
        addRadio(personalStatus, "#statusRadio", "statusNames");
        addClick("statusNames", addLocation);
    }

    function addLocation(selection) {
        // Remove anyone already in the list from before, then add the new people
        $('#locationRadio').empty();
        addRadio(locations, "#locationRadio", "locationNames");
        addClick("locationNames", addButton);
    }

    function addButton(selection) {
        $('#buttonDiv').empty();
        $('#buttonDiv').append('<button type="button" class="btn btn-success">Accept</button>');
        $('#buttonDiv').goTo();
        // $('#buttonDiv').append('<button type="button" class="btn btn-danger">Leave</button>');
    }

    // Add all the sections to the page, and make them clickable
    function addRadio(items, div, id) {
        header = '<div class="row"><label style="display: block;">';
        footer = '</label></div>';
        console.log(items);
        $.each(items, function( index, value ) {
            radio = '<div class="col-sm-1" style="text-align:right"><input type="radio" name="'+id+'" value="'+value+'" /></div>';
            label = '<div class="col-sm-4">'+value+'</div>';
            $(div).append(header+radio+label+footer);
        });
        $(div).goTo();
    }

    function addClick(id, callback){
        $("input[name='"+id+"']").on("click", function() {
            callback($(this).val());
        });
    }

    getCSV();
    //console.log(items);
});

(function($) {
    $.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 2000);
        return this; // for chaining...
    }
})(jQuery);