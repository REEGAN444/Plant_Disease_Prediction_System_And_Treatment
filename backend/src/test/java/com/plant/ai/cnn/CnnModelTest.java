package com.plant.ai.cnn;

import org.junit.jupiter.api.Test;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import javax.imageio.ImageIO;

import static org.junit.jupiter.api.Assertions.*;

public class CnnModelTest {

    @Test
    public void testCnnLayersAndInference() throws IOException {
        ImagePreprocessor preprocessor = new ImagePreprocessor();
        CnnModel model = new CnnModel();

        // Generate synthetic green leaf image
        BufferedImage leafImage = new BufferedImage(100, 100, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = leafImage.createGraphics();
        g.setColor(new Color(34, 139, 34)); // Forest green
        g.fillRect(0, 0, 100, 100);
        // Add some brown necrotic blight spots
        g.setColor(new Color(101, 67, 33)); // Dark brown
        g.fillOval(30, 30, 25, 25);
        g.fillOval(60, 50, 15, 15);
        g.dispose();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(leafImage, "png", baos);
        byte[] bytes = baos.toByteArray();

        ImagePreprocessor.PreprocessedData data = preprocessor.preprocess(bytes);
        assertNotNull(data.tensor);
        assertEquals(3, data.tensor.length);
        assertEquals(ImagePreprocessor.TARGET_HEIGHT, data.tensor[0].length);
        assertEquals(ImagePreprocessor.TARGET_WIDTH, data.tensor[0][0].length);
        assertTrue(data.isLeaf);

        DiseaseClassificationResult result = model.predict(data);
        assertNotNull(result);
        assertNotNull(result.getPlantName());
        assertNotNull(result.getDiseaseName());
        assertTrue(result.getConfidence() >= 50.0 && result.getConfidence() <= 100.0);
        assertNotNull(result.getClassProbabilities());
        assertEquals(CnnModel.CLASSES.size(), result.getClassProbabilities().size());

        System.out.println("Test CNN Prediction: " + result.getPlantName() + " - " + result.getDiseaseName() + " (" + result.getConfidence() + "%)");
    }
}
