/*
	Paint an Easter Egg - an assignment as part of the weekly coding class by CYM Crea Computer

	The students were asked to draw an egg with Javascript and color it in. Warido created an egg shape function
	and started experimenting with gradients and masks to color it in.

	The challenge for this fork is to give the egg bouncing dots, that bounce within the shape of the egg.

  Find out more about the coding classes at http://cym.crea.computer/
*/

jr = 70;		// begin color red for the dots
jg = 195;		// begin color green for the dots
eb = 176;		// begin color blue for the egg
colorCycleR = 5; // color increment for the dots for red
colorCycleG = 2; // color increment for the dots for green
colorCycleB = 2; // color increment for the egg for blue

var x, y; // coordinates for the shape of the egg

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	ellipseMode(CENTER);
	frameRate(30);
	var p = egg(width/2,height/2);
	
	bd_x = width/2;
	bd_y = height/2;
	bd_s = 24;
	x_speed = -3;
	y_speed = 4;
	
	opt = 2;
	ax = width/2;
	ay = height/2;
	s = 100;
}

function draw() {
	background(100);
	fill(96,0,eb);
	noStroke();
	egg(width/2,height/2);
	eb = eb + colorCycleB;
	if(eb>205 || eb<135) {
		colorCycleB = colorCycleB*-1;
	}	

	// bouncing dot
	bouncingDot(bd_x,bd_y,bd_s,jr,jg);
	bd_x = bd_x + x_speed;
	bd_y = bd_y + y_speed;

	jr = jr+colorCycleR;
	if(jr>205 || jr<50) {
		colorCycleR = colorCycleR*-1;
	}
	jg = jg+colorCycleG;
	if(jg>205 || jg<50) {
		colorCycleG = colorCycleG*-1;
	}
	
	for (let i = 0; i < 360; i+=1) {
    x = ax + cos(radians((i*1)+90)) * (s*map(abs((i*1)-180),0,180,1,1.5));
    y = ay + sin(radians((i*1)+90)) * s*1.5;
		if (dist( x,y, bd_x, bd_y) < 15) {
			y_speed = y_speed*-1;
			bd_y = bd_y + y_speed; // add an extra step when it bounces
		}
  }

	if (x_speed < 0) {
    for (let i = 0; i < 180/opt; i+=opt) {
  		x = ax + cos(radians((i*opt)+90)) * (s*map(abs((i*opt)-180),0,180,1,1.5));
      y = ay + sin(radians((i*opt)+90)) * s*1.5;
      if (dist( x,y, bd_x, bd_y) < 15) {
				x_speed = Math.floor(Math.random() *3) +3;
			}
    } 
	} else if (x_speed > 0) {
		for (let i = 90; i < 360/opt; i+=opt) {
      x = ax + cos(radians((i*opt)+90)) * (s*map(abs((i*opt)-180),0,180,1,1.5));
      y = ay + sin(radians((i*opt)+90)) * s*1.5;
			if (dist( x,y, bd_x, bd_y) < 15) {
				x_speed = Math.floor(Math.random() *-3) -3;
			}
		}
	}
} // end Draw

/*
	The egg shape code was provided by Warido
	https://www.openprocessing.org/sketch/871802/

    ax, ay	=     Position of the egg
		s				=     Size of the egg
    opt     =     Optimization scale, just leave it at 2
*/

function egg(ax, ay, s=100, opt=2) {
    //let points = [];
    beginShape();
    for (let i = 0; i < 360/opt; i+=opt) {
        var x = ax + cos(radians((i*opt)+90)) * (s*map(abs((i*opt)-180),0,180,1,1.5));
        var y = ay + sin(radians((i*opt)+90)) * s*1.5;
        vertex(x, y);
        //points.push(createVector(x,y));
    }
    endShape(CLOSE);
    //return points;
}

function bouncingDot(dx,dy,ds,dcr,dcg) {
		noStroke();
		fill(dcr,dcg,0);
		ellipse(dx,dy,ds,ds);
}
