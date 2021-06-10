
			var visited_matrix = [] 
			for (let l = 0; l < adjmatrix.length; l ++)
			{
				visited_matrix.push(false);
			}
			

			function Queue() {
   				this.elements = [];
			}

			Queue.prototype.enqueue = function (e) 
			{
				this.elements.push(e);
			};

			Queue.prototype.dequeue = function () 
			{
				return this.elements.shift();
			};

			Queue.prototype.isEmpty = function () 
			{
    			return this.elements.length == 0;
			};

			Queue.prototype.peek = function () 
			{
				return !this.isEmpty() ? this.elements[0] : undefined;
			};
			

			let q = new Queue();
			function sleep(milliseconds) 
			{
				const date = Date.now();
				let currentDate = null;
				do {
					currentDate = Date.now();
				} while (currentDate - date < milliseconds);
			}

			q.enqueue(0);
			console.log(q);
			$(document).click(function(event) {

				bfs();
				

			function bfs()
			{
                    
					if ( (q.elements.length != 0))
					{
						var citem = q.dequeue();
						var objectx = list_objects[citem];
                        let chosen_colour = 0xffff00;
						objectx.material = objectx.material.clone();
						objectx.material.color.setHex(chosen_colour);

						visited_matrix[citem] = true;
						
						for (let n = 0; n < adjmatrix.length; n ++)
						{
							if (visited_matrix[n] == false && adjmatrix[citem][n] == 1)
							{
								chosen_colour = '#0000FF';
                                objectx = list_objects[n];                    
						        objectx.material = objectx.material.clone();
						        objectx.material.color.setHex(chosen_colour);
								q.enqueue(n);
							}
						}
						setTimeout(function()
						{
							bfs();
                            
						},1000);

			
        		
					}
			}
					
				
				
			});

			