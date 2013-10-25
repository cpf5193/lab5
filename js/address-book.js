/* address-book.js
    this is where you will add your JavaScript to complete Lab 5
*/


/* sortObjArray()
    sorts an array of objects by a given property name
    the property values are compared using standard 
    operators, so this will work for string, numeric,
    boolean, or date values

    objArray        array of objects to sort
    propName        property name to sort by

    returns undefined (array is sorted in place)
*/
function sortObjArray(objArray, propName) {
    if (!objArray.sort)
        throw new Error('The objArray parameter does not seem to be an array (no sort method)');
    
    //sort the array supplying a custom compare function
    objArray.sort(function(a,b) {
        
        //note: this compares only one property of the objects
        //see the optional step where you can add support for 
        //a secondary sort key (i.e., sort by another property)
        //if the first property values are equal
        if (a[propName] < b[propName])
            return -1;
        else if (a[propName] === b[propName])
            return 0;
        else
            return 1;
    });
} //sortObjArray()

function render(entries){
    var container = $(".address-book");
    container.hide();
    container.empty();
    var template = $(".template");
    var copy;
    $.each(entries, function(){
        copy = template.clone();
        copy.find(".pic").attr({
            "src" : this.pic,
            "alt" : "picture of " + this.first + " " + this.last
        });
        copy.find(".first").html(this.first);
        copy.find(".last").html(this.last);
        copy.find(".title").html(this.title);
        copy.find(".dept").html(this.dept);
        copy.removeClass("template");
        container.append(copy);
    });
    container.fadeIn(1500);
}

function sortList(){
    var clicked = $(this);
    clicked.siblings(['.active']).removeClass('active');
    clicked.addClass('active');
    var entries = Employees.entries;
    sortObjArray(entries, clicked.attr('data-sortby'));
    render(entries);
}

$(function(){
    var entries = Employees.entries;
    sortObjArray(entries, 'last');
    render(entries);
    $('.sort-ui .btn').click(sortList);
    $('.sort-ui .btn').popover({
        content: function(){ return 'Click to Resort by ' + $(this).html();},
        container: 'body',
        trigger: 'hover',
        placement: 'bottom'
    });
});

