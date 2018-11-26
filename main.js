const canvas = document.querySelector('canvas');
const xEdge = window.innerWidth - 50;
const yEdge = window.innerHeight - 50;
canvas.width = xEdge;
canvas.height = yEdge;

const myCircle = new Circle(200, 400, 20, 0.8);
const g = 0.9;
const k = 0.0005;

function Circle(x, y, r, bounce) {
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.ddx = 0;
  this.ddy = 0;
  this.r = r;
  this.bounce = bounce;

  this.getCoords = () => ({x: this.x, y: this.y});

  this.setVelocities = (dx, dy) => {
    this.dx = dx;
    this.dy = dy;
  }

  this.getResultant = () => {
    
    this.ddx = (this.dx < 0 ? 1 : -1) * k * this.dx * this.dx;
    this.ddy = (this.dy < 0 ? 1 : -1) * k * this.dy * this.dy + g; 
  }

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.r,  0, Math.PI * 2, false);
    c.strokeStyle = 'blue';
    c.stroke();
  }

  this.update = () => {
    this.getResultant();
    this.dx += this.ddx;
    this.dy += this.ddy;

    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.r > xEdge || this.x - this.r < 0 ) {
      if (this.x - this.r> 0) {
        this.x = xEdge - this.r;
      } else {
        this.x = this.r;
      }
      this.dx = this.dx * (-1) * (bounce);
    }
    
    if (this.y + this.r > yEdge || this.y - this.r < 0 ) {
      if (this.y - this.r > 0) {
        this.y = yEdge - this.r;
      } else {
        this.y = this.r;
      }
      this.dy = this.dy * (-1) * (bounce);
    }

    this.draw();
  }
}


function myClick(e) {
  const x = e.clientX;
  const y = e.clientY;
  const dampen = 10;
  const currPos = myCircle.getCoords();
  myCircle.setVelocities(
    (x - currPos.x) / dampen,
    (y - currPos.y) / dampen
  );
};
canvas.addEventListener('click', myClick);

const c = canvas.getContext('2d');


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, xEdge, yEdge);
  myCircle.update();
}


animate();