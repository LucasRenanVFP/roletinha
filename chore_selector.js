function ChoreSelector() {
    this.chores_list = ['tarefa A', 'tarefa B', 'tarefa C', 'tarefa D', 'tarefa E', 'tarefa F'];
    this.buttons = [];
    this.chore_input;
    this.chore_input_button;

    this.addChore = function() {
        new_chore = this.chore_input.value();
        this.chores_list.push(new_chore);
        this.onListUpdate();
    }

    this.deleteChore = function(index) {
        this.chores_list.splice(index, 1);
        this.onListUpdate();
    }

    this.removeButtons = function() {
        for (let i = 0; i < this.buttons.length; ++i) {
            this.buttons[i].remove();
        }
        this.buttons = []
        if (this.chore_input != null) {
            this.chore_input.remove();
            this.chore_input_button.remove();
        }
    }

    this.onListUpdate = function() {
        this.removeButtons();
        for (let i = 0; i < this.chores_list.length; ++i) {
            chore_button = createButton(this.chores_list[i]);
            chore_button.id = this.chores_list[i];
            chore_button.position(100, 200 + 30 * i);
            chore_button.mousePressed(() => { 
                this.deleteChore(i);
            });
            this.buttons.push(chore_button);
        }
        this.chore_input = createInput("Nova tarefa");
        this.chore_input.position(100, 200 + 30 * this.buttons.length);
        this.chore_input_button = createButton("Adicionar");
        this.chore_input_button.position(this.chore_input.x + this.chore_input.width, 200 + 30 * this.buttons.length);
        this.chore_input_button.mousePressed(() => { 
            this.addChore();
        });
    }

    this.onListUpdate();

    this.getChores = function() {
        return this.chores_list;
    }
}