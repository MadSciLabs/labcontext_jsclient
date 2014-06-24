

	function obj_asteroid()
	{
		this.radius;
		this.vloc = {};
		this.vmove = {};
		this.speed = 0;
		this.size;
		this.rotation;

		this.init = function(size,cur_v)
		{
			this.rotation = (Math.floor(Math.random()*360)) * Math.PI / 180;
			this.speed = 1;
			this.size = size;
			this.radius = (size / 4) * ROID_FULL_SIZE;

			//location
			if (cur_v == null)
			{
				this.vloc = new obj_vector(Math.floor(Math.random()*FRAME_SIZE_W),Math.floor(Math.random()*FRAME_SIZE_H));
			}
			else
			{
				this.vloc = new obj_vector(cur_v.x,cur_v.y);
			}

			var angleInRadians = (Math.floor(Math.random()*360)) * Math.PI / 180;
			facingX = Math.cos(angleInRadians);
			facingY = Math.sin(angleInRadians);

			this.vmove = new obj_vector(this.speed*facingX, this.speed*facingY);
		};
		
		this.checkLaserCollisions = function()
		{
			for (var i=0; i<_lasers.length; i++)
			{
				if (this.collision(_lasers[i].vloc,0))
				{
					//console.log("LASER HIT");
					_lasers.splice(i,1);
					return true;
				}
			}
			return false;
		};

		this.checkShipCollision = function()
		{
			
			if (this.collision(_ship.vloc,_ship.radius))
			{
				console.log("HIT");
				
				_ship.explode();
				
				return true;
			}
			return false;
		};

		this.collision = function(l,tRadius)
		{
			dist = Math.sqrt(math_sqr(l.x - this.vloc.x) + math_sqr(l.y - this.vloc.y));
			if (dist < (this.radius + tRadius))
			{
				return true;
			}
			else
			{
				return false;
			}
		};

		this.update = function()
		{
			this.vloc.x += this.vmove.x;
			if (this.vloc.x > FRAME_SIZE_W+this.radius) {this.vloc.x = -this.radius;}
			else if (this.vloc.x < -this.radius) {this.vloc.x = FRAME_SIZE_W+this.radius;}
			
			this.vloc.y += this.vmove.y;
			if (this.vloc.y > FRAME_SIZE_H + this.radius) {this.vloc.y = -this.radius;}
			else if (this.vloc.y < -this.radius) {this.vloc.y = FRAME_SIZE_H + this.radius;}

		};
		
		this.render = function() {
		
			context.save(); //save current state in stack 
			context.setTransform(1,0,0,1,0,0); // reset to identity
			//context.rotate(this.rotation);
				
			//translate the canvas origin to the center of the player
			context.translate(this.vloc.x-this.radius,this.vloc.y-this.radius);		

			//context.scale(this.size/4,this.size/4);

			context.strokeStyle = '#ffffff';
			context.lineWidth = 2;

			context.beginPath();
			if (this.size == 1) {

			context.moveTo(7,6); 
			context.lineTo(8,2);
			context.lineTo(15,1);
			context.lineTo(17,6);
			context.lineTo(22,7);
			context.lineTo(24,13);
			context.lineTo(17,13);
			context.lineTo(19,20);
			context.lineTo(9,23);
			context.lineTo(5,15);
			context.lineTo(2,14);
			context.lineTo(0,9);
			context.lineTo(7,6);

			} else if (this.size == 2) {

			context.moveTo(15,2); 
			context.lineTo(25,1);
			context.lineTo(47,9);
			context.lineTo(31,17);
			context.lineTo(48,28);
			context.lineTo(37,47);
			context.lineTo(32,40);
			context.lineTo(8,48);
			context.lineTo(1,38);
			context.lineTo(1,11);
			context.lineTo(21,12);
			context.lineTo(15,2);

			} else {

			context.moveTo(4,37); 
			context.lineTo(29,47);
			context.lineTo(6,66);
			context.lineTo(35,90);
			context.lineTo(53,60);
			context.lineTo(57,94);
			context.lineTo(80,93);
			context.lineTo(96,72);
			context.lineTo(98,44);
			context.lineTo(81,8);
			context.lineTo(42,2);
			context.lineTo(15,18);
			context.lineTo(4,37);
			}

			context.stroke();
			context.closePath();

			//restore context
			context.restore(); //pop old state on to screen
		};		
	}
