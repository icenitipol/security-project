import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rsa',
  templateUrl: './rsa.component.html',
  styleUrls: ['./rsa.component.scss']
})
export class RsaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  input: string = "";
  output: string = "";
  p: number = 0;
  q: number = 0;
  n: number = 0;
  r: number = 0;
  candidate: any[] = [];
  k: number = 0;
  e: number = 0;
  d: number = 0;
  m: number = 0;
  c: number = 0;
  md: number = 0;

  mod(m: number, n: number) {
    return m - n * Math.floor(m / n)
  }

  Factorize(n: number) {
    let T = n
    let PRIME = 1

    let ttt: number[] = []

    let i = 1
    while ((T > 1) && (++i < Math.sqrt(n) + 1)) {
      while (this.mod(T, i) == 0) {
        T = T / i
        if (PRIME == 1) PRIME = 0
        ttt.push(i)
      }
    }

    if (PRIME == 1) return []
    if (T > 1) ttt.push(T)
    return ttt
  }

  GCD(m: number, n: number) {
    while (m != n) {
      if (m == 1 || n == 1)
        return 1
      else if (m < n)
        n = this.mod(n, m)
      else
        m = this.mod(m, n)
    }
    return m
  }

  Candidates(r: number, total: number) {
    let temp: number[] = []
    let n = (r + 1)

    for (let i = 0; i < total; i++) {
      temp.push(n)
      n = n + r
    }

    return temp
  }

  step1() {
    let p = this.p ?? 0
    let q = this.q ?? 0
    this.n = p * q
    this.r = (p - 1) * (q - 1)
    this.candidate = this.Candidates(this.r, 1000)
    this.candidate = this.candidate.map(e => {
      return [e, this.Factorize(e)]
    })
    console.log(this.candidate)
  }

  step2(num: number) {
    const factor = this.Factorize(num)
    if (factor.length != 2) return;
    this.k = num;
    this.e = factor[0];
    this.d = factor[1];

    this.CheckED(this.e, this.d, this.r, this.n)

    this.step3()
  }

  PowerMod(x: number, p: number, N: number)
  // Compute x^p mod N
  {
    var A = 1
    var m = p
    var t = x

    while (m > 0) {
      let k = Math.floor(m / 2)
      let r = m - 2 * k
      if (r == 1)
        A = (A * t) % N
      t = (t * t) % N
      m = k
    }
    return A
  }

  step3() {
    // const cipher = Math.pow(this.m, this.e) % this.n
    // const decipher = Math.pow(cipher, this.d) % this.n
    // const cipher = Math.pow(M, e) % N
    const cipher = this.PowerMod(this.m, this.e, this.n)
    // const decipher = Math.pow(cipher, d) % N
    const decipher = this.PowerMod(cipher, this.d, this.n)

    this.c = cipher;
    this.md = decipher
  }

  decryptOnly(){
    const decipher = this.PowerMod(this.c, this.d, this.n)
    this.md = decipher
  }

  CheckED(e: number, d: number, r: number, N: number) {
    let edmr = this.mod((e * d), r) == 1
    let eprime = this.GCD(e, r) == 1
    let dprime = this.GCD(d, r) == 1
    console.log(edmr, eprime, dprime)
  }

  CheckCode(e: number, d: number, N: number, M: number) {
    // const cipher = Math.pow(M, e) % N
    const cipher = this.PowerMod(M, e, N)
    // const decipher = Math.pow(cipher, d) % N
    const decipher = this.PowerMod(cipher, d, N)

    console.log({ cipher, decipher })
  }

}
