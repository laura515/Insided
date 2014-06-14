$(function() {
  
  

  //
  //Advanced Search and drop downs functions
  //
  $.fn.advancedSearchDropDowns = function(opts, methods ) {

    var $section = $(this);
    var multiSelecDD, datePickerDD, whenDD, firstSeleDD, inactiveDD = "";
    var rowIndex = 1;

    var initialize = function() {

      initTemplatesDropDown();
      createRowDropDown();
      staticHandlerEvents();
      
      return $section;
    };

    //
    // create new dropdown row and first dropdown
    //
    function createRowDropDown(){
      
      var $rowTemplate = $('<div class="row clearfix" id=row'+rowIndex+'><a class="btRemoveRow" href="#"><span></span></a></div>');      
      var $firstdropDown = $(firstSeleDD);

      $rowTemplate.append($firstdropDown);
      $section.append($rowTemplate);

      openCloseEvent($rowTemplate.find('.dropdownContainer'));
      removeRowEvent($rowTemplate.find('.btRemoveRow'));
      selectOptionEvent($firstdropDown.find('a'));

      rowIndex++;
    }

    //
    // init general handlers events
    //
    function staticHandlerEvents(){
      
      // event click on addRow
      $('.addRow').on('click', function(e){
        e.preventDefault();
        createRowDropDown();
        closeDropDowns($(this));
      });

      //clear all- clear selection button
      $('.middleSelection .cancelOpt').on('click', function(e){
        e.preventDefault();

        $('.btRemoveCat').each(function(){
          $(this).remove();
        });
        $('.plusCat').each(function(){
          $(this).remove();
        });
        $('.row').each(function(){
          $(this).remove();
        });

        $(this).hide();

      });

      //footer dropdowns
      openCloseEvent($('.footerResults .dropdownContainer'));

    }

    // toggle dropdown event
    function openCloseEvent($dropdown){

      //open/close dropdown
     $dropdown.not('.multiSelec').not('.inactive').on('click', function(e){
        
        e.preventDefault();

        closeDropDowns($(this));
        $(this).toggleClass('open');      

        if($(this).hasClass('selectDate')){

          if(!$(this).hasClass('open')){
            $( ".ui-datepicker" ).hide();
          }else{
            $( ".ui-datepicker" ).show();
          }
        }
      });
    }

    //event delete row X button
    function removeRowEvent($deleteBt){

      var $row, $tagBt = {};
      var tagRow = 0;

      $deleteBt.on('click', function(e){
        e.preventDefault();

        $row = $(this).parent();
        tagRow = findTagRemoveButton($row.attr('id'));
        $row.remove();

        if(tagRow > 0){
          removeTagSelection($('a.btRemoveCat[data-id='+$row.attr('id')+']'));
        }
        
      });
    }

    //add handler event selection for the new dropdowns
    function selectOptionEvent($dropdownSel){

      var $list, $optSelected = {};

      $dropdownSel.on('click', function(e){
        
        e.preventDefault();

        $optSelected = $(this);
        
        if($optSelected.closest('.dropdownContainer').hasClass('open')){

          $list = $optSelected.closest('ul');
          $optSelected.not('.placeholder').parent().prependTo($list);
          $list.find('.placeholder').parent().hide();

          createNewDropDown($optSelected.attr('class'), $optSelected);

        }
      });
    }

    //create new dropdown related to the previous selection
    //add related events
    function createNewDropDown(typeDD, $currentDD){

      var $currentDD = $currentDD.closest('.dropdownContainer');
      var $currentRow = $currentDD.closest('.row');
      var $dropdownTemp = {};
      
      if( typeDD == 'dateP'){
        
        if($currentRow.find('.dropdownContainer').length < 3){

          $dropdownTemp = $(datePickerDD);
          createDataPicker($dropdownTemp);
          openCloseEvent($dropdownTemp);
        }

      }else{

        if($currentRow.find('.dropdownContainer').length > 1){
          $currentRow.find('.dropdownContainer').not($currentDD).remove();
        } 
      }

      if( typeDD == 'comDD'){
        $dropdownTemp = $(inactiveDD);

      }else if( typeDD == 'regDD'){
        $dropdownTemp = $(whenDD);
        openCloseEvent($dropdownTemp);
        addWhenDDEvent($dropdownTemp);

      }else if(typeDD == 'usrDD'){
        $dropdownTemp = $(multiSelecDD);
        addMultiSelecEvent($dropdownTemp);
      }

      $currentRow.append($dropdownTemp);

      if( typeDD == 'usrDD' || typeDD == 'dateP' || typeDD == 'comDD'){
        showDeleteRowButton($currentRow);
        addSelectionTag(typeDD, $currentRow.attr('id'));
      }else{
        $currentRow.find('.btRemoveRow').hide();
      }

    }

    //create datapicker element
    function createDataPicker($currentDD){
      $currentDD.find( ".datepicker" ).datepicker({
        dateFormat: "d-M-y", dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        onClose: function() {
          $(this).closest('.selectDate.open').removeClass('open');
        }
      });
    }

    //create selection tag buttons
    function addSelectionTag(typeDD, rowID){
        
      var $tagBt = {};
      var text, tagTemplate = "";
      var tagRowExists = findTagRemoveButton(rowID);

      if(tagRowExists < 1){
        
        if(typeDD == 'usrDD') text = 'Category';
        else if(typeDD == 'dateP') text = 'Tags';
        else text = 'Views';

        tagTemplate = '<a class="btRemoveCat lightGreyStyle" href="#" data-id='+rowID+'><span>x</span>'+text+'</a>';

        if($('.btRemoveCat').length > 0){
          tagTemplate = '<span class="plusCat">+</span>' + tagTemplate;
          $('.cancelOpt').show();
        }
        
        $tagBt = $(tagTemplate);

        $('.tagsContainer').append($tagBt);

        tagRemoveRowEvent();
      }
        
    }

    //find a specific tag button
    function findTagRemoveButton(rowID){
      return $('.btRemoveCat[data-id='+rowID+']').length;
    }

    // show delete row button
    function showDeleteRowButton ($currentRow) {
      $currentRow.find('.btRemoveRow').appendTo($currentRow).show();
    }

    //add tag Remove row event 
    function tagRemoveRowEvent(){
      
      $('.btRemoveCat').on('click', function(e){
        e.preventDefault();

        removeTagSelection($(this));
        $('#'+$(this).attr('data-id')).remove();
        
      });
    }

    //remove button tag selection
    function removeTagSelection($tag){  
      
      var $prevEl = $tag.prev();

      if($prevEl.hasClass('plusCat')){
        $prevEl.remove();
      }
      
      $tag.remove();
      
      if($('.btRemoveCat').length < 1){
        $('.middleSelection').find('.cancelOpt').hide();
      }
    }

    //add event to the When dropdown (on/before/after)
    function addWhenDDEvent($currentDD){
      
      var $list = $currentDD.find('ul');

      //click event drop down multi selection
      $currentDD.find('a').on('click', function(e){
        $(this).parent().prependTo($list);
        createNewDropDown('dateP', $currentDD);
      });

    }

    function addMultiSelecEvent($currentDD){

      //click event drop down multi selection
      $currentDD.find('.placeholder').on('click', function(e){
        e.preventDefault();
        var $dropdownContainer = $(this).closest('.dropdownContainer');

        $dropdownContainer.toggleClass('open');
        closeDropDowns($dropdownContainer);
      });

      //check checkbox when clicking in the respective a 
      $currentDD.find('.group').find('a').on('click', function(e){
        e.preventDefault();

        var checkBoxes = $(this).find('input');
        checkBoxes.prop("checked", !checkBoxes.prop("checked"));
      });

      // uncheck all checkbox in multi selection dropdown
      $currentDD.find('.uncheckall').on('click', function(e){
        e.preventDefault();
        
        $(this).parent().find('input').each(function(){
          $(this).prop("checked", false);
        });
      });

      // check all checkbox in multi selection dropdown
      $currentDD.find('.checkall').on('click', function(e){
        e.preventDefault();
        
        $(this).parent().find('input').each(function(){
          $(this).prop("checked", true);
        }); 
      
      });
    }

    //close others drop down when another/new one is opened
    function closeDropDowns($current){
      $('.dropdownContainer').not($current).removeClass('open');
    }

    function initTemplatesDropDown () {
      
      multiSelecDD = '<div class="dropdownContainer multiSelec">'+
                      '<div class="dropdown lightGreyStyle">'+
                      '<a href="#" class="placeholder">Select one or more options</a>'+
                        '<div class="groupContainer">'+

                          '<a class="linkBlue checkall" href="#">Check all</a>'+
                          '<a class="linkBlue uncheckall" href="#">Uncheck all</a>'+

                          '<div class="group">'+
                            '<h4>Group 1</h4>'+
                            '<ul>'+
                                '<li><a href="#"><input type="checkbox" name="op1group1" value="op1group1">Option #1 for group 1</a></li>'+
                                '<li><a href="#"><input type="checkbox" name="op2group1" value="op2group1">Option #2 for group 1</a></li>'+
                                '<li><a href="#"><input type="checkbox" name="op3group1" value="op3group1">Option #3 for group 1</a></li>'+
                            '</ul>'+
                          '</div>'+
                          '<div class="group">'+
                            '<h4>Group 2</h4>'+
                            '<ul>'+
                              '<li><a href="#"><input type="checkbox" name="op1group2" value="op1group2">Forum </a></li>'+
                              '<li><a href="#"><input type="checkbox" name="op2group2" value="op2group2">Ipsum </a></li>'+
                              '<li><a href="#"><input type="checkbox" name="op3group2" value="op3group2">Dolor</a></li>'+
                            '</ul>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                      '<span class="arrow"></span>'+                               
                     '</div>';

      datePickerDD = '<div class="dropdownContainer selectDate">'+
                        '<div class="dropdown lightGreyStyle">'+
                            '<input type="text" class="datepicker" size="30" placeholder="Select date" readonly>'+
                        '</div>'+
                        '<span class="arrow"></span>'+
                      '</div>';
      
      whenDD = '<div class="dropdownContainer">'+
                  '<ul class="dropdown lightGreyStyle">'+
                    '<li><a href="#">before</a></li>'+
                    '<li><a href="#">after</a></li>'+
                    '<li><a href="#">on</a></li>'+
                  '</ul>'+
                  '<span class="arrow"></span>'+
                '</div>';

      firstSeleDD = '<div class="dropdownContainer firstSeleDD">'+
                      '<ul class="dropdown lightGreyStyle">'+
                        '<li><a href="#" class="placeholder">Select one</a></li>'+
                        '<li><a class="comDD" href="#">Comments</a></li>'+
                        '<li><a class="regDD" href="#">Registration date</a></li>'+
                        '<li><a class="usrDD" href="#">Usergroup</a></li>'+
                      '</ul>'+
                      '<span class="arrow"></span>'+
                    '</div>'; 

      inactiveDD = '<div class="dropdownContainer inactive">'+
                      '<ul class="dropdown lightGreyStyle">'+
                        '<li><a href="#">is greater than</a></li>'+
                      '</ul>'+
                      '<span class="arrow"></span>'+                                
                    '</div>';
    }
    
    return initialize();
  }

  $.fn.tableResults = function(opts, methods ) {

    var $section = $(this);

    var initialize = function() {

      addCheckEvents();
      return $section;
    };

    function addCheckEvents(){
      
      //select someone in the table
      $('.tableList').find('input').change(function() {

        $(this).closest('li').toggleClass('selected');

        if($(this).is(":checked")) {
          $('.dropdownsFooter').show();
        }else if ($('.tableList').find('input:checked').length == 0){
          $('.dropdownsFooter').hide();
        }
      });
    }

    return initialize();
  }
 
  $('.dropdownsSection').advancedSearchDropDowns();
  $('.resultSection').tableResults();


});