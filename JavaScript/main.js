const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const carCtx = carCanvas.getContext("2d");

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 500;
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.93);

const N = 100;
const cars = generateCars(N);
let bestCar = cars[0];

if (localStorage.getItem("bestBrain")) {
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.3);
    }
  }
}

const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, "SLAVE", 2),
  new Car(road.getLaneCenter(2), -300, 30, 50, "SLAVE", 2),
  new Car(road.getLaneCenter(0), -300, 30, 50, "SLAVE", 2),
  new Car(road.getLaneCenter(2), -500, 30, 50, "SLAVE", 2),
  new Car(road.getLaneCenter(1), -500, 30, 50, "SLAVE", 2),
  new Car(road.getLaneCenter(0), -600, 30, 50, "SLAVE", 2),
  new Car(road.getLaneCenter(2), -700, 30, 50, "SLAVE", 2),
  new Car(road.getLaneCenter(1), -750, 30, 50, "SLAVE", 2),
  new Car(road.getLaneCenter(0), -850, 30, 50, "SLAVE", 2),
  new Car(road.getLaneCenter(2), -900, 30, 50, "SLAVE", 2),
  new Car(road.getLaneCenter(1), -1000, 30, 50, "SLAVE", 2),
];

const mainCar = drawSVGOnCanvas(mainCarSVG);
const trafficCar1 = drawSVGOnCanvas(traffic1SVG);

const carSVGs = [mainCar, trafficCar1];

animate();

function save() {
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
  localStorage.removeItem("bestBrain");
}
function generateCars(N) {
  const cars = [];

  for (let i = 0; i < N; i++) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
  }
  return cars;
}
function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }

  bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));

  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.75);

  road.draw(carCtx);

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, carSVGs[1]);
  }

  carCtx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx, carSVGs[0]);
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, carSVGs[0], true);

  carCtx.restore();
  requestAnimationFrame(animate);
}
