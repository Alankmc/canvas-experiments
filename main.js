const canvas = document.querySelector('canvas');
const xEdge = window.innerWidth - 50;
const yEdge = window.innerHeight - 50;
canvas.width = xEdge;
canvas.height = yEdge;

const myCircle = new Circle(200, 400, 20, 0.8);
const g = 0.9;
const k = 0.0005;
const COLORS = [
  '#B9121B',
  '#4C1B1B',
  '#F6E497',
  '#FCFAE1',
  '#BD8D46',
]
function Circle(x, y, r, bounce, color, dx = 0, dy = 0) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.ddx = 0;
  this.ddy = 0;
  this.r = r;
  this.bounce = bounce;
  this.color = color;

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
    c.fillStyle = this.color;
    c.fill();
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

const circles = [];
// for (var i = 0; i < 200; i++) {
//   circles.push(new Circle(
//     xEdge * Math.random() - 50,
//     yEdge * Math.random() - 50, 
//     Math.floor(50 - Math.random() * 30),
//     1 - 0.3 * Math.random(),
//     COLORS[Math.floor(COLORS.length * Math.random())]
//   ));
// }

function myClick(e) {
  const x = e.clientX;
  const y = e.clientY;
  const p = Math.random();
  const newR = 10 + p * 90;
  const dampen = 11 + 15 * p;
  circles.push(new Circle(
    newR,
    yEdge - newR,
    newR,
    1 - 0.6 * p,
    // COLORS[Math.floor(COLORS.length * Math.random())],
    `#${Math.floor(Math.random()*16777215).toString(16)}`,
    (x - newR) / dampen, 
    (y - (yEdge - newR)) / dampen
  ));
};
canvas.addEventListener('click', myClick);

const c = canvas.getContext('2d');

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, xEdge, yEdge);
  circles.forEach(el => el.update());
}


animate();
