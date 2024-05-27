let ROULETTE_RADIUS = 500;
let ROULETTE_INITIAL_X = 0;
let ROULETTE_INITIAL_Y = 0;
let angle = 0;
let eps = 1e-4;

function Roulette(chore_selector) {
    this.x = ROULETTE_INITIAL_X;
    this.y = ROULETTE_INITIAL_X;
    this.angular_speed = 0;
    this.angular_acceleration = 0;
    this.radius = ROULETTE_RADIUS;
    this.arcs = [];
    this.angle = 0;
    this.chore_selector = chore_selector
    this.chores = []

    this.updateChores = function() {
        new_chores = this.chore_selector.getChores();
        // No need to update arcs if chores haven't changed
        if (this.chores.length != new_chores.length) {
            this.chores = new_chores.slice();
            this.arcs = [];
            for (let i = 0; i < this.chores.length; i++) {
                this.arcs.push(new RouletteArc(this.chores[i], this.chores.length, this.radius, i));
            }
        }
    }

    this.updateChores();

    this.buildTriangle = function() {
        fill('red');
        r = 250
        rotate(-this.angle);
        triangle(-20, -r - 20, 20, -r - 20, 0, -r + 20);
        rotate(this.angle);
    }

    this.display = function() {
        for (let i = 0; i < this.arcs.length; i++) {
            this.arcs[i].display();
        }
        this.buildTriangle();
    }

    this.updateSpeed = function() {
        this.angular_speed += this.angular_acceleration
        if (this.angular_speed < eps) {
            this.angular_speed = 0;
        }
    }

    this.updateAcceleration = function() {
        drag_k = -0.03;
        this.angular_acceleration = drag_k * this.angular_speed * this.angular_speed
        
        // low speed extra slow down
        if (this.angular_speed < 0.2) {
            this.angular_acceleration += drag_k * this.angular_speed
        }
    }

    this.update = function() {
        this.updateChores();
        this.angle += this.angular_speed;
        if (this.angle > 2 * PI) {
            this.angle -= 2 * PI;
        }
        this.updateSpeed();
        this.updateAcceleration();
        translate(width/2, height/2);
        rotate(this.angle);
    }

    this.hasStopped = function() {
        return this.angular_speed == 0;
    }

    this.getWinningChore = function() {
        if (this.chores.length == 1) return 0;
        for (let i = 0; i < this.chores.length; i++) {
            if (this.arcs[i].contains(this.angle)) {
                return this.arcs[i].chore;
            }
        }
        console.log('winning chore not found')
    }
}