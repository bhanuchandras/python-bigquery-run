$(document).ready(function() { /* code here */ 

 var t_data = [
	  	{id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
	  	{id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
	  	{id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
	  	{id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
	  	{id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
	  ];


});

var myVar;
function myFunction() {
  myVar = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("data").style.display = "block";
}



function callApi()
{
    var table = new Tabulator("#tabledata", {
 	height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
 	layout:"fitColumns", //fit columns to width of table (optional)
 	columns:[ //Define Table Columns
	 	{title:"Name", field:"title", width:150},
	 	{title:"URL", field:"url", align:"left", formatter:"link"},
	 	{title:"Views", field:"view_count"},
 	],
	});

	$.getJSON('/top10/python',function(json){

		document.getElementById("loader").style.display = "none"
		document.getElementById("tabledata").style.display = "block"
		table.setData(json.results)
	});

};

