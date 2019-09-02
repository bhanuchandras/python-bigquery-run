$(document).ready(function() { /* code here */ 
$('.js-example-basic-single').select2();
callApi()
});

var myVar;
function myFunction() {
  myVar = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("data").style.display = "block";
}


function loaddropdown()
{
	url = '/tags/'
	console.log(url)
	$.getJSON(url,function(json){
		console.log("success")
		console.log(json.results)
		data=json.results
		for (var i = 0; i < data.length; i++) {
		   $("#input_v").append("<option value='" + data[i]["tag"] + "'>" + data[i]["tag"] + " (" + data[i]["count"] + ")"  + "</option>");
		    }
	});
}

function callApi()
{
        var table = new Tabulator("#tabledata", {
 	height:255, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
 	layout:"fitColumns", //fit columns to width of table (optional)
 	columns:[ //Define Table Columns
	 	{title:"Name", field:"title", width:450},
	 	{title:"URL", field:"url", align:"left", formatter:"link",width:350},
	 	{title:"Views", field:"view_count",width:70},
 	],
	});
	loaddropdown()
        var label = document.getElementById("input_v").value
	url = '/top10/' + label
	console.log(url)
	$.getJSON(url,function(json){

		document.getElementById("loader").style.display = "none"
		document.getElementById("tabledata").style.display = "block"
		table.setData(json.results)
	});

};
