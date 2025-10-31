# ⚛️ Quantum Circuit Simulator

An interactive web-based quantum circuit simulator that demonstrates fundamental quantum computing principles through real-time visualization of quantum states and gate operations.

![Quantum Circuit Simulator](https://img.shields.io/badge/quantum-computing-blue) ![JavaScript](https://img.shields.io/badge/javascript-vanilla-yellow) ![License](https://img.shields.io/badge/license-MIT-green)

🔗 **[Live Demo](https://c0mr4de-laugh4l0t.github.io/quantum-playground/)**

## Features

- **Interactive Circuit Builder**: Drag-and-place quantum gates on a 2-qubit system
- **Quantum Gates**: Hadamard (H), Pauli-X, Pauli-Y, Pauli-Z, and CNOT
- **Real-Time Visualization**: 
  - Complex number state vector display
  - Measurement probability distributions
  - Animated probability bars
- **Example Circuits**: Pre-built demonstrations of Bell states, superposition, and entanglement
- **Pure JavaScript**: No frameworks or dependencies required

## Physics Behind It

This simulator implements quantum mechanics using:
- **Complex number arithmetic** for quantum state representation
- **Linear algebra** for gate operations on state vectors
- **Tensor product operations** for multi-qubit systems
- **Born rule** for measurement probability calculations

### Quantum Gates Implemented

| Gate | Matrix | Description |
|------|--------|-------------|
| **H** (Hadamard) | `1/√2 [[1,1],[1,-1]]` | Creates superposition |
| **X** (Pauli-X) | `[[0,1],[1,0]]` | Quantum NOT gate |
| **Y** (Pauli-Y) | `[[0,-i],[i,0]]` | Rotation around Y-axis |
| **Z** (Pauli-Z) | `[[1,0],[0,-1]]` | Phase flip |
| **CNOT** | `[[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]]` | Controlled-NOT (entanglement) |

## How to Use

1. **Select a Gate**: Click on any gate button (H, X, Y, Z, or CNOT)
2. **Place on Circuit**: Click an empty slot on either qubit line
3. **Run Simulation**: Click "▶️ Run Circuit" to execute
4. **View Results**: Observe state vector and measurement probabilities
5. **Reset**: Clear circuit and start over

### Example: Creating a Bell State

1. Place **H** gate on qubit 0, position 0
2. Place **CNOT** gate on qubit 0, position 1
3. Run circuit
4. Result: Equal superposition of |00⟩
