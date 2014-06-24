
	function obj_explosion(vloc)
	{
		num_particles = 15;
		particles = [];
		this.life = 0;
		this.vloc = new obj_vector(vloc.x,vloc.y);
		
		this.init = function ()
		{
			for (i=0; i<num_particles; i++)
			{
				particles[i] = new obj_particle(this.vloc);
				particles[i].init();
				//console.log("init " + i + " : " + particles[i].speed + " m1 " + particles[i].vmove.x + " m2 " + particles[i].vmove.y);
			}			
		}
		
		this.update = function ()
		{
			if (this.life++ < EXPLOSION_LIFE)
			{				
				for (i=0; i<particles.length; i++)
				{
					//console.log(i + " x:" + particles[i].vloc.x + " y:" + particles[i].vloc.y);
					particles[i].update();
				}
			}
			else
			{ return false;}
		}

		this.render = function ()
		{
			if (this.life < EXPLOSION_LIFE)
			{
				for (i=0; i<particles.length; i++)
				{
					p = particles[i];
					//console.log(i + " x:" + particles[i].vloc.x + " y:" + particles[i].vloc.y);
					particles[i].render();
				}
			}
			else
			{ return false;}
		}
	}

	function obj_particle(vloc)
	{
		this.vloc = new obj_vector(vloc.x,vloc.y);
		this.vmove = {};

		this.speed;
		this.life;

		this.init = function()
		{
			//location
			//this.vloc = new obj_vector(x,y);
			this.speed = Math.floor(Math.random()*4);

			var angleInRadians = (Math.random()*360) * Math.PI / 180;
			facingX = Math.cos(angleInRadians);
			facingY = Math.sin(angleInRadians);

			this.vmove = new obj_vector(this.speed*facingX, this.speed*facingY);
		};

		this.update = function()
		{			
			this.vloc.x += this.vmove.x;
			this.vloc.y += this.vmove.y;
		};
		
		this.render = function() {
		
			context.save(); //save current state in stack 
			context.setTransform(1,0,0,1,0,0); // reset to identity
		
			context.fillStyle = '#ffffff';
			context.translate(this.vloc.x,this.vloc.y);		
  			context.fillRect(0, 0, 2, 2);

			//restore context
			context.restore(); //pop old state on to screen
		};		
	}
