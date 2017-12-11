//--INSTANTIATE THE HELPER
var usernameP = "admin";
var passwordP = "password";
var pentahoSrv = new PentahoRestApis("/pentaho",usernameP,passwordP);

//--INTEGRATE RESOURCES FROM PENTAHO SERVER
//----Dashboard
var dashboardUri = "/public/Steel Wheels/Sales Performance (dashboard).xdash";
pentahoSrv.loadResourceInDiv(dashboardUri,"view","div_dashboard_1");

//----Report
var reportUri = "/public/Steel Wheels/Top Customers (report).prpt";
pentahoSrv.loadResourceInDiv(reportUri,"view","div_report_1");

//----Analysis Report
var reportUri2 = "/public/Steel Wheels/Widget Library/Analysis Views/Geomap.xanalyzer";
pentahoSrv.loadResourceInDiv(reportUri2,"view","div_report_2");

//--CREATE LIST OF RESOURCES
var dashboardsPath = "/public/Steel Wheels";
pentahoSrv.loadFileList(dashboardsPath,"*.xdash","resourcesList");

//--EMBED THE SELF-SERVICE USER EXPERIENCE OF PENTAHO
//----Interactive Report Designer
pentahoSrv.loadResourceInDiv(".prpti","create","div_report_designer");

//----Handle  Save
function saveFile (divId,folderPath) {
    var filename = prompt("Enter file name");
    pentahoSrv.saveResource(divId+'_iframe',filename,folderPath);  
}
 
var folderPath = "/public/Steel Wheels/Widget Library";
 
$("#save_button_report").click(function() {
    saveFile("div_report_designer",folderPath);
     
});

//----Analyzer
pentahoSrv.loadResourceInDiv(".xanalyzer","create","div_analyzer");
 
$("#save_button_analyzer").click(function() {
    saveFile("div_analyzer",folderPath);
});

//----Dashboard Designer
var folderPathDash = "/public/Steel Wheels";
pentahoSrv.loadResourceInDiv(".xdash","create","div_dashboard_des");
  
function _fileListHandlerForDashboardRes(data, textStatus, jqXHR, containerDivId, rootPath) {
        
  var cList = $('<ul>').addClass('widgetSelectorWs').appendTo('#'+containerDivId);
  $(data).find('file').each (function() {
    var fileTitle = $(this).find('title').text();
    var filePath = $(this).find('path').text();
    var fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
    //var localizedFileName = ($(this).find('localePropertiesMapEntries')[0]).getElementsByTagName("properties")[0].getElementsByTagName("value")[0].innerHTML;
    localizedFileName = fileTitle;
    var solution="";
    if (filePath != rootPath) { // ignore the root.
        
      var li = $('<li/>')
        .addClass('widgetSelector-item')
        .text(fileTitle)
        .appendTo(cList);
              
        li.click(function(e) {
            pentahoSrv.addWidgetToDashboard("div_dashboard_des_iframe",solution, filePath, fileName, localizedFileName);
        });
    }
  });
    
}
  
$("#save_button_dashboard").click(function() {
    saveFile("div_dashboard_des",folderPathDash);
});
  
  
$("#resourceSelDashDiv").empty();
pentahoSrv.loadFileList(folderPath,"*.xanalyzer%7C*.prpti","resourceSelDashDiv",_fileListHandlerForDashboardRes);
            

