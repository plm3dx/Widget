<<<<<<< HEAD
function executeWidgetCode() {	
	require(['DS/DataDragAndDrop/DataDragAndDrop'], function(DataDragAndDrop) {
		var myWidget = {
			dataFull: [],
			displayData: function(arrData) {
					var tableHTML = "<table><thead><tr><th>objectType</th><th>displayName</th><th>objectId</th></tr></thead><tbody>";
=======
function executeWidgetCode() {
    require(['DS/DataDragAndDrop/DataDragAndDrop'], function (DataDragAndDrop) {
        var myWidget = {
            dataFull: [],
>>>>>>> 3f83745796ad152d5b12d4be201f2c9233cca2f1

            displayData: function (arrData) {
                var tableHTML = "<table border='1' style='border-collapse: collapse; width: 100%;'><thead><tr>" +
                    "<th>objectType</th><th>displayName</th><th>objectId</th>" +
                    "</tr></thead><tbody>";

                for (var i = 0; i < arrData.length; i++) {
                    var item = arrData[i];
                    tableHTML += "<tr>" +
                        "<td>" + item.objectType + "</td>" +
                        "<td>" + item.displayName + "</td>" +
                        "<td>" + item.objectId + "</td>" +
                        "</tr>";
                }

                tableHTML += "</tbody></table>";
                widget.body.innerHTML = tableHTML;
            },

<<<<<<< HEAD
			onLoad: function() {			
				 var dropElement = widget.body;
				//code for drop functionality
				DataDragAndDrop.droppable(dropElement, {
					drop: function(data){
						console.log("Dropped data:", data);
						var arrayData=[];
						arrayData.push(data);
						console.log("arrayData data:", arrayData);
						myWidget.displayData(arrayData);
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
=======
            onLoad: function () {
                var dropElement = widget.body;

                // Set up droppable area
                DataDragAndDrop.droppable(dropElement, {
                    drop: function (data) {
                        console.log("Dropped data:", data);

                        var items = [];
                        // Check if the dropped data structure is valid
                        if (data && data.data && Array.isArray(data.data.items)) {
                            items = data.data.items;
                        }

                        if (items.length > 0) {
                            myWidget.displayData(items);
                        } else {
                            widget.body.innerHTML = "<p>No valid data dropped.</p>";
                        }

                        widget.body.style = "border:5px hidden;";
                    },
                    enter: function () {
                        console.log("Enter");
                        widget.body.style = "border:5px solid orange;";
                    },
                    leave: function () {
                        console.log("Leave");
                        widget.body.style = "border:5px solid red;";
                    },
                    over: function () {
                        console.log("Over");
                        widget.body.style = "border:5px solid orange;";
                    }
                });

                // Optional: Set initial UI state
                widget.body.innerHTML = "<p>Drag and drop 3DX objects here.</p>";
                widget.body.style = "border: 2px dashed #aaa; padding: 10px; text-align: center;";
            }
        };

        widget.addEvent('onLoad', myWidget.onLoad);
    });
}
>>>>>>> 3f83745796ad152d5b12d4be201f2c9233cca2f1
