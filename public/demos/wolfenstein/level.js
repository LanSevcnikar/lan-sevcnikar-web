class Level{
    

    constructor(s){
        initilized = true;

        s = s.split("\n");
        this.n = s[0].split(" ")[0];
        this.m = s[0].split(" ")[1];
        s.shift();

        this.player = new Player(1.5,2.5, 0);
        this.grid = [];
        this.constant = 80 * X;

        for (let j = 0; j < this.m; j++) {
            let row = s[j];
            let r  = [];
            for (let i = 0; i < this.n; i++) {
                const c = row[i];
                if(c == '.'){
                    r.push(0);
                }
                if(c == '#'){
                    r.push(1);
                }
                if(c == 'p'){
                    r.push(0);
                    this.player = new Player(i+0.5, j+0.5, 0);
                }
            }
            this.grid.push(r);
        }

        this.w = 70 * X;
        this.player.inicialize();
    }

    show(){
        stroke(224,224,224);
        fill(37,37,37);
        rect(0,0,screenWidth,screenHeight);
        this.show_top();
        this.player.update();
        fill(colour_background)
        stroke(224,224,224);
        rect(screenWidth/2,0,screenWidth/2,screenHeight);
        this.show_players_view();
    }

    show_top(){
        const sW = screenWidth/2;
        const w = this.w;
        translate(screenWidth/4,screenHeight/2);

        fill(colour_lines);
        stroke(colour_lines);
        for (let y = 0; y < this.grid.length; y++) {
            const row = this.grid[y];
            for (let x = 0; x < row.length; x++) {
                const c = row[x];
                if(c == 1){
                    fill(colour_lines);
                }else{
                    fill(colour_background);
                }
                
                rect((x-this.player.x)*w,(y-this.player.y)*w,w,w);
                
            }
        }
        this.player.show();
        
        translate(-screenWidth/4,-screenHeight/2);
    }

    show_players_view(){

        function limUpDown(maks,minn,value){
            if(value > maks) return maks;
            if(value < minn) return minn;
            return value;
        }

        translate(screenWidth/2,screenHeight/2);
        fill(colour_lines);
        rect(0,0,screenWidth/2,screenHeight/2);
        const delta = (screenWidth/2)/this.player.res;
        for (let i = 0; i < this.player.r.length; i++) {
            const ray = this.player.r[i];
            const dist = ray.simulate();
            const h = this.constant/dist;
            noStroke();
            var _rgbR = limUpDown(225,255,map(h,0,2000,225,255));
            var _rgbG = limUpDown(71,101,map(h,0,2000,71,101));
            var _rgbB = limUpDown(7,37,map(h,0,2000,7,37));
            fill(255,101,37);
            rect(i*delta,-h,delta+1,2*h);
        }
        translate(-screenWidth/2,-screenHeight/2);
    }
}