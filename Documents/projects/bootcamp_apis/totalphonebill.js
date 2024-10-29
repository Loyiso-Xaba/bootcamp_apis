export function totalPhoneBill(data) {
    var call = 2.0;
    var sms = 0.5;
  
    var items = data.split(', ');
  
    for (var i = 0; i < items.length; i++) {
      if (items[i] === 'call') {
        call++;
      } else if (items[i] === 'sms') {
        sms++;
      }
    }
  
    var total = (call * 2.0) + (sms * 0.5);
    return 'R' + total.toFixed(2);
  };
  export function enoughAirtime(projectedUsage, availableAirtime) {
    var callCost = 2.0;
    var dataCost = 10.0;
    var smsCost = 0.5;
    var usageList = projectedUsage.split(',');
    var totalCost = 0;
  
    for (var i = 0; i < usageList.length; i++) {
      if (usageList[i] === 'call') {
        totalCost += callCost;
      } else if (usageList[i] === 'data') {
        totalCost += dataCost;
      } else if (usageList[i] === 'sms') {
        totalCost += smsCost;
      }
    }
  
    var airtimeLeft = availableAirtime - totalCost;
  
    if (airtimeLeft < 0) {
      airtimeLeft = 0;
    }
  
    return 'R' + airtimeLeft.toFixed(2);
  }
  
  //console.log(enoughAirtime('call,call,call,data,sms,sms,call,data', 50));
 // console.log(enoughAirtime('data,sms,data,sms', 20));