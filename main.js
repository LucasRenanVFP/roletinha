var SPIN_STATE = 0; // 0 -> Hasn't started, 1 -> Spinning, 2 -> Stopped spinning

function startUp() {
    chore_selector = new ChoreSelector();
    roulette = new Roulette(chore_selector);
    spin_button = createButton("Roda");
    spin_button.position(100, 100);
    spin_button.mousePressed(startSpin);
}

function startSpin() {
    roulette.angle = 0;
    roulette.angular_speed = Math.random() * 5;
    SPIN_STATE = 1;
}

function setup() {  
    createCanvas(1200, 800);
    startUp();
}

function draw() {
    if (SPIN_STATE == 2) {
        textSize(32);
        fill(255);
        stroke(0);
        strokeWeight(4);
        textAlign(LEFT);
        text("Parabéns! Se fudeu! A tarefa é: " + roulette.getWinningChore(), 50, 50);
        return;
    }
    background(100);
    roulette.update();
    roulette.display();
    if (SPIN_STATE == 1 && roulette.hasStopped()) {
        console.log('stopped');
        SPIN_STATE = 2;
    }
}