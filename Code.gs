/**
 * @OnlyCurrentDoc Limits the script to only accessing the current sheet.
 */

/**
 * A special function that runs when the spreadsheet is open, used to add a
 * custom menu to the spreadsheet.
 */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'COVID-19...', functionName: 'prepareSheet_'}
    
  ];
  spreadsheet.addMenu('FetchJSON', menuItems);
}


/**
 * A function that Json data to the spreadsheet.
 */
function prepareSheet_() { 
  
  // Creating a active spreed sheet 
  var spreedSheet = SpreadsheetApp.getActiveSheet().setName('Settings'); 
  
  // Creating the what node to be fetch from the json, where case_time_series will give data,infection,recovery and death of covid-19 data.
  var query="cases_time_series";
  
  // Featch the data from the json api
  var pullJsonFromAPI = fetchJsonAPIData();
  
  // Sending the fetch json data to process data
  var pullJsonData = processJsonData(pullJsonFromAPI,query);
  
  // Displaying the processed json data to the spreed sheet.
  var displayData = displayDataToSheet(pullJsonData,spreedSheet);
  
}

function fetchJsonAPIData(){
  var response = UrlFetchApp.fetch("https://api.covid19india.org/data.json");    
  var jsonData = JSON.parse(response.getContentText());  
  return jsonData;
}

// To process the fetch data from the json api for the json value
function processJsonData(dataAll,xpath){
  var pathArray=xpath.split("/");
  var resourceDataList = [];    
  for(var i=0; i< pathArray.length;i++){        
        dataAll = dataAll[pathArray[i]];   
    }
  var tempArray = [];
  
  for(var obj in dataAll) {
    tempArray.push([dataAll[obj]]);
  }
  return tempArray;
}

// To display the dataset in to the google sheet   
function displayDataToSheet(tempArray,sheet) {  
  // Total number of rows to print in the sheet  
  var numRows = tempArray.length
  
  // Total number of coloumn to print in the sheet
  var numColumns = tempArray[0].length
  
  var newLine = sheet.getLastRow() + 1;
  var newRange = sheet.getRange(newLine,1,numRows,numColumns);
  
  // To set the values.
  newRange.setValues(tempArray);     
  
  }
  

  
