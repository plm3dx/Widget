function executeWidgetCode() {	
	require(['DS/DataDragAndDrop/DataDragAndDrop'], function(DataDragAndDrop) {
		var myWidget = {
			dataFull: [],
			displayData: function(obj) {
				console.log("data.data.items data:", obj.data.items[0]);
				console.log("data.data.items data:", obj.data.items[0].objectId);
					var tableHTML = "<table><thead><tr><th>objectType</th><th>displayName</th><th>objectId</th></tr></thead><tbody>";

					tableHTML =	tableHTML + "<tr><th>"+obj.data.items[0].objectType+"</th><th>"+obj.data.items[0].displayName+"</th><th>"+obj.data.items[0].objectId+"</th></tr>";

					tableHTML += "</tbody></table>";

					widget.body.innerHTML = tableHTML;
			},

			onLoad: function() {			
				 var dropElement = widget.body;
				//code for drop functionality
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