exports.dateToString = function (time) {
  var date = new Date(time).toString().split(' ');
  var month;
  switch (date[1]) {
    case 'Jan': month = 1; break;
    case 'Feb': month = 2; break;
    case 'Mar': month = 3; break;
    case 'Apr': month = 4; break;
    case 'May': month = 5; break;
    case 'Jun': month = 6; break;
    case 'Jul': month = 7; break;
    case 'Aug': month = 8; break;
    case 'Sep': month = 9; break;
    case 'Oct': month = 10; break;
    case 'Nov': month = 11; break;
    default: month = 12; break;
  }
  return date[3] + '. ' + month + '. ' + date[2] + '. ';
}