let RADIUS = 500;
let ROULETTE_INITIAL_X = 0;
let ROULETTE_INITIAL_Y = 0;
let angle = 0;
let eps = 1e-4;

function Roulette() {
    this.x = ROULETTE_INITIAL_X;
    this.y = ROULETTE_INITIAL_X;
    this.angular_speed = 0;
    this.angular_acceleration = 0;
    this.radius = RADIUS;
    this.arcs = [];
    this.angle = 0;

    this.initRoulette = function() {
        // TODO: encapsulate, allow editing and persist chores list
        this.chores = ['doar roupa', 'consertar guitarra', 'trocar lampada', 'make n roll', 'finalizar chuveiros', 'pintar os quartos'];
        num_chores = this.chores.length;
        for (let i = 0; i < num_chores; i++) {
            this.arcs.push(new RouletteArc(this.chores[i], num_chores, this.radius, i));
        }
    }

    this.initRoulette();

    this.buildTriangle = function() {
        fill('red');
        r = 250
        rotate(-this.angle);
        triangle(-20, -r - 20, 20, -r - 20, 0, -r + 20);
        rotate(this.angle);
    }

    this.display = function() {
        for (let i = 0; i < num_chores; i++) {
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
        // console.log(this.angular_speed);
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
        for (let i = 0; i < num_chores; i++) {
            if (this.arcs[i].contains(this.angle)) {
                return this.arcs[i].chore;
            }
        }
        console.log('winning chore not found')
    }
}