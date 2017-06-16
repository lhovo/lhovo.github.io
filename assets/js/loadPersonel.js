$( document ).ready(function() {
    // console.log( "ready!" );
    var namesBySection = {};

    var sectionLabel = "Section";
    var nameLabel= "Name";

    // Download the google csv and create a list of sections with people
    function getCSV() {
        $.ajax({
            url: "https://docs.google.com/spreadsheets/d/1Yp2GMe4qqFUhmdN3afjZpng2woGEQix8ccXeOcCCt9k/pub?output=csv",
            type: 'get',
            success: function(data) {
                items = $.csv.toObjects(data);
                sectionsList = {};

                $( items ).each(function( index, value ) {
                  if($.inArray( value[sectionLabel], Object.keys(namesBySection) ) == -1 )
                  {
                        namesBySection[value[sectionLabel]] = []
                        console.log( value[nameLabel], namesBySection );
                  }
                  namesBySection[value[sectionLabel]].push(value[nameLabel])
                  
                });

                // Call the function to insert the first level buttons in the web browser
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
            $('#sectionRadio').append('<input type="radio" name="section" value="'+value+'" />'+value+'<br/>');
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
            $('#nameRadio').append('<input type="radio" name="section" value="'+value+'" />'+value+'<br/>');
        });
        
        // $("input[name='section']").on("click", function() {
        //     addNames($(this).val());
        // });
    }

    getCSV();
    //console.log(items);
});