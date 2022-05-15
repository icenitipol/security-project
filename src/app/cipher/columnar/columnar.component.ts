import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-columnar',
  templateUrl: './columnar.component.html',
  styleUrls: ['./columnar.component.scss']
})
export class ColumnarComponent implements OnInit {

  constructor() { }

  input: string = "";

  columnData: string[][] = []
  columnData_before: string[][] = []
  output: string = "";
  key: string = ""

  ngOnInit(): void {
  }

  map(value: number, in_min: number, in_max: number, out_min: number, out_max: number) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  hslToRgb(h: number, s: number, l: number){
    var r: number, g: number, b: number;
    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p: number, q: number, t: number){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

  getCellStyle(value: number | string, heading = false) {
    value = parseInt(value + "") % this.key.length
    // console.log({value})
    const val1 = this.map(value, 0, 10, 0, 1)
    const val2 = this.map(value, 0, 10, 0.8, 0.9)
    const color = this.hslToRgb(val1, val2, 0.6)
    // console.log({color})
    return { backgroundColor: `rgba(${color[0]},${color[1]},${color[2]}, 0.4)` }
  }

  encrypt() {
    const errorHandler = (err: string) => {
      this.columnData = []
      this.output = ""
      console.log({err})
    }
    if (this.key.length == 0) {
      return errorHandler('err 1')
    };
    if (!this.key.match(/^[1-9]{2,9}$/)) {
      return errorHandler('err 2')
    };
    const keys = this.key.split('').map((e) => parseInt(e))
    if([...keys].sort()[keys.length-1] != keys.length) {
      return errorHandler('err 3')
    };

    this.columnData = []
    this.columnData_before = []
    this.output = ""

    const inputSplit = this.input.split('')
    const cols = this.key.length
    const rows = inputSplit.length / cols

    for (let i = 0; i < rows; i++) {
      let temp = []
      for (let j = 0; j < cols; j++) {
        const txt = inputSplit[(i * cols) + j]
        temp.push(txt)
      }
      this.columnData_before.push(temp)
    }

    for (let i = 0; i < rows; i++) {
      let temp = []
      for (let j = 0; j < cols; j++) {
        const txt = this.columnData_before[i][this.key.indexOf((j+1) + "")]
        temp.push(txt)
      }
      this.columnData.push(temp)
    }



    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        this.output += this.columnData[j][i] ?? " "
      }
    }

    console.log(this.columnData, this.columnData_before)
  }

  decrypt() {

  }
}
