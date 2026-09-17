package com.plant.ai.cnn;

public class SoftmaxLayer {

    /**
     * Computes numerically stable softmax: P_i = exp(z_i - max(z)) / sum(exp(z_j - max(z)))
     * @param logits Input raw scores
     * @return Normalized probabilities that sum to 1.0
     */
    public static double[] forward(float[] logits) {
        if (logits == null || logits.length == 0) {
            return new double[0];
        }

        float maxLogit = -Float.MAX_VALUE;
        for (float val : logits) {
            if (val > maxLogit) {
                maxLogit = val;
            }
        }

        double sumExp = 0.0;
        double[] exps = new double[logits.length];
        for (int i = 0; i < logits.length; i++) {
            exps[i] = Math.exp(logits[i] - maxLogit);
            sumExp += exps[i];
        }

        double[] probs = new double[logits.length];
        for (int i = 0; i < logits.length; i++) {
            probs[i] = (sumExp > 0.0) ? (exps[i] / sumExp) : (1.0 / logits.length);
        }

        return probs;
    }
}
