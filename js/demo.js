$(document).ready(function(){
  var sample_data = [
  { 'id' : '000', 'surName' : 'Caster', 'lastName' : 'Troy', 'gender' : 'Male' },
  { 'id' : '001', 'surName' : 'Sean', 'lastName' : 'Archor', 'gender' : 'Male' },
  { 'id' : '002', 'surName' : 'Eve', 'lastName' : 'Archor', 'gender' : 'Female' }
  ];

  var lastSel = '';

  $('table#sample').jqGrid({
    datatype: 'local',
    data: sample_data,
    height: 400,
    colNames: ['id', 'surName', 'lastName', 'gender'],
    colModel: [
    { name: 'id', index: 'id', sortable: true, sorttype: 'string', editable: false },
    { name: 'surName', index: 'surName', sortable: true, sorttype: 'string', editable: true, edittype: 'text' },
    { name: 'lastName', index: 'lastName', sortable: true, sorttype: 'string', editable: true, edittype: 'text' },
    { name: 'gender', index: 'gender', sortable: true, sorttype: 'string', editable: true, edittype: 'custom', 
      editoptions: {
        custom_element: function(value, editOptions){
          var span = $('<span />');
          var male = $('<input>', { type: 'radio', value: 'Male', name: 'gender', id: '1', checked: (value == 'Male') });
          var maleCaption = $('<span />', { html: 'Male' });
          var female = $('<input>', { type: 'radio', value: 'Female', name: 'gender', id: '0', checked: (value == 'Female') });
          var femaleCaption = $('<span />', { html: 'Female' });

          return span.append(male).append(maleCaption).append(female).append(femaleCaption);
        }, 
        custom_value: function(elem, oper, value){
          if(oper === 'set'){
            var radioButton = $(elem).find('input:radio[value="' + value + '"]');
            radioButton.prop('checked', true);
          }

          if(oper === 'get'){
            return $(elem).find('input:radio:checked').val();
          }
        }
      } 
    }
    ],
    editurl: 'clientArray',
    rowNum: 20,
    rowList: [20, 50, 100],
    pager: '#pager',
    caption: 'Charactors',
    onSelectRow: function(id){
      if(id && id !== lastSel){
        var currentGrid = $('table#sample');
        currentGrid.jqGrid('restoreRow', lastSel);
        currentGrid.jqGrid('editRow', id, { keys: true, focusField: 1, aftersavefunc: function(){
          alert('saved.');
        }});
        lastSel = id;
      }
    }
  });

  $('table#sample').jqGrid('setGroupHeaders', {
    useColSpanStyle: true,
    groupHeaders: [
      { startColumnName: 'surName', numberOfColumns: 2, titleText: 'Full Name' }
    ]
  });

  /*
  $('table#sample').jqGrid('saveRow', rowid, {
      aftersavefunc: function(response){
        alert('saved');
      }
  });
  */
});
