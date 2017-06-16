$( document ).ready(function() {
    // console.log( "ready!" );
    var namesBySection = {};

    var sectionLabel = "gsx$section";
    var nameLabel= "gsx$name";

    // Download the google csv and create a list of sections with people
    function getCSV() {
        $.ajax({
            url: "https://spreadsheets.google.com/feeds/list/1Yp2GMe4qqFUhmdN3afjZpng2woGEQix8ccXeOcCCt9k/od6/public/values?alt=json-in-script",
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
                        console.log( value[nameLabel]["$t"], namesBySection );
                    }
                    namesBySection[value[sectionLabel]["$t"]].push(value[nameLabel]["$t"])
                });

                // // Call the function to insert the first level buttons in the web browser
                addSections(namesBySection);
            },
            error: function(jqXHR, textStatus, errorThrow){
                alert("Error: " + jqXHR['responseText']);
            }
        });
    }

    // Add all the sections to the page, and make them clickable
    function addSections(items) {
        $.each(Object.keys(items).sort(), function( index, value ) {
            $('#sectionRadio').append('<label><input type="radio" name="section" value="'+value+'" />'+value+'<br/></label>');
        });
        
        $("input[name='section']").on("click", function() {
            addNames($(this).val());
        });
    }

    function addNames(sectionName) {
        //console.log(namesBySection[sectionName]);

        // Remove anyone already in the list from before, then add the new people
        $('#nameRadio').empty();
        $.each(namesBySection[sectionName], function( index, value ) {
            $('#nameRadio').append('<label><input type="radio" name="sectionNames" value="'+value+'" />'+value+'</label><br/>');
        });
        
        $("input[name='sectionNames']").on("click", function() {
            addButton();
        });
    }

    function addButton() {
        $('#buttonDiv').empty();
        $('#buttonDiv').append('<button type="button" class="btn btn-success">Arrive</button>');
        $('#buttonDiv').append('<button type="button" class="btn btn-danger">Leave</button>');
    }

    getCSV();
    //console.log(items);
});