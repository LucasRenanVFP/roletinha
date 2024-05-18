function RouletteArc(chore, num_chores, radius, index) {
    this.color_x = Math.floor(Math.random() * 255);
    this.color_y = Math.floor(Math.random() * 255);
    this.color_z = Math.floor(Math.random() * 255);
    this.chore = chore;
    this.index = index;
    this.radius = radius;
    this.chore_angle = 2.0 * PI / num_chores

    this.display = function() {
        strokeWeight(4);
        fill(this.color_x, this.color_y, this.color_z);
        arc(0, 0, this.radius, this.radius, this.chore_angle * this.index, this.chore_angle * (this.index + 1), PIE);
        fill(0);
        rotate(this.chore_angle * this.index + this.chore_angle / 2.0);
        textSize(15);
        fill(255);
        stroke(0);
        strokeWeight(4);
        textAlign(CENTER);
        text(this.chore, this.radius / 4.0, 0);
        rotate(-this.chore_angle * this.index + -this.chore_angle / 2.0);
    }

    this.contains = function(angle) {
        left_bound = this.chore_angle * this.index + angle
        right_bound = this.chore_angle * (this.index + 1) + angle
        if (left_bound > 2 * PI) {
            left_bound -= 2 * PI
        }
        if (right_bound > 2 * PI) {
            right_bound -= 2 * PI
        }
        target = PI + HALF_PI;
        if (right_bound > left_bound) return left_bound < target && target < right_bound;
        // only right bound crossed 0
        return target > left_bound;
    }

}