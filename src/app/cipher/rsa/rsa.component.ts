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
    return ttt.join(' ')
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

  Candidates(r: number) {
    let temp: number[] = []
    let n = (r + 1)

    for (let i = 0; i < 30; i++) {
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
    this.candidate = this.Candidates(this.r)
    let candidatesfactor = this.candidate.map(e => {
      return [e, this.Factorize(e)]
    })
    console.log({ candidatesfactor })
  }

  CheckED(e: number, d: number, r: number, N: number) {
    var temp = ""

    temp += "      e   = " + e + "\n"
    temp += "      d   = " + d + "\n"
    temp += "      N   = " + N + "\n"
    temp += "      r   = " + r + "\n"
    temp += "      e*d = " + (e * d) + "\n"
    temp += "e*d mod r = " + this.mod((e * d), r) + "\n"

    if (this.GCD(e, r) == 1)
      temp += "e and r are relatively prime\n"
    else
      temp += "e and r are not relatively prime; gcd(e,r) = " + this.GCD(e, r) + "\n"

    if (this.GCD(d, r) == 1)
      temp += "d and r are relatively prime\n"
    else
      temp += "d and r are not relatively prime; gcd(d,r) = " + this.GCD(d, r) + "\n"

    console.log({ temp })
  }

  CheckCode(e: number, d: number, N: number, M: number) {
    const cipher = Math.pow(M, e) % N
    const decipher = Math.pow(cipher, d) % N

    console.log({ cipher, decipher })
  }

}
