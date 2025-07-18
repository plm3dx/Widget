function executeWidgetCode() {	
	require(['DS/DataDragAndDrop/DataDragAndDrop'], function(DataDragAndDrop) {
		var myWidget = {
			dataFull: [],
			displayData: function(obj) {
				console.log("----------------displayData-----------");
				
				if(obj.data.items[0].objectType === null || obj.data.items[0].objectType !== "VPMReference"){
					var message ="<h4>Not a VPMReference Product </h4><h3>Please drop a VPMReference Product </h3>";
					widget.body.innerHTML = message;
				} else {
					var tableHTML = "<button id=\"callApiBtn\">Send To Vertex</button><br><div id=\"apiResult\"></div><br><br>";
					tableHTML += "<table><thead><tr><th>objectType</th><th>displayName</th><th>objectId</th></tr></thead><tbody>";
					tableHTML += "<tr><th>"+obj.data.items[0].objectType+"</th><th>"+obj.data.items[0].displayName+"</th><th>"+obj.data.items[0].objectId+"</th></tr>";
					tableHTML += "</tbody></table>";
					widget.body.innerHTML = tableHTML;
				}

				document.getElementById("callApiBtn").onclick = function () {
					var confirmed = confirm("Are you sure you want to send this to Vertex?");
					console.log("confirmed----------------->"+confirmed);
					console.log("objectId----------------->"+obj.data.items[0].objectId);
					
					if (confirmed) {
						var url = "https://www.plmtrainer.com:444/Vertex-0.0.1-SNAPSHOT/vertexvis/v1/exportdata?id=" + obj.data.items[0].objectId;
						console.log("url----------------->" + url);
						
						fetch(url, {
							method: "GET",
							headers: {
								"Content-Type": "application/json"
							}
						})
						.then(function(response) {
							if (!response.ok) throw new Error("Network response was not ok");
							return response.json();
						})
						.then(function(data) {
							document.getElementById("apiResult").innerHTML =
								"<p>Sent to Vertex. Response JSON:</p><pre>" + JSON.stringify(data, null, 2) + "</pre>";
						})
						.catch(function(error) {
							document.getElementById("apiResult").innerHTML = "<p> Failed to send to Vertex: " + error.message + "</p>";
						});
					}
				};
			},

			onLoad: function() {
				console.log("----------onLoad-------");
				if(widget.data.data !== undefined) {
					if(widget.data.data.items[0] !== undefined) {
						console.log("objectId:", widget.data.data.items[0].objectId);
						console.log("objectType:", widget.data.data.items[0].objectType);
						myWidget.displayData(widget.data);
					}
				}
				myWidget.dragZone();	
			},

			dragZone: function() {
				var dropElement = widget.body;
				DataDragAndDrop.droppable(dropElement, {
					drop: function(data){
						console.log("Dropped data:", data);
						var obj = JSON.parse(data);
						myWidget.displayData(obj);
						widget.body.style="border:5px hidden;";
					},
					enter: function(){
						widget.body.style="border:5px solid orange;";
					},
					leave: function(){
						widget.body.style="border:5px solid red;";
					},
					over: function(){
						widget.body.style="border:5px solid orange;";
					} 
				});	
			}
		}; 			
		widget.addEvent('onLoad',  myWidget.onLoad);
		widget.addEvent('onRefresh', myWidget.onLoad);
	});
}
