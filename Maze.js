class Maze {
    constructor(x, y, w, h, lv,title) {
      this.x = int(x);
      this.y = int(y);
      this.width = int(w);
      this.height = int(h);
      this.title = title;
      this.level = int(lv)
      console.log(this.level);
      this.init();
      this.px = int(0)
      this.py = int(0)
      // this.stop = 100;
      this.win = false
      this.endx = 0
      this.endy = 0
    }
  
    init() {
      this.margin = 10;
      this.top = 10;
      this.data = []; //mảng chính
      // this.columns = int(random(50) + 4);
      // this.columns = int(12)*this.level; // số cột.
      this.columns = this.level * 12;
      this.endx= this.columns
      console.log(this.columns);
      // console.log("level : "+level);
      this.maxRecursion = 2500;
      this.currentRecursion = 0;
  
      if (this.columns * 5 > this.width - this.margin * 2) this.columns = 5;
      this.cellSize = int((this.width - this.margin * 2) / this.columns);
      this.padding = this.cellSize * 0.12;
      this.margin = int((this.width - this.cellSize * this.columns) / 2);
      this.rows = int((this.height - this.top - this.margin) / this.cellSize);
      this.endy = this.rows;
      // this.top = int(this.height - this.cellSize * this.rows - this.margin);
      this.count = 1;
      this.totalCells = this.rows * this.columns;
      this.stack = [];
      for (let r = 0; r < this.rows; r++) {
        this.data[r] = []; //mảng con
        for (let c = 0; c < this.columns; c++) {
          this.data[r].push(new Cell(r, c, this.cellSize, this.cellSize, ''));
        }
      }
      // ô ngoài cùng được đặt làm border
      // 1st row
      for (let c = 0; c < this.columns; c++) {
        this.data[0][c].around[Direction.TOP] = BorderType.BORDER;
      }
      // last row
      for (let c = 0; c < this.columns; c++) {
        this.data[this.rows - 1][c].around[Direction.BOTTOM] = BorderType.BORDER;
      }
      // 1st column
      for (let r = 0; r < this.rows; r++) {
        this.data[r][0].around[Direction.LEFT] = BorderType.BORDER;
      }
      // last column
      for (let r = 0; r < this.rows; r++) {
        this.data[r][this.columns - 1].around[Direction.RIGHT] =
          BorderType.BORDER;
      }
      this.data[0][0].type = CellType.START;
      this.data[this.rows - 1][this.columns - 1].type = CellType.EXIT;
      this.player = this.data[0][0];
    }
    // khởi tạo 
    generate() {
      this.init();
      // đặt trạng thái ô về notvisited, border != BORDER -> border = wall
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns; c++) {
          this.data[r][c].visited = false;
          if (this.data[r][c].top !== BorderType.BORDER)
            this.data[r][c].top = BorderType.WALL;
          if (this.data[r][c].right !== BorderType.BORDER)
            this.data[r][c].right = BorderType.WALL;
          if (this.data[r][c].bottom !== BorderType.BORDER)
            this.data[r][c].bottom = BorderType.WALL;
          if (this.data[r][c].left !== BorderType.BORDER)
            this.data[r][c].left = BorderType.WALL;
        }
      }
      this.show();
    }
  // vẽ mê cung----------------------------------------------------
    gerenateMoves() {
      console.log('\ngerenateMoves - :: - ' + this.currentRecursion);
      // return true;
      this.currentRecursion++;
      const newPosition = this.doRandomMove(this.player);
      if (newPosition) {
        this.player.visited = true;
        newPosition.visited = true;
          // console.log('player', this.player);
        //   console.log('newPosition', newPosition);
        this.player.around[this.player.getDirection(newPosition)] =
          BorderType.NOWALL;
        newPosition.around[newPosition.getDirection(this.player)] =
          BorderType.NOWALL;
        this.player.type = CellType.PATH;
        this.drawPath(this.player, newPosition);
        this.stack.push(this.player);
        this.player = newPosition;
        console.log(this.count);
        this.count++;
        // return true;
        if (this.currentRecursion >= this.maxRecursion) {
          this.currentRecursion = 0;
          return true;
        } else {
          return this.gerenateMoves();
        }
      } else if (this.stack.length > 0) {
        // console.log('het duong');
        // pop stack
          // console.log('count', this.count, this.totalCells);
        if (this.count >= this.totalCells) {
          // const hint = 'Nhấp chuột để tìm lối ra';
          // fill('blue');
          // textSize(20);
          // text(hint, this.x + this.width / 2 - textWidth(hint) / 2, this.y + 75);
          // return false;
        }
        const oldPosition = this.player;
        this.player = this.stack.pop();
        this.drawPath(oldPosition, this.player);
        
        return this.gerenateMoves();
      }
      // const hint = 'Nhấp chuột để tìm lối ra';
      defaultCanvas0
      return false;
    }

    drawWin() {
      
        //  fill('red')
        console.log("this.cellSize : " + this.cellSize);
        noFill()
        image(bImg,
          (this.columns-1)*(this.cellSize)+ this.level*this.padding+ ((1+this.level)/2)*this.padding//+ this.level* this.level*0.7//+ (this.cellSize/10)*this.level
          ,(this.rows-1)*(this.cellSize)+ this.level*this.padding +this.padding//+ this.level* this.level*0.7//+ (this.cellSize/10)* this.level
          ,78/this.level
          ,78/this.level
          )
        console.log("--------------------------------------- drawWin(player) { ");
    }
    // -----------------------------------------------------------
    playerPath(vct){ // 0w 1d 2s 3a
      if(this.win== true){
        return false;
      }
      // console.log('player Path : '+vct)
      this.currentRecursion = 0;
      // console.log("this.drawPlayer");
      // this.drawPlayer(this.player, true);
      this.data[this.px][this.py].type = CellType.START; //start
      // this.data[this.rows - 1][this.columns - 1].type = CellType.EXIT; //end
      this.player = this.data[this.px][this.py]; // player = srart
      // this.player.direction = Direction.RIGHT; // bắt đầu từ hướng phải. 0 top 1 right 2 bottom 3 left 
      // this.player.direction = vct;
      this.player.type = CellType.SOLUTION;
      // this.drawPlayer(this.player, true);
      // console.log("this.drawPlayer(this.player, true);");
      if (this.player.type !== CellType.EXIT) {
        this.player.type = CellType.SOLUTION;

        if (this.player.around[vct] === BorderType.NOWALL) {

          // const newPosition = this.data
          //   [
          //     this.player.row +
          //       (this.player.direction == 2 //if
          //         ? 1
          //         : this.player.direction == 0 // else if
          //         ? -1
          //         : 0)  //else
          //   ]
          //   [
          //     this.player.column +
          //       (this.player.direction == 1
          //         ? 1
          //         : this.player.direction == 3 //= Direction.BOTTOM
          //         ? -1
          //         : 0)
          //   ];
          // //this.player.direction = (this.player.direction + 1) % 4;
          // newPosition.direction = vct;
          // console.log("drawSolutionPath - function");
          this.drawPlayer(this.player, true);
          this.drawSolutionPath(
            // "green"
            this.player, "green", vct
            // newPosition.type === CellType.SOLUTION ? 'SaddleBrown' : 'Green',
            // newPosition.type === CellType.SOLUTION ? -1 : this.player.direction
          );
          // this.player = newPosition;

          if(vct == 0&& this.px>0) //w
            this.px--
          else if(vct==2 && this.px<this.rows) //s
            this.px++
          
            if(vct == 3&& this.py>0) //a
            this.py--
          else if(vct==1 && this.py<this.columns) //d
            this.py++

          this.player = this.data[this.px][this.py]
          this.drawPlayer(this.player, false);
          this.winChecking()
          console.log(this.px +' , '+this.py);
          return true;
        } else {
          // // break.....................
          return false;
        }
      }
      // this.drawPlayer(this.player, false);
      console.log("   return false;");
      return false;
    }
    // -------
    winChecking(){
      console.log("win checking :" + this.endx +" - "+ this.endy +"||"+this.px +"-" +this.py);
      this.aaa= this.endx
      if(this.py == this.aaa-1 && this.px== this.endy-1){
        this.drawWin2()
      }
      if(this.py == this.aaa-1 && this.px== this.endy-1){
        console.log("win checking");
        this.win = true
        Swal.fire(
          'Good job!',
          'Đink dậy bà nội!',
          'success'
        )
      }
    }
    drawWin2() {
      
      //  fill('red')
      console.log("this.cellSize : " + this.cellSize);
      noFill()
      image(cImg,
        (this.columns-1)*(this.cellSize)+ this.level*this.padding+ ((1+this.level)/2)*this.padding//+ this.level* this.level*0.7//+ (this.cellSize/10)*this.level
        ,(this.rows-1)*(this.cellSize)+ this.level*this.padding +this.padding//+ this.level* this.level*0.7//+ (this.cellSize/10)* this.level
        ,78/this.level
        ,78/this.level
        )
      console.log("--------------------------------------- drawWin(player) { ");
  }
    // -----------------------------------------------------------
    startFindPath() {
      console.log("startFindPath() {");
      this.currentRecursion = 0;
      console.log("this.drawPlayer");
      this.drawPlayer(this.player, true);
      this.data[this.px][this.py].type = CellType.START; //start
      this.data[this.rows - 1][this.columns - 1].type = CellType.EXIT; //end
      this.player = this.data[this.px][this.py]; // player = srart
      this.player.direction = Direction.RIGHT; // bắt đầu từ hướng phải
      this.player.type = CellType.SOLUTION;
    }
  
    findPath() {
      console.log("findPath() {");
      
      console.log("this.drawPlayer(this.player, true);");
      if (this.player.type !== CellType.EXIT) {
        this.player.type = CellType.SOLUTION;
        if (
          this.player.around[(this.player.direction + 1) % 4] ===
          BorderType.NOWALL
        ) {
          const newPosition = this.data[
            this.player.row +
              (this.player.direction === Direction.RIGHT //if
                ? 1
                : this.player.direction === Direction.LEFT // else if
                ? -1
                : 0)  //else
          ][
            this.player.column +
              (this.player.direction === Direction.TOP
                ? 1
                : this.player.direction === Direction.BOTTOM
                ? -1
                : 0)
          ];
          this.player.direction = (this.player.direction + 1) % 4;
          newPosition.direction = this.player.direction;
          console.log("drawSolutionPath - function");
          this.drawSolutionPath(
            this.player,
            newPosition.type === CellType.SOLUTION ? 'Grey' : 'Green',
            newPosition.type === CellType.SOLUTION ? -1 : this.player.direction
          );
          this.player = newPosition;
          // this.drawPlayer(this.player, false);
          
          return true;
        } else {
          // // break.....................
          // return false
          // // ..........................
          this.player.direction = this.player.direction - 1;
          if (this.player.direction === -1) this.player.direction = 3;
          console.log("this.drawPlayer");
          // this.drawPlayer(this.player, false);
          console.log("return this.findPath();");
          return this.findPath();
        }
      }
      // this.drawPlayer(this.player, true);
      // this.drawPlayer(this.player, false);
      console.log("   return false;");
      return false;
    }
  // vẽ đường đi----------------------------------------------------
    drawPath(from, to) {
      let dem=0
      console.log("drawPath(from, to) {");
      //  console.log('drawPath', from, to);
      const direction = from.getDirection(to);
      let xOffset = 0;
      let yOffset = 0;
      let w = this.cellSize - this.padding * 2;
      let h = this.cellSize - this.padding * 2;
      if (direction === Direction.TOP) {
        yOffset = -this.padding * 2 - 1;
        h += this.padding * 2 + 1;
      } else if (direction === Direction.RIGHT) {
        w += this.padding * 2 + 1;
      } else if (direction === Direction.BOTTOM) {
        h += this.padding * 2 + 1;
      } else if (direction === Direction.LEFT) {
        xOffset = -this.padding * 2 - 1;
        w += this.padding * 2 + 1;
      }
      
      fill('grey');
      noStroke();
      // strokeWeight(2);
      rect(
        this.x +
          this.margin +
          this.padding +
          from.column * this.cellSize +
          xOffset,
        this.y + this.top + this.padding + from.row * this.cellSize + yOffset,
        w,
        h
      );
      rect(
        this.x + this.margin + this.padding + to.column * this.cellSize,
        this.y + this.top + this.padding + to.row * this.cellSize,
        this.cellSize - this.padding * 2,
        this.cellSize - this.padding * 2
      );
      console.log("this.drawPlayer(to, false);");
      // if(this)
      this.drawPlayer(to, false);
      fill('grey')
    }
  // tô màu - playing-----------------------------------------------
    drawPlayer(player, clean) {
      if (clean){
        fill('grey');
      }
      else {
        //  fill('red')
        noFill()
        image(aImg,
          this.x +14/this.level+ this.margin + player.column * this.cellSize + this.cellSize / 20,
          this.y -32/this.level+ this.top + player.row * this.cellSize + this.cellSize / 2
          ,70/this.level
          ,70/this.level
          )
        //   this.cellSize - this.padding * 5,
        // this.cellSize - this.padding * 5
      };
      // else fill(image(aImg, x, y, width, height));
      // strokeWeight(2);
      noStroke();
      // ellipseMode(CORNER);
      rect(
        this.x -35/this.level+ this.margin + player.column * this.cellSize + this.cellSize / 2,
        this.y -35/this.level+ this.top + player.row * this.cellSize + this.cellSize / 2,
        this.cellSize - this.padding * 2.5 + (clean ? 1 : 0),
        this.cellSize - this.padding * 2.5 + (clean ? 1 : 0)
      );
      // image(aImg,
      //     this.x + this.margin + player.column * this.cellSize + this.cellSize / 20,
      //     this.y + this.top + player.row * this.cellSize + this.cellSize / 2);
    }
    
    drawSolutionPath(player, color, direction) {
      // fill('pink')
      fill(color);
      noStroke();
      ellipse(
        this.x + this.margin + player.column * this.cellSize + this.cellSize / 2,
        this.y + this.top + player.row * this.cellSize + this.cellSize / 2,
        this.cellSize - this.padding * 5,
        this.cellSize - this.padding * 5
      );

      
      // if (direction > -1) {
        
      //   const dir =
      //     direction === Direction.TOP
      //       ? '↑'
      //       : direction === Direction.RIGHT
      //       ? '→'
      //       : direction === Direction.BOTTOM
      //       ? '↓'
      //       : direction === Direction.LEFT
      //       ? '←'
      //       : '';
      //   fill('white');
      //   textSize(this.cellSize / 2.2 - this.padding);
      //   text
      //   text(
      //     dir,
      //     this.x +
      //       this.margin +
      //       player.column * this.cellSize +
      //       this.cellSize / 2 -
      //       textWidth(dir) / 2,
      //     this.y +
      //       +this.top +
      //       player.row * this.cellSize +
      //       this.cellSize / 2 +
      //       this.cellSize / 4 -
      //       this.padding * 1.2
      //   );
      // }
      // console.log(aImg);
    }
  // random hướng đi ------------------------------------------------
    doRandomMove(player) {
      const moves = [];
      for (let i = 0; i < player.around.length; i++) {
        // console.log("doRandomMove");
        if (player.around[i] === BorderType.WALL) {
          if (i === Direction.TOP && player.row > 0) {
            if (!this.data[player.row - 1][player.column].visited) {
              moves.push(i);
            }
          } else if (i === Direction.RIGHT && player.column < this.columns - 1) {
            if (!this.data[player.row][player.column + 1].visited) {
              moves.push(i);
            }
          } else if (i === Direction.BOTTOM && player.row < this.rows - 1) {
            if (!this.data[player.row + 1][player.column].visited) {
              moves.push(i);
            }
          } else if (i === Direction.LEFT && player.column > 0) {
            if (!this.data[player.row][player.column - 1].visited) {
              moves.push(i);
            }
          }
        }
      }
      const r = int(random(moves.length));
      if (moves[r] === Direction.TOP) {
        return this.data[player.row - 1][player.column];
      } else if (moves[r] === Direction.RIGHT) {
        return this.data[player.row][player.column + 1];
      } else if (moves[r] === Direction.BOTTOM) {
        return this.data[player.row + 1][player.column];
      } else if (moves[r] === Direction.LEFT) {
        return this.data[player.row][player.column - 1];
      }
      return null;
    }
  
    show() {
      console.log('show');
      fill('WhiteSmoke');
      rect(this.x, this.y, this.width, this.height);
      fill('blue');
      textSize(38);
      text(
        this.title,
        // this.x + this.width / 2 - textWidth(this.title) / 2,
        this.y + 50
      );
  
      fill('black');
      rect(
        this.x + this.margin - 2,
        this.y + this.top - 2,
        this.columns * this.cellSize + 4,
        this.rows * this.cellSize + 4
      );
      // noStroke();
      // strokeWeight(1);
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns; c++) {
          // https://www.w3schools.com/colors/colors_names.asp
          fill('Lavender');
          rect(
            this.x + this.margin + c * this.cellSize,
            this.y + this.top + r * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }
}