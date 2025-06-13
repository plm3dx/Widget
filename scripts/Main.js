function executeWidgetCode() {	
	require(['DS/DataDragAndDrop/DataDragAndDrop'], function(DataDragAndDrop) {
		var myWidget = {
			dataFull: [],
			displayData: function(obj) {
				console.log("inside displayData");
				console.log("data-------------", obj);
				console.log("data.data.items data: Object Type", obj.data.items[0]);
				console.log("data.data.items data:", obj.data.items[0].objectId);
				
				if(obj.data.items[0].objectType === null || obj.data.items[0].objectType !== "VPMReference"){
					var message ="<h4>Not an VPMReference Product </t4><h3>Please drop an VPMReference Product </h3>"
					
					myWidget.dragZone(widget.body);
					
					widget.body.innerHTML = message;
					
				} else {
				
					
					var tableHTML = "<button id=\"callApiBtn\">Send To Vertex</button><br><div id=\"apiResult\"></div><br><br>";
					
					tableHTML += "<table><thead><tr><th>objectType</th><th>displayName</th><th>objectId</th></tr></thead><tbody>";

					tableHTML =	tableHTML + "<tr><th>"+obj.data.items[0].objectType+"</th><th>"+obj.data.items[0].displayName+"</th><th>"+obj.data.items[0].objectId+"</th></tr>";

					tableHTML += "</tbody></table>";
					
					myWidget.dragZone(widget.body);
					
					widget.body.innerHTML = tableHTML;
				}
					document.getElementById("callApiBtn").onclick = function () {
					var confirmed = confirm("Are you sure you want to send this to Vertex?");
					console.log("confirmed----------------->"+confirmed)
					console.log("confirmed----------------->"+obj.data.items[0].objectId)
					if (confirmed) {
						var url = "https://localhost:8080/vertexvis/v1/senddata?id="+obj.data.items[0].objectId;
						console.log("url----------------->"+url)
						fetch(url, {
						method: "POST", // Change to POST, PUT, etc. as needed
						headers: {
						"Content-Type": "application/json"
						// Add auth headers here if needed
					}
					})
					.then(response => {
						if (!response.ok) throw new Error("Network response was not ok");
						return response.json();
					}) 
					.then(data => { document.getElementById("apiResult").innerHTML = `<p> Sent to Vertex. Response title: <strong>${data.title}</strong></p>`;
					})
					.catch(error => {
						document.getElementById("apiResult").innerHTML =`<p> Failed to send to Vertex: ${error.message}</p>`;
					});	
					}	
					};
					
					
			},

			onLoad: function() {			
				 var dropElement = widget.body;
				//code for drop functionality
				
				myWidget.displayData(data);
					
			},
			dragZone: function (dropElement) {
				DataDragAndDrop.droppable(dropElement, {
					drop: function(data){
						console.log("Dropped data:", data);
						var arrayData=[];
						//arrayData.push(data);
						//console.log("arrayData data:", arrayData);
						var obj = JSON.parse(data);
						
						myWidget.displayData(obj);
						widget.body.style="border:5px hidden;"
					},
					enter: function(){
						console.log("Enter");
						widget.body.style="border:5px solid orange;"
					},
					leave: function(){
						console.log("Leave");
						widget.body.style="border:5px solid red;"
						
					},
					over: function(){
						console.log("Over");
						widget.body.style="border:5px solid orange;"
					} 
					
				});
			}
		}; 			
		widget.addEvent('onLoad',  myWidget.onLoad);
	});
}