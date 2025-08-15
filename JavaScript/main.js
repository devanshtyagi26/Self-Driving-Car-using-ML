const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.93);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "MASTER");
const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "SLAVE", 2)];

const mainCar = drawSVGOnCanvas(mainCarSVG);
const trafficCar1 = drawSVGOnCanvas(traffic1SVG);

const carSVGs = [mainCar, trafficCar1];
car.draw(ctx);

animate();

function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  car.update(road.borders, traffic);
  canvas.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.75);

  road.draw(ctx);

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, carSVGs[1]);
  }

  car.draw(ctx, carSVGs[0]);
  ctx.restore();
  requestAnimationFrame(animate);
}
