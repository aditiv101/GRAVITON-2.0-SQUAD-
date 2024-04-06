from qiskit import QuantumCircuit, Aer, transpile, execute
from qiskit.algorithms import Grover
import numpy as np

distances = np.array([[0, 10, 20, 15],
                      [10, 0, 25, 20],
                      [20, 25, 0, 30],
                      [15, 20, 30, 0]])

def tsp_oracle(qc, cities, distances):
    total_distances = np.sum(distances, axis=1)
    min_index = np.argmin(total_distances)
    for i, distance in enumerate(distances[min_index]):
        if distance != 0:
            qc.z(i)

def prepare_initial_state(qc, num_cities):
    qc.h(range(num_cities))

def build_quantum_circuit(num_cities, distances):
    qc = QuantumCircuit(num_cities)
    prepare_initial_state(qc, num_cities)
    tsp_oracle(qc, num_cities, distances)
    return qc

def run_simulation(qc):
    simulator = Aer.get_backend('qasm_simulator')
    qc_transpiled = transpile(qc, simulator)
    job = execute(qc_transpiled, simulator)
    result = job.result()
    return result

def analyze_results(result):
    grover = Grover(oracle=None, state_preparation=None, grover_operator=None, num_iterations=3)
    solution = grover.solve(result)
    print("Optimized route:", solution)

def main():
    num_cities = len(distances)
    qc = build_quantum_circuit(num_cities, distances)
    result = run_simulation(qc)
    analyze_results(result)

if __name__ == "__main__":
    main()
