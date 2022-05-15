import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monoalphabetic',
  templateUrl: './monoalphabetic.component.html',
  styleUrls: ['./monoalphabetic.component.scss']
})
export class MonoalphabeticComponent implements OnInit {

  alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  alphabets_shifted = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  key = 0;
  isDecode = false;

  input: string = "";
  output: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  getUnique(array: any[]) {
    return array.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }

  isAllUnique(array: any[]){
    return array.length == this.getUnique(array).length
  }

  isAlphabet(txt: string) {
    return /^[a-zA-Z]{1,1}$/.exec(txt)
  }

  isAllAlphabet(array: any[]){
    for(let i=0; i<array.length; i++){
      if(!this.isAlphabet(array[i])) return false;
    }
    return true;
  }

  isError() {
    const lenError = this.alphabets_shifted.length != 26
    const uniqueError = !this.isAllUnique(this.alphabets_shifted.split(''))
    const textError = !this.isAllAlphabet(this.alphabets_shifted.split(''))
    return lenError || uniqueError || textError
  }



  suffleArray(array: any[]){
    const randomArrayIndex = (array: any[]) => Math.floor(Math.random() * array.length)
    let temp = [...array];
    let result: any[] = [];
    for (let i = 0; i < array.length; i++) {
      result = [...result, ...temp.splice(randomArrayIndex(temp), 1)];
    }
    return result;
  }

  random() {
    this.alphabets_shifted = this.suffleArray(this.alphabets.split('')).join('')
    this.encode()
  }

  reset() {
    this.alphabets_shifted = this.alphabets
    this.encode()
  }

  map(value: number, in_min: number, in_max: number, out_min: number, out_max: number) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  getAlphabetIndex(txt: string) {
    return this.alphabets.indexOf(txt)
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

  getCellStyle(value: number) {
    value = value % 26
    // console.log({value})
    const val1 = this.map(value, 0, 25, 0, 1)
    const val2 = this.map(value, 0, 25, 0.8, 0.9)
    const color = this.hslToRgb(val1, val2, 0.5)
    // console.log({color})
    return { backgroundColor: `rgba(${color[0]},${color[1]},${color[2]}, 0.4)` }
  }

  encode(isDecode = false) {
    if(this.isError()) return;
    let inputText = isDecode ? this.output : this.input;

    let result = ""
    inputText.split('').forEach((e) => {
      let isUpperCase = e.charCodeAt(0) < 97
      if(/^[a-zA-Z]{1,1}$/.exec(e)) {
        // 1 2 3  2 3 1  1 -> 2
        let replaceX = isDecode ? this.alphabets_shifted : this.alphabets;
        let withX = isDecode ? this.alphabets : this.alphabets_shifted;

        const replaced = withX.split('')[replaceX.indexOf(e.toUpperCase())]

        result += isUpperCase ? replaced : replaced.toLowerCase()
      }
      else {
        result += e
      }
    })

    if (isDecode) this.input = result
    else this.output = result
  }

  allowDrop(e: DragEvent) {
    e.preventDefault()
  }

  elm_drag: HTMLElement | null = null;
  elm_drop: HTMLElement | null = null;

  dragged(e: DragEvent) {
    this.elm_drag = e.target as HTMLElement
  }

  dropped(e: DragEvent) {
    this.elm_drop = e.target as HTMLElement

    if (!this.elm_drag) return;

    const drag_txt = this.elm_drag?.innerText
    const drop_txt = this.elm_drop?.innerText

    const drag_index = this.alphabets_shifted.indexOf(drag_txt)
    const drop_index = this.alphabets_shifted.indexOf(drop_txt)

    const shiftedAlphabet = this.alphabets_shifted.split('')
    shiftedAlphabet.splice(drag_index, 1, drop_txt)
    shiftedAlphabet.splice(drop_index, 1, drag_txt)
    this.alphabets_shifted = shiftedAlphabet.join('')

    // console.log({ drag_txt, drop_txt })

    this.encode()
  }

}
