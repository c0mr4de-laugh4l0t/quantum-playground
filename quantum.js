// Complex number class
class Complex {
    constructor(real, imag = 0) {
        this.real = real;
        this.imag = imag;
    }

    add(c) {
        return new Complex(this.real + c.real, this.imag + c.imag);
    }

    multiply(c) {
        return new Complex(
            this.real * c.real - this.imag * c.imag,
            this.real * c.imag + this.imag * c.real
        );
    }

    magnitude() {
        return Math.sqrt(this.real * this.real + this.imag * this.imag);
    }

    toString() {
        const r = this.real.toFixed(3);
        const i = Math.abs(this.imag).toFixed(3);
        const sign = this.imag >= 0 ? '+' : '-';
        return `${r} ${sign} ${i}i`;
    }
}

// Quantum gates definitions
const gates = {
    H: [
        [new Complex(1/Math.sqrt(2)), new Complex(1/Math.sqrt(2))],
        [new Complex(1/Math.sqrt(2)), new Complex(-1/Math.sqrt(2))]
    ],
    X: [
        [new Complex(0), new Complex(1)],
        [new Complex(1), new Complex(0)]
    ],
    Y: [
        [new Complex(0), new Complex(0, -1)],
        [new Complex(0, 1), new Complex(0)]
    ],
    Z: [
        [new Complex(1), new Complex(0)],
        [new Complex(0), new Complex(-1)]
    ]
};