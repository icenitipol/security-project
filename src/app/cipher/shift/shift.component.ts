import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent implements OnInit {

  alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  alphabets_shifted3 = "DEFGHIJKLMNOPQRSTUVWXYZABC"
  alphabets_shifted = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  key = 0;
  isDecode = false;

  input: string = "";
  output: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  getCellStyle(value: number){
    value = value % 255
    return {backgroundColor: 'rgba(150,0,' + value * value + ', 0.4)'}
  }

  sliderShift() {
    let alparr = this.alphabets.split('')
    let alpspliced = alparr.splice(0, this.key)
    this.alphabets_shifted = [...alparr, ...alpspliced].join('')
    this.encode(this.isDecode)
  }

  textShift(char: string, isDecode = false) {
    if(![
      ...this.alphabets,
      ...this.alphabets.toLowerCase()
    ].includes(char)) return char;
    let key = isDecode? (26-this.key) % 26 : this.key;
    let lowerCaseOffset = 97
    let upperCaseOffset = 65
    const offset = this.alphabets.includes(char) ? upperCaseOffset : lowerCaseOffset
    return String.fromCharCode(((char.charCodeAt(0) - offset + key) % 26) + offset)
  }

  encode(isDecode = false) {
    let inputText = isDecode? this.output : this.input;

    if(isDecode) this.input = ""
    else this.output = ""

    for(let char of inputText.split('')) {
      const result = this.textShift(char, isDecode);

      if(isDecode) this.input += result;
      else this.output += result;
    }
  }

}
