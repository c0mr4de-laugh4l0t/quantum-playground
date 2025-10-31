// Quantum state
let state = [
    new Complex(1), new Complex(0),
    new Complex(0), new Complex(0)
];

// Circuit storage
let circuit = [[null, null, null, null, null], [null, null, null, null, null]];
let selectedGate = null;

function selectGate(gateName) {
    selectedGate = gateName;
    document.querySelectorAll('.gate-btn').forEach(btn => {
        btn.style.opacity = '0.6';
    });
    event.target.style.opacity = '1';
}

function placeGate(qubit, position) {
    if (!selectedGate) {
        alert('Please select a gate first!');
        return;
    }

    circuit[qubit][position] = selectedGate;
    
    const slot = document.querySelectorAll(`#qubit${qubit} .gate-slot`)[position];
    slot.textContent = selectedGate;
    slot.classList.add('filled');
}

function resetCircuit() {
    circuit = [[null, null, null, null, null], [null, null, null, null, null]];
    state = [new Complex(1), new Complex(0), new Complex(0), new Complex(0)];
    selectedGate = null;
    
    document.querySelectorAll('.gate-slot').forEach(slot => {
        slot.textContent = '';
        slot.classList.remove('filled');
    });
    
    document.querySelectorAll('.gate-btn').forEach(btn => {
        btn.style.opacity = '1';
    });
    
    updateDisplay();
}

function applyGate(gate, qubit) {
    const newState = [
        new Complex(0), new Complex(0),
        new Complex(0), new Complex(0)
    ];

    if (qubit === 0) {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                newState[i*2].real += gate[i][j].real * state[j*2].real - gate[i][j].imag * state[j*2].imag;
                newState[i*2].imag += gate[i][j].real * state[j*2].imag + gate[i][j].imag * state[j*2].real;
                newState[i*2+1].real += gate[i][j].real * state[j*2+1].real - gate[i][j].imag * state[j*2+1].imag;
                newState[i*2+1].imag += gate[i][j].real * state[j*2+1].imag + gate[i][j].imag * state[j*2+1].real;
            }
        }
    } else {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                newState[i].real += gate[i][j].real * state[j].real - gate[i][j].imag * state[j].imag;
                newState[i].imag += gate[i][j].real * state[j].imag + gate[i][j].imag * state[j].real;
                newState[i+2].real += gate[i][j].real * state[j+2].real - gate[i][j].imag * state[j+2].imag;
                newState[i+2].imag += gate[i][j].real * state[j+2].imag + gate[i][j].imag * state[j+2].real;
            }
        }
    }

    state = newState;
}

function applyCNOT() {
    const newState = [...state];
    [newState[2], newState[3]] = [state[3], state[2]];
    state = newState;
}

function runCircuit() {
    state = [new Complex(1), new Complex(0), new Complex(0), new Complex(0)];

    for (let col = 0; col < 5; col++) {
        if (circuit[0][col] === 'CNOT' || circuit[1][col] === 'CNOT') {
            applyCNOT();
        } else {
            if (circuit[0][col] && gates[circuit[0][col]]) {
                applyGate(gates[circuit[0][col]], 0);
            }
            if (circuit[1][col] && gates[circuit[1][col]]) {
                applyGate(gates[circuit[1][col]], 1);
            }
        }
    }

    updateDisplay();
}

function updateDisplay() {
    const stateLabels = ['|00⟩', '|01⟩', '|10⟩', '|11⟩'];
    
    let stateHTML = '';
    let probHTML = '';
    
    for (let i = 0; i < 4; i++) {
        const prob = state[i].magnitude() ** 2;
        
        stateHTML += `
            <div class="state-item">
                <span>${stateLabels[i]}</span>
                <span>${state[i].toString()}</span>
            </div>
        `;
        
        probHTML += `
            <div class="prob-item">
                <div class="prob-label">${stateLabels[i]}</div>
                <div class="prob-bar-container">
                    <div class="prob-bar" style="width: ${prob * 100}%">${(prob * 100).toFixed(1)}%</div>
                </div>
            </div>
        `;
    }
    
    document.getElementById('stateVector').innerHTML = stateHTML;
    document.getElementById('probabilities').innerHTML = probHTML;
}

function loadExample(type) {
    resetCircuit();
    
    if (type === 'bell') {
        circuit[0][0] = 'H';
        circuit[0][1] = 'CNOT';
    } else if (type === 'superposition') {
        circuit[0][0] = 'H';
        circuit[1][0] = 'H';
    } else if (type === 'entangle') {
        circuit[0][0] = 'H';
        circuit[1][1] = 'X';
        circuit[0][2] = 'CNOT';
    }
    
    document.querySelectorAll('.gate-slot').forEach((slot, idx) => {
        const qubit = idx < 5 ? 0 : 1;
        const pos = idx % 5;
        const gate = circuit[qubit][pos];
        
        if (gate) {
            slot.textContent = gate;
            slot.classList.add('filled');
        }
    });
    
    runCircuit();
}

// Initialize on page load
updateDisplay();