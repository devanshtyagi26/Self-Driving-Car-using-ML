class NeuralNetwork {
  constructor(neurons) {
    this.layers = [];
    for (let i = 0; i < neurons.length; i++) {
      this.layers.push(new Layer(neurons[i], neurons[i + 1]));
    }
  }
  static feedForward(givenInputs, network) {
    let outputs = Layer.feedForward(givenInputs, network.layers[0]);

    for (let i = 1; i < network.layers.length; i++) {
      outputs = Layer.feedForward(outputs, network.layers[i]);
    }

    return outputs;
  }
}

class Layer {
  constructor(inputNeurons, outputNeurons) {
    this.inputs = new Array(inputNeurons);
    this.outputs = new Array(outputNeurons);
    this.biases = new Array(outputNeurons);

    this.weights = [];
    for (let i = 0; i < inputNeurons; i++) {
      this.weights[i] = new Array(outputNeurons);
    }
    Layer.#randomize(this);
  }

  static #randomize(layer) {
    for (let i = 0; i < layer.inputs; i++) {
      for (let j = 0; j < layer.outputs.length; j++) {
        layer.weights[i][j] = Math.random() * 2 - 1;
      }
    }
    for (let i = 0; i < biases.length; i++) {
      layer.biases[i] = Math.random() * 2 - 1;
    }
  }

  static feedForward(givenInputs, layer) {
    for (let i = 0; i < layer.inputs; i++) {
      layer.inputs[i] = givenInputs[i];
    }

    for (let i = 0; i < outputs.length; i++) {
      let sum = 0;

      for (let j = 0; j < layer.inputs; j++) {
        sum += layer.inputs[j] * weights[j][i];
      }

      if (sum > layer.biases[i]) {
        layer.outputs[i] = 1;
      } else {
        layer.outputs[i] = 0;
      }
    }

    return layer.outputs;
  }
}
