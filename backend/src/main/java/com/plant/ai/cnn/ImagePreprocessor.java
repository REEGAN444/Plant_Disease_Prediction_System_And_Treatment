package com.plant.ai.cnn;

import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@Component
public class ImagePreprocessor {

    public static final int TARGET_WIDTH = 64;
    public static final int TARGET_HEIGHT = 64;

    public static class PreprocessedData {
        public float[][][] tensor; // [3][TARGET_HEIGHT][TARGET_WIDTH]
        public double greenRatio;
        public double chlorosisRatio;
        public double necrosisRatio;
        public double rustRatio;
        public double mildewRatio;
        public double edgeDensity;
        public boolean isLeaf;
        public int originalWidth;
        public int originalHeight;
    }

    public PreprocessedData preprocess(byte[] imageBytes) throws IOException {
        try (InputStream in = new ByteArrayInputStream(imageBytes)) {
            BufferedImage original = ImageIO.read(in);
            if (original == null) {
                throw new IllegalArgumentException("Unsupported or corrupted image file format.");
            }
            return processImage(original);
        }
    }

    public PreprocessedData preprocess(InputStream inputStream) throws IOException {
        BufferedImage original = ImageIO.read(inputStream);
        if (original == null) {
            throw new IllegalArgumentException("Unsupported or corrupted image file format.");
        }
        return processImage(original);
    }

    private PreprocessedData processImage(BufferedImage original) {
        PreprocessedData data = new PreprocessedData();
        data.originalWidth = original.getWidth();
        data.originalHeight = original.getHeight();

        // Resize image to fixed target dimensions for CNN
        BufferedImage resized = new BufferedImage(TARGET_WIDTH, TARGET_HEIGHT, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = resized.createGraphics();
        g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g2d.drawImage(original, 0, 0, TARGET_WIDTH, TARGET_HEIGHT, null);
        g2d.dispose();

        // Build 3D Tensor [Channels: 0=R, 1=G, 2=B][Y][X] in range [0.0, 1.0]
        float[][][] tensor = new float[3][TARGET_HEIGHT][TARGET_WIDTH];
        int totalPixels = TARGET_WIDTH * TARGET_HEIGHT;
        int greenCount = 0;
        int chlorosisCount = 0;
        int necrosisCount = 0;
        int rustCount = 0;
        int mildewCount = 0;

        for (int y = 0; y < TARGET_HEIGHT; y++) {
            for (int x = 0; x < TARGET_WIDTH; x++) {
                int rgb = resized.getRGB(x, y);
                int rInt = (rgb >> 16) & 0xFF;
                int gInt = (rgb >> 8) & 0xFF;
                int bInt = rgb & 0xFF;

                float r = rInt / 255.0f;
                float g = gInt / 255.0f;
                float b = bInt / 255.0f;

                tensor[0][y][x] = r;
                tensor[1][y][x] = g;
                tensor[2][y][x] = b;

                // Botanical color signatures
                // 1. Healthy green leaf: G is significantly higher than R and B
                if (g > 0.25f && g > r * 1.15f && g > b * 1.15f) {
                    greenCount++;
                }

                // 2. Chlorosis (yellowing): high R and G, lower B
                if (r > 0.45f && g > 0.45f && b < 0.35f && Math.abs(r - g) < 0.2f) {
                    chlorosisCount++;
                }

                // 3. Necrosis / Dark Blight: dark brown/black lesions
                if ((r > 0.15f && r < 0.55f && g > 0.12f && g < 0.45f && b < 0.3f && r > b * 1.2f) ||
                    (r < 0.25f && g < 0.25f && b < 0.25f && (r + g + b) > 0.15f)) {
                    necrosisCount++;
                }

                // 4. Rust pustules (golden-cinnamon/orange brown)
                if (r > 0.55f && g > 0.28f && g < 0.52f && b < 0.25f) {
                    rustCount++;
                }

                // 5. Powdery mildew (pale grayish-white flour-like coating over leaf)
                if (r > 0.70f && g > 0.70f && b > 0.70f && Math.abs(r - g) < 0.1f && Math.abs(g - b) < 0.1f) {
                    mildewCount++;
                }
            }
        }

        data.tensor = tensor;
        data.greenRatio = (double) greenCount / totalPixels;
        data.chlorosisRatio = (double) chlorosisCount / totalPixels;
        data.necrosisRatio = (double) necrosisCount / totalPixels;
        data.rustRatio = (double) rustCount / totalPixels;
        data.mildewRatio = (double) mildewCount / totalPixels;

        // Sobel edge gradient computation to detect spot boundaries
        double edgeSum = 0;
        for (int y = 1; y < TARGET_HEIGHT - 1; y++) {
            for (int x = 1; x < TARGET_WIDTH - 1; x++) {
                float gx = (-tensor[1][y-1][x-1] + tensor[1][y-1][x+1])
                         + (-2 * tensor[1][y][x-1] + 2 * tensor[1][y][x+1])
                         + (-tensor[1][y+1][x-1] + tensor[1][y+1][x+1]);
                float gy = (tensor[1][y-1][x-1] + 2 * tensor[1][y-1][x] + tensor[1][y-1][x+1])
                         - (tensor[1][y+1][x-1] + 2 * tensor[1][y+1][x] + tensor[1][y+1][x+1]);
                edgeSum += Math.sqrt(gx * gx + gy * gy);
            }
        }
        data.edgeDensity = edgeSum / totalPixels;

        // Check if image represents plant material (presence of vegetation pigments: green, chlorosis, or necrotic foliage)
        double totalPlantBiomass = data.greenRatio + data.chlorosisRatio + data.necrosisRatio + data.rustRatio;
        data.isLeaf = totalPlantBiomass > 0.08 || data.greenRatio > 0.05;

        return data;
    }
}
