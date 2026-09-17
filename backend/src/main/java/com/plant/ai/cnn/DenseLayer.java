package com.plant.ai.cnn;

public class DenseLayer {

    private final int inFeatures;
    private final int outFeatures;
    private final float[][] weights; // [outFeatures][inFeatures]
    private final float[] bias;

    public DenseLayer(int inFeatures, int outFeatures, float[][] weights, float[] bias) {
        this.inFeatures = inFeatures;
        this.outFeatures = outFeatures;
        this.weights = weights;
        this.bias = bias;
    }

    /**
     * Computes linear transformation y = W * x + b.
     * @param input 1D feature array
     * @return Output logits [outFeatures]
     */
    public float[] forward(float[] input) {
        float[] output = new float[outFeatures];
        for (int i = 0; i < outFeatures; i++) {
            float sum = (bias != null && i < bias.length) ? bias[i] : 0.0f;
            for (int j = 0; j < inFeatures && j < input.length; j++) {
                sum += weights[i][j] * input[j];
            }
            output[i] = sum;
        }
        return output;
    }
}
