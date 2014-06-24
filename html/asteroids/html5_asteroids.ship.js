
	function obj_laser()
	{
		this.vloc = {};
		this.vmove = {};

		this.init = function()
		{
			//location
			this.vloc = new obj_vector(_ship.vloc.x,_ship.vloc.y);

			var angleInRadians = (_ship.rotation - 90) * Math.PI / 180;
			facingX = Math.cos(angleInRadians);
			facingY = Math.sin(angleInRadians);

			//console.log("laser: " + this.vloc.x + " " + this.vloc.y);
			this.vmove = new obj_vector(LASER_SPEED*facingX, LASER_SPEED*facingY);
		};

		this.update = function()
		{	
			this.vloc.x += this.vmove.x;
			this.vloc.y += this.vmove.y;
			
			if (
				this.vloc.x > FRAME_SIZE_W || 
				this.vloc.x < 0 || 
				this.vloc.y > FRAME_SIZE_H ||
				this.vloc.y < 0)
			{
				return false;
			}
			return true;
				
		};
		
		this.render = function() {

			context.save(); //save current state in stack 
			context.setTransform(1,0,0,1,0,0); // reset to identity
		
			context.fillStyle = '#ffffff';
			//translate the canvas origin to the center of the player
			context.translate(this.vloc.x,this.vloc.y);
  			context.fillRect(0, 0, 2, 2);

			//restore context
			context.restore(); //pop old state on to screen
		};		
	}


	function obj_ship(x,y)
	{
		voffset = new obj_vector(7,13);
		this.vloc = new obj_vector((x+voffset.x),(y+voffset.y));
		this.vmove = new obj_vector(0,0);

		this.rotation = 0;
		this.thrust = false;
		this.thrust_count = 0;
		this.thrust_acceleration = 0;
		this.shooting = false;
		this.radius = 10;
		
		this.explosion = {};

		this.rotate = function(val) {
		
			//add to rotation
			this.rotation += val;
		};

		this.explode = function()
		{
			this.explosion = new obj_explosion(this.vloc);
			this.explosion.init();
		};

		this.update = function()
		{

			if (current_state == STATE_DIE)
			{
				this.explosion.update();
			}
			else
			{
				this.vloc.x += this.vmove.x;
				if (this.vloc.x > FRAME_SIZE_W) {this.vloc.x -= FRAME_SIZE_W;}
				else if (this.vloc.x < 0) {this.vloc.x += FRAME_SIZE_W;}
				
				this.vloc.y += this.vmove.y;
				if (this.vloc.y > FRAME_SIZE_H) {this.vloc.y -= FRAME_SIZE_H;}
				else if (this.vloc.y < 0) {this.vloc.y += FRAME_SIZE_H;}
			}
		};
		
		this.render = function() 
		{
			if (current_state == STATE_DIE)
			{
				this.explosion.render();
			}
			else
			{
				//drawShip
				var angleInRadians = this.rotation * Math.PI / 180;
			
				context.save(); //save current state in stack 
				context.setTransform(1,0,0,1,0,0); // reset to identity
			
				//translate the canvas origin to the center of the player
				context.translate(this.vloc.x,this.vloc.y);
				context.rotate(angleInRadians);			
	
				context.translate(-voffset.x,-voffset.y);
	
				context.strokeStyle = '#ffffff';
				context.lineWidth = 2;

				context.beginPath();
				context.moveTo(7,0); 
				context.lineTo(0,22);
				context.lineTo(7,20);
				context.lineTo(14,22); 
				context.lineTo(7,0);
				context.stroke();
				context.closePath();
	
				if (this.thrust)
				{
					if (this.thrust_count % 2 == 0)
					{
						context.beginPath();
						context.moveTo(7,23); 
						context.lineTo(4,25);
						context.lineTo(7,34);
						context.lineTo(10,25); 
						context.lineTo(7,23);
						context.stroke();
						context.closePath();
					}
				}
				//restore context
				context.restore(); //pop old state on to screen
			}
		};

	}

