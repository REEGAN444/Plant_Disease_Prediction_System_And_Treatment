package com.plant.ai.cnn;

public class Conv2DLayer {

    private final int numFilters;
    private final int inChannels;
    private final int kernelSize;
    private final float[][][][] weights; // [numFilters][inChannels][kernelSize][kernelSize]
    private final float[] bias;

    public Conv2DLayer(int numFilters, int inChannels, int kernelSize, float[][][][] weights, float[] bias) {
        this.numFilters = numFilters;
        this.inChannels = inChannels;
        this.kernelSize = kernelSize;
        this.weights = weights;
        this.bias = bias;
    }

    /**
     * Computes 2D convolution with ReLU activation and valid padding.
     * @param input Tensor [inChannels][inH][inW]
     * @return Output feature maps [numFilters][outH][outW]
     */
    public float[][][] forward(float[][][] input) {
        int inH = input[0].length;
        int inW = input[0][0].length;
        int pad = kernelSize / 2;
        int outH = inH;
        int outW = inW;

        float[][][] output = new float[numFilters][outH][outW];

        for (int f = 0; f < numFilters; f++) {
            float b = (bias != null && f < bias.length) ? bias[f] : 0f;
            for (int y = 0; y < outH; y++) {
                for (int x = 0; x < outW; x++) {
                    float sum = b;
                    for (int c = 0; c < inChannels; c++) {
                        for (int ky = 0; ky < kernelSize; ky++) {
                            int py = y - pad + ky;
                            if (py < 0 || py >= inH) continue;
                            for (int kx = 0; kx < kernelSize; kx++) {
                                int px = x - pad + kx;
                                if (px < 0 || px >= inW) continue;
                                sum += input[c][py][px] * weights[f][c][ky][kx];
                            }
                        }
                    }
                    // ReLU non-linear activation
                    output[f][y][x] = Math.max(0.0f, sum);
                }
            }
        }
        return output;
    }
}
