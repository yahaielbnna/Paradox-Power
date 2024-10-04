// Add random limits for components
const components = {
    battery: { volts: 12 },
    resistor: { ohms: Math.floor(Math.random() * 90) + 10 },  // Random resistor value
    lamp: { watts: Math.floor(Math.random() * 50) + 10 },     // Random lamp power
    switch: { state: 'off' }
};

let circuit = {
    totalResistance: 0,
    totalVoltage: 0,
    totalCurrent: 0,
    power: 0,
    connections: []  // Store connections between components
};

// Drag and drop functionality
const componentsDivs = document.querySelectorAll('.component');
const simulationArea = document.getElementById('simulationArea');

componentsDivs.forEach(component => {
    component.addEventListener('dragstart', dragStart);
});

simulationArea.addEventListener('dragover', dragOver);
simulationArea.addEventListener('drop', drop);

// Variables for wire drawing
let isDrawing = false;
let startX, startY, line, startComponent;

// Function to handle dragging
function dragStart(e) {
    e.dataTransfer.setData('component', e.target.getAttribute('data-type'));
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const type = e.dataTransfer.getData('component');
    const newComponent = document.createElement('div');
    newComponent.className = 'dropped-component';
    newComponent.style.position = 'absolute';
    newComponent.style.left = `${e.offsetX}px`;
    newComponent.style.top = `${e.offsetY}px`;

    // Create SVG representation based on the type
    switch (type) {
        case 'battery':
            newComponent.innerHTML = `
                <svg width="60" height="100">
                    <rect width="60" height="100" style="fill:brown;"></rect>
                    <text x="15" y="50" fill="white" font-size="20">12V</text>
                </svg>`;
            circuit.totalVoltage = components.battery.volts;
            break;
        case 'resistor':
            newComponent.innerHTML = `
                <svg width="60" height="20">
                    <rect width="60" height="20" style="fill:gray;"></rect>
                    <text x="15" y="15" fill="white" font-size="12">${components.resistor.ohms}Ω</text>
                </svg>`;
            circuit.totalResistance += components.resistor.ohms;
            break;
        case 'lamp':
            newComponent.innerHTML = `
                <svg width="60" height="60">
                    <circle cx="30" cy="30" r="20" style="fill:yellow;"></circle>
                    <text x="10" y="35" fill="black" font-size="12">Lamp</text>
                </svg>`;
            circuit.power = components.lamp.watts;
            break;
        case 'switch':
            newComponent.innerHTML = `
                <svg width="60" height="60">
                    <rect width="60" height="60" style="fill:blue;"></rect>
                    <text x="10" y="30" fill="white" font-size="12">Switch</text>
                </svg>`;
            break;
    }

    simulationArea.appendChild(newComponent);

    // Add drag functionality for dropped components
    newComponent.addEventListener('mousedown', mouseDown);
}

// Enable dragging of components
function mouseDown(e) {
    const component = e.target.closest('.dropped-component');
    const offset = {
        x: e.clientX - component.getBoundingClientRect().left,
        y: e.clientY - component.getBoundingClientRect().top,
    };

    function mouseMove(e) {
        component.style.left = `${e.clientX - offset.x}px`;
        component.style.top = `${e.clientY - offset.y}px`;

        // Update wires if they exist
        updateWires();
    }

    function mouseUp() {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    }

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}

// Create wire on mouse down
simulationArea.addEventListener('mousedown', (e) => {
    if (!isDrawing) {
        startComponent = getComponentAt(e.clientX, e.clientY);
        if (startComponent) {
            isDrawing = true;
            startX = e.clientX - simulationArea.getBoundingClientRect().left;
            startY = e.clientY - simulationArea.getBoundingClientRect().top;

            line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", startX);
            line.setAttribute("y1", startY);
            line.setAttribute("x2", startX);
            line.setAttribute("y2", startY);
            line.setAttribute("class", "wire");

            simulationArea.appendChild(line);
        }
    }
});

// Update wire position while drawing
simulationArea.addEventListener('mousemove', (e) => {
    if (isDrawing && line) {
        const endX = e.clientX - simulationArea.getBoundingClientRect().left;
        const endY = e.clientY - simulationArea.getBoundingClientRect().top;

        line.setAttribute("x2", endX);
        line.setAttribute("y2", endY);
    }
});

// Finalize wire on mouse up
simulationArea.addEventListener('mouseup', (e) => {
    if (isDrawing) {
        const endComponent = getComponentAt(e.clientX, e.clientY);
        if (endComponent) {
            circuit.connections.push({ start: startComponent, end: endComponent });
        }
        isDrawing = false;
        updateCircuitCalculations();
    }
});

// Helper function to check if the mouse is over a component
function getComponentAt(x, y) {
    const components = simulationArea.querySelectorAll('.dropped-component');
    for (const component of components) {
        const rect = component.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            return component;
        }
    }
    return null;
}

// Calculation checking logic
document.getElementById('checkCalculation').addEventListener('click', () => {
    const inputAmperes = parseFloat(document.getElementById('amperes').value);
    const inputVolts = parseFloat(document.getElementById('volts').value);
    const inputWatts = parseFloat(document.getElementById('watts').value);

    // Ohm's law: V = IR, P = IV
    const current = circuit.totalVoltage / circuit.totalResistance;
    const power = circuit.totalVoltage * current;

    if (inputAmperes === current && inputVolts === circuit.totalVoltage && inputWatts === power) {
        document.getElementById('calculationResult').textContent = "Correct!";
    } else {
        document.getElementById('calculationResult').textContent = "Incorrect, try again.";
    }
});

// Function to update wires position when components are moved
function updateWires() {
    const wires = simulationArea.querySelectorAll('.wire');
    wires.forEach(wire => {
        // Implement logic to update wire positions based on components
        // For simplicity, this can be omitted for now
    });
}

// Update the circuit calculations based on the connected components
function updateCircuitCalculations() {
    // Reset the calculations
    circuit.totalResistance = 0;
    circuit.power = 0;

    const resistors = [...simulationArea.querySelectorAll('.dropped-component')]
        .filter(component => component.innerHTML.includes('Ω'));
    resistors.forEach(resistor => {
        const ohms = parseInt(resistor.querySelector('text').textContent);
        circuit.totalResistance += ohms;
    });

    // Assume battery provides voltage
    const battery = [...simulationArea.querySelectorAll('.dropped-component')]
        .find(component => component.innerHTML.includes('12V'));
    if (battery) {
        circuit.totalVoltage = components.battery.volts;
    }

    // Calculate power from the total current
    if (circuit.totalResistance > 0) {
        circuit.totalCurrent = circuit.totalVoltage / circuit.totalResistance;
        circuit.power = circuit.totalVoltage * circuit.totalCurrent;
    }
}
