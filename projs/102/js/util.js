function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  //The maximum is inclusive and the minimum is inclusive 
}

// Turn the object into a string readable by the DOM, refactored for leaderboards' modal
function printObject(obj) {
  let strObj = JSON.stringify(obj, null, '\t').replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;');
  strObj = strObj.replace(/{/g, '').replace(/}/g, '').replace(/"/g, '').replace(/:/g, ':&nbsp;').replace(/,/g, '');
  strObj = strObj.replace(/null/g, '');
  return strObj;
}