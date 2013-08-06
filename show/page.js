appendKeyValueToList = function(listId, key, value){
  $(listId).append('<li>{' + key + ': ' + value + '}</li>');
}
 addToContentList = function(value){
  if(typeof value == 'string'){
    $('#contentList').append('<li>' + value + '</li>');
  }else{
    $.each(value, function(key, value){
      appendKeyValueToList('#contentList', key, value);
    });
  }
}
 $('#saveStringForm').on('submit', function(){
  stringToSave = $('#stringInput').val();
  if(stringToSave == ""){
    $('#status').text('Please enter a string');
  }else{
    $('#status').text('Saving string...');
    BL.createContent(stringToSave, function(){
      $('#status').text('');
      addToContentList(stringToSave);
    });
  }
  return false;
});
 $('#saveObjectForm').on('submit', function(){
  key = $('#keyInput').val();
  val = $('#valueInput').val();
  if(key == "" || val == ""){
    $('#status').text('Please enter a key and a value');
  }else{
    objectToSave = {}
    objectToSave[key] = val
    $('#status').text('Saving object...');
    BL.createContent(objectToSave, function(){
      $('#status').text('');
      self.addToContentList(objectToSave);
    });
  }
  return false;
});
 //Display Settings
settings = BL.getSettings();
$.each(BL.getSettings(), function(identifier, settingArray){
  if(typeof settingArray  != 'undefined'){
    appendKeyValueToList('#settingsList', identifier, settingArray[0]);
  }
});
 //Load Content
$.each(BL.getContent(), function(index, value){
  addToContentList(value.data);
})
