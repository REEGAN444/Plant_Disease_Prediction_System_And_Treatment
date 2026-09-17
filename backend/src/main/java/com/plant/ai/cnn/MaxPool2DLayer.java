package com.plant.ai.cnn;

public class MaxPool2DLayer {

    private final int poolSize;

    public MaxPool2DLayer(int poolSize) {
        this.poolSize = poolSize;
    }

    /**
     * Downsamples feature maps by taking the maximum value in each window.
     * @param input Tensor [channels][inH][inW]
     * @return Output downsampled tensor [channels][outH][outW]
     */
    public float[][][] forward(float[][][] input) {
        int channels = input.length;
        int inH = input[0].length;
        int inW = input[0][0].length;
        int outH = inH / poolSize;
        int outW = inW / poolSize;

        float[][][] output = new float[channels][outH][outW];

        for (int c = 0; c < channels; c++) {
            for (int y = 0; y < outH; y++) {
                for (int x = 0; x < outW; x++) {
                    float maxVal = -Float.MAX_VALUE;
                    for (int py = 0; py < poolSize; py++) {
                        for (int px = 0; px < poolSize; px++) {
                            int iy = y * poolSize + py;
                            int ix = x * poolSize + px;
                            if (iy < inH && ix < inW) {
                                if (input[c][iy][ix] > maxVal) {
                                    maxVal = input[c][iy][ix];
                                }
                            }
                        }
                    }
                    output[c][y][x] = maxVal;
                }
            }
        }
        return output;
    }
}
