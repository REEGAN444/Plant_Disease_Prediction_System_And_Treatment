package com.plant.ai.config;

import com.plant.ai.entity.*;
import com.plant.ai.repository.*;
import com.plant.ai.service.AuthService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DiseaseRepository diseaseRepository;
    private final FertilizerRepository fertilizerRepository;
    private final MedicineRepository medicineRepository;
    private final ProductRepository productRepository;

    public DataInitializer(UserRepository userRepository,
                           DiseaseRepository diseaseRepository,
                           FertilizerRepository fertilizerRepository,
                           MedicineRepository medicineRepository,
                           ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.diseaseRepository = diseaseRepository;
        this.fertilizerRepository = fertilizerRepository;
        this.medicineRepository = medicineRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedDiseasesAndProducts();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            // Default Admin
            User admin = new User();
            admin.setName("System Admin");
            admin.setEmail("admin@plantai.com");
            admin.setPassword(AuthService.hashPassword("admin123"));
            admin.setRole("ADMIN");
            userRepository.save(admin);

            // Default Farmer User
            User farmer = new User();
            farmer.setName("Farmer Joe");
            farmer.setEmail("farmer@plantai.com");
            farmer.setPassword(AuthService.hashPassword("farmer123"));
            farmer.setRole("USER");
            userRepository.save(farmer);
        }
    }

    private void seedDiseasesAndProducts() {
        if (diseaseRepository.count() > 0) {
            return;
        }

        // 1. Tomato Early Blight
        Disease d1 = diseaseRepository.save(new Disease(null, "Tomato", "Tomato Early Blight",
                "Fungal infection caused by Alternaria solani. The fungus overwinters in crop debris, solanaceous weeds, and survives in seeds.",
                "Dark brown to black spots with characteristic concentric rings ('target board' appearance) on older leaves. Causes rapid yellowing, chlorosis, and premature defoliation.",
                "Rotate crops every 2-3 years, avoid overhead irrigation, prune lower leaves touching soil, apply mulch, and ensure adequate plant spacing for ventilation."));

        fertilizerRepository.save(new Fertilizer(null, "Organic Potash & Seaweed Extract",
                "Enhances leaf epidermal cell wall thickness and immunity against fungal penetration.",
                24.50, "Natural", "In Stock", d1.getId()));
        fertilizerRepository.save(new Fertilizer(null, "NPK 10-10-10 Balanced Booster",
                "High-grade balanced mineral fertilizer for stress recovery and robust foliage replenishment.",
                18.00, "Artificial", "In Stock", d1.getId()));

        medicineRepository.save(new Medicine(null, "Copper Fungicide Liquid Concentrate",
                "Organic-certified broad spectrum copper octanoate fungicide for early blight protection.",
                28.00, "Natural", "In Stock", d1.getId()));
        medicineRepository.save(new Medicine(null, "Mancozeb 75% WP (Dithane)",
                "Powerful protective contact fungicide that halts fungal spore germination on tomato leaves.",
                22.50, "Artificial", "In Stock", d1.getId()));

        productRepository.save(new Product(null, "Organic Potash & Seaweed Extract", "Fertilizer",
                "Liquid foliar potassium supplement with bioactive ascophyllum nodosum seaweed.",
                24.50, "Natural", "In Stock", "Tomato", d1.getId()));
        productRepository.save(new Product(null, "NPK 10-10-10 Balanced Booster", "Fertilizer",
                "Soluble synthetic NPK nutrient complex with essential micronutrients (Fe, Zn, Mn).",
                18.00, "Artificial", "In Stock", "Tomato", d1.getId()));
        productRepository.save(new Product(null, "Copper Fungicide Liquid Concentrate", "Medicine",
                "USDA Organic approved fixed copper fungicide suspension for foliar blight.",
                28.00, "Natural", "In Stock", "Tomato", d1.getId()));
        productRepository.save(new Product(null, "Mancozeb 75% WP (Dithane)", "Medicine",
                "Multi-site protective fungicide inhibiting lipid metabolism in fungal spore tubes.",
                22.50, "Artificial", "In Stock", "Tomato", d1.getId()));

        // 2. Tomato Late Blight
        Disease d2 = diseaseRepository.save(new Disease(null, "Tomato", "Tomato Late Blight",
                "Oomycete pathogen Phytophthora infestans. Favored by cool, wet, humid conditions.",
                "Large, irregular water-soaked lesions turning dark brown/purplish on foliage and stems. Under humid conditions, white cottony mold appears on leaf undersides.",
                "Plant certified resistant varieties, eliminate nearby cull piles, destroy volunteer tomato and potato plants, and ensure maximum sun exposure."));

        fertilizerRepository.save(new Fertilizer(null, "Calcium Nitrate Foliar Solution",
                "Calcium strengthens pectin middle lamella, preventing oomycete enzymes from dissolving tissue.",
                21.00, "Artificial", "In Stock", d2.getId()));
        fertilizerRepository.save(new Fertilizer(null, "Bio-Enriched Compost Tea",
                "Living beneficial microbes suppress spore germination on leaf surfaces.",
                16.50, "Natural", "In Stock", d2.getId()));

        medicineRepository.save(new Medicine(null, "Bacillus subtilis Bio-Fungicide",
                "Natural bacterial antagonist that outcompetes water mold pathogens.",
                29.00, "Natural", "In Stock", d2.getId()));
        medicineRepository.save(new Medicine(null, "Metalaxyl-M + Mancozeb (Ridomil Gold)",
                "Systemic and contact dual-action curative fungicide for acute late blight emergencies.",
                35.00, "Artificial", "In Stock", d2.getId()));

        productRepository.save(new Product(null, "Calcium Nitrate Foliar Solution", "Fertilizer",
                "Fast-acting soluble calcium and nitrate nitrogen to fortify cell integrity.",
                21.00, "Artificial", "In Stock", "Tomato", d2.getId()));
        productRepository.save(new Product(null, "Bio-Enriched Compost Tea", "Fertilizer",
                "Fermented aerobic microbe brew rich in humic acids and beneficial mycorrhizae.",
                16.50, "Natural", "In Stock", "Tomato", d2.getId()));
        productRepository.save(new Product(null, "Bacillus subtilis Bio-Fungicide", "Medicine",
                "Broad spectrum biological fungicide safe for organic fruit and vegetable production.",
                29.00, "Natural", "In Stock", "Tomato", d2.getId()));
        productRepository.save(new Product(null, "Metalaxyl-M + Mancozeb (Ridomil Gold)", "Medicine",
                "Systemic translocation protects new leaf growth from invasive Phytophthora.",
                35.00, "Artificial", "In Stock", "Tomato", d2.getId()));

        // 3. Tomato Healthy
        Disease d3 = diseaseRepository.save(new Disease(null, "Tomato", "Tomato Healthy",
                "None. Plant is in optimal physiological health with no pathogen infection detected.",
                "Vibrant chlorophyll pigmentation, sturdy petioles, clear leaf margins, healthy photosynthetic efficiency.",
                "Maintain regular soil moisture, provide adequate balanced nutrition, inspect plants weekly for early pest signs."));

        fertilizerRepository.save(new Fertilizer(null, "Premium Organic Vermicompost",
                "Nutrient-dense earthworm castings for microbial soil vitality and sustained growth.",
                15.00, "Natural", "In Stock", d3.getId()));
        fertilizerRepository.save(new Fertilizer(null, "Tomato Booster High-K Micronutrient",
                "Specialized fruit set booster enriched with chelated trace minerals.",
                19.00, "Artificial", "In Stock", d3.getId()));

        medicineRepository.save(new Medicine(null, "Cold-Pressed Pure Neem Oil 100%",
                "Organic preventative repellent and botanical deterrent against aphids and mildews.",
                18.50, "Natural", "In Stock", d3.getId()));

        productRepository.save(new Product(null, "Premium Organic Vermicompost", "Fertilizer",
                "Aged worm humus improving water retention and root zone microflora.",
                15.00, "Natural", "In Stock", "Tomato", d3.getId()));
        productRepository.save(new Product(null, "Cold-Pressed Pure Neem Oil 100%", "Medicine",
                "Cold-extracted azadirachtin oil for weekly preventive leaf hygiene.",
                18.50, "Natural", "In Stock", "Tomato", d3.getId()));

        // 4. Potato Early Blight
        Disease d4 = diseaseRepository.save(new Disease(null, "Potato", "Potato Early Blight",
                "Alternaria solani attacking potato foliage during warm, alternating wet and dry weather.",
                "Concentric dark brown circular spots appearing on lower leaves first, premature foliage senescence reducing tuber size.",
                "Use certified disease-free seed tubers, avoid sprinkler irrigation late in the evening, apply mulch to prevent soil splashing."));

        fertilizerRepository.save(new Fertilizer(null, "Sulfate of Potash (SOP 0-0-50)",
                "Low chloride potassium fertilizer essential for potato tuber starch accumulation and disease tolerance.",
                26.00, "Artificial", "In Stock", d4.getId()));
        medicineRepository.save(new Medicine(null, "Trichoderma viride Bio-Shield",
                "Beneficial fungal bio-control agent that parasitizes pathogenic Alternaria mycelia.",
                23.00, "Natural", "In Stock", d4.getId()));
        productRepository.save(new Product(null, "Sulfate of Potash (SOP 0-0-50)", "Fertilizer",
                "Soluble sulfate of potash granules for potato crop resilience.",
                26.00, "Artificial", "In Stock", "Potato", d4.getId()));
        productRepository.save(new Product(null, "Trichoderma viride Bio-Shield", "Medicine",
                "Certified microbial bio-fungicide protecting potato root and leaf tissues.",
                23.00, "Natural", "In Stock", "Potato", d4.getId()));

        // 5. Potato Late Blight
        Disease d5 = diseaseRepository.save(new Disease(null, "Potato", "Potato Late Blight",
                "Phytophthora infestans spores transported by wind currents and moisture.",
                "Brown-black damp necrotic areas rapidly consuming whole leaves, rotting stems, secondary bacterial soft rot.",
                "Plant resistant varieties, destroy infected tubers prior to storage, apply preventative protective fungicide before row closure."));

        fertilizerRepository.save(new Fertilizer(null, "Foliar Potassium Phosphite Defense",
                "Systemic phosphite stimulates natural phytoalexin defense response in potato plants.",
                32.00, "Artificial", "In Stock", d5.getId()));
        medicineRepository.save(new Medicine(null, "Cymoxanil + Mancozeb (Curzate)",
                "Penetrant and contact fungicide combination with post-infection curative kick-back.",
                34.00, "Artificial", "In Stock", d5.getId()));
        medicineRepository.save(new Medicine(null, "Bordeaux Mixture Powder (Copper + Lime)",
                "Traditional OMRI-listed preventative barrier spray against fungal spores.",
                19.50, "Natural", "In Stock", d5.getId()));

        productRepository.save(new Product(null, "Foliar Potassium Phosphite Defense", "Fertilizer",
                "Bio-stimulating potassium phosphite activating systemic acquired resistance (SAR).",
                32.00, "Artificial", "In Stock", "Potato", d5.getId()));
        productRepository.save(new Product(null, "Cymoxanil + Mancozeb (Curzate)", "Medicine",
                "Kickback action cures unseen early infections within 48 hours of spore ingress.",
                34.00, "Artificial", "In Stock", "Potato", d5.getId()));
        productRepository.save(new Product(null, "Bordeaux Mixture Powder", "Medicine",
                "Micro-fine copper sulfate and hydrated lime for organic potato blights.",
                19.50, "Natural", "In Stock", "Potato", d5.getId()));

        // 6. Potato Healthy
        Disease d6 = diseaseRepository.save(new Disease(null, "Potato", "Potato Healthy",
                "None. Plant is healthy with vigorous stolon and tuber development.",
                "Crisp emerald foliage, upright stems, absence of lesions or leaf edge curling.",
                "Maintain uniform irrigation, hill up soil around plant bases, monitor for Colorado potato beetles."));

        fertilizerRepository.save(new Fertilizer(null, "Bio-NPK Soil Probiotic Granules",
                "Enriched consortium of Azotobacter, Phosphobacteria, and Potash mobilizing bacteria.",
                22.00, "Natural", "In Stock", d6.getId()));
        productRepository.save(new Product(null, "Bio-NPK Soil Probiotic Granules", "Fertilizer",
                "Biological fertilizer granules replacing up to 25% of synthetic inputs.",
                22.00, "Natural", "In Stock", "Potato", d6.getId()));

        // 7. Apple Scab
        Disease d7 = diseaseRepository.save(new Disease(null, "Apple", "Apple Scab",
                "Ascomycete fungus Venturia inaequalis. Ascospores release from overwintered leaves during spring rains.",
                "Dull olive-green velvety spots developing on leaves and developing fruit, turning dark olive-brown and corky.",
                "Prune orchard canopies to encourage rapid drying, rake and shred or compost fallen autumn leaves."));

        fertilizerRepository.save(new Fertilizer(null, "Boron & Calcium Orchard Spray",
                "Enhances fruit skin firmness and resistance to scab fungal hyphae.",
                25.00, "Artificial", "In Stock", d7.getId()));
        medicineRepository.save(new Medicine(null, "Micronized Wettable Sulfur 80%",
                "Multi-site organic protectant preventing scab spore germination.",
                17.50, "Natural", "In Stock", d7.getId()));
        medicineRepository.save(new Medicine(null, "Myclobutanil (Rally 40WSP)",
                "Sterol inhibitor systemic fungicide providing curative scab therapy.",
                38.00, "Artificial", "In Stock", d7.getId()));

        productRepository.save(new Product(null, "Boron & Calcium Orchard Spray", "Fertilizer",
                "Chelated calcium-boron liquid for fruit tree foliage resilience.",
                25.00, "Artificial", "In Stock", "Apple", d7.getId()));
        productRepository.save(new Product(null, "Micronized Wettable Sulfur 80%", "Medicine",
                "Finely milled elemental sulfur for powdery mildew and apple scab prevention.",
                17.50, "Natural", "In Stock", "Apple", d7.getId()));
        productRepository.save(new Product(null, "Myclobutanil (Rally 40WSP)", "Medicine",
                "High-performance curative fungicide with translaminar movement.",
                38.00, "Artificial", "In Stock", "Apple", d7.getId()));

        // 8. Apple Cedar Rust
        Disease d8 = diseaseRepository.save(new Disease(null, "Apple", "Apple Cedar Rust",
                "Gymnosporangium juniperi-virginianae. Requires both apple and eastern red cedar/juniper hosts to complete lifecycle.",
                "Vivid yellow-orange circular lesions on leaf surfaces with tiny dark speckles, developing fringed tubes on leaf undersides.",
                "Remove red cedars within 1-2 miles of commercial orchards if feasible; choose rust-immune apple cultivars (e.g. Liberty, Enterprise)."));

        fertilizerRepository.save(new Fertilizer(null, "Magnesium Sulfate (Epsom Salt) Foliar",
                "Restores chlorophyll synthesis in leaves stressed by rust lesions.",
                14.00, "Natural", "In Stock", d8.getId()));
        medicineRepository.save(new Medicine(null, "Immunox Multi-Purpose Fungicide",
                "Systemic treatment for cedar-apple rust and powdery mildews.",
                27.50, "Artificial", "In Stock", d8.getId()));
        productRepository.save(new Product(null, "Magnesium Sulfate Foliar", "Fertilizer",
                "100% water soluble magnesium and sulfur nutrient for photosynthetic repair.",
                14.00, "Natural", "In Stock", "Apple", d8.getId()));
        productRepository.save(new Product(null, "Immunox Multi-Purpose Fungicide", "Medicine",
                "Rain-proof protection against rust, scab, and black rot.",
                27.50, "Artificial", "In Stock", "Apple", d8.getId()));

        // 9. Corn Common Rust
        Disease d9 = diseaseRepository.save(new Disease(null, "Corn", "Corn Common Rust",
                "Puccinia sorghi. Rust spores carried northward by storm winds and deposited in moisture droplets.",
                "Golden brown to dark cinnamon pustules scattered on upper and lower leaf surfaces, causing leaf tissue tears.",
                "Plant rust-resistant corn hybrids (Rp-resistant gene varieties) and practice early planting."));

        fertilizerRepository.save(new Fertilizer(null, "Zinc-Enriched Urea 46-0-0",
                "Nitrogen-zinc combination boosts corn stalk strength and canopy leaf area index.",
                28.00, "Artificial", "In Stock", d9.getId()));
        medicineRepository.save(new Medicine(null, "Azoxystrobin + Difenoconazole (Quadris Top)",
                "Broad-spectrum dual action strobilurin and triazole fungicide.",
                42.00, "Artificial", "In Stock", d9.getId()));
        productRepository.save(new Product(null, "Zinc-Enriched Urea 46-0-0", "Fertilizer",
                "High-potency nitrogen blend with micronutrient zinc for corn vigor.",
                28.00, "Artificial", "In Stock", "Corn", d9.getId()));
        productRepository.save(new Product(null, "Azoxystrobin + Difenoconazole", "Medicine",
                "Yield-protecting corn fungicide stopping rust sporulation immediately.",
                42.00, "Artificial", "In Stock", "Corn", d9.getId()));

        // 10. Corn Northern Leaf Blight
        Disease d10 = diseaseRepository.save(new Disease(null, "Corn", "Corn Northern Leaf Blight",
                "Exserohilum turcicum fungus surviving in infected corn stubble residues.",
                "Long, cigar-shaped elliptical grayish-green to tan lesions (1-6 inches long) parallel to leaf veins.",
                "Tillage to bury corn debris, 1-2 year rotation out of corn, plant resistant hybrid lines."));

        fertilizerRepository.save(new Fertilizer(null, "Diammonium Phosphate (DAP 18-46-0)",
                "High phosphorus starter fertilizer promoting deep root architecture.",
                31.00, "Artificial", "In Stock", d10.getId()));
        medicineRepository.save(new Medicine(null, "Pyraclostrobin (Headline AMP)",
                "Plant health-promoting fungicide controlling northern corn leaf blights.",
                45.00, "Artificial", "In Stock", d10.getId()));
        productRepository.save(new Product(null, "Diammonium Phosphate (DAP)", "Fertilizer",
                "Phosphorus rich starter plant food for early season corn vigor.",
                31.00, "Artificial", "In Stock", "Corn", d10.getId()));
        productRepository.save(new Product(null, "Pyraclostrobin (Headline AMP)", "Medicine",
                "Fungicide engineered for maximum coverage and blight protection.",
                45.00, "Artificial", "In Stock", "Corn", d10.getId()));

        // 11. Grape Black Rot
        Disease d11 = diseaseRepository.save(new Disease(null, "Grape", "Grape Black Rot",
                "Guignardia bidwellii fungus. The most destructive grapevine disease in humid regions.",
                "Circular reddish-brown spots with dark borders and tiny pycnidia fruiting bodies on leaves, shriveling berries into hard black mummies.",
                "Open canopy pruning to allow direct sunlight, remove all mummified grape clusters during dormant season."));

        fertilizerRepository.save(new Fertilizer(null, "Organic Kelp Meal & Humic Acid",
                "Boosts vine root vigor and secondary metabolite defense synthesis.",
                23.00, "Natural", "In Stock", d11.getId()));
        medicineRepository.save(new Medicine(null, "Captan 50% WP Grape Fungicide",
                "Standard protectant fungicide preventing black rot spore establishment.",
                26.00, "Artificial", "In Stock", d11.getId()));
        productRepository.save(new Product(null, "Organic Kelp Meal & Humic Acid", "Fertilizer",
                "Cold-water Ascophyllum meal providing potassium and natural cytokinins.",
                23.00, "Natural", "In Stock", "Grape", d11.getId()));
        productRepository.save(new Product(null, "Captan 50% WP Grape Fungicide", "Medicine",
                "Reliable multi-site contact fungicide for vineyard protection.",
                26.00, "Artificial", "In Stock", "Grape", d11.getId()));

        // 12. Grape Powdery Mildew
        Disease d12 = diseaseRepository.save(new Disease(null, "Grape", "Grape Powdery Mildew",
                "Erysiphe necator fungus thriving in shade, low light, and warm temperatures.",
                "White, floury powder coating over leaves and young grape berries, causing leaf curling and fruit splitting.",
                "Canopy shoot thinning to eliminate dense shading, ensure morning sun reaches grape bunches."));

        fertilizerRepository.save(new Fertilizer(null, "Potassium Silicate Foliar Tonic",
                "Silica deposits into leaf cuticles forming a physical armor against mildew haustoria.",
                29.00, "Artificial", "In Stock", d12.getId()));
        medicineRepository.save(new Medicine(null, "Potassium Bicarbonate Organic Spray (MilStop)",
                "Organic contact cure that collapses mildew cell walls in minutes.",
                21.00, "Natural", "In Stock", d12.getId()));
        medicineRepository.save(new Medicine(null, "Tebuconazole Systemic Fungicide",
                "Curative triazole fungicide for heavy vineyard powdery mildew infestations.",
                33.00, "Artificial", "In Stock", d12.getId()));

        productRepository.save(new Product(null, "Potassium Silicate Foliar Tonic", "Fertilizer",
                "Liquid soluble silicon for superior epidermal plant disease defense.",
                29.00, "Artificial", "In Stock", "Grape", d12.getId()));
        productRepository.save(new Product(null, "MilStop Potassium Bicarbonate", "Medicine",
                "EPA-registered OMRI listed cure for powdery mildew and downy mildew.",
                21.00, "Natural", "In Stock", "Grape", d12.getId()));
        productRepository.save(new Product(null, "Tebuconazole Systemic Fungicide", "Medicine",
                "Rapidly absorbed therapeutic treatment for viticulture.",
                33.00, "Artificial", "In Stock", "Grape", d12.getId()));

        // 13. Pepper Bell Bacterial Spot
        Disease d13 = diseaseRepository.save(new Disease(null, "Pepper Bell", "Pepper Bell Bacterial Spot",
                "Xanthomonas campestris pv. vesicatoria bacteria spread by splashing rain and contaminated seed.",
                "Small, water-soaked circular spots turning dark brown with distinct yellow halos, causing heavy premature defoliation.",
                "Use certified disease-free seeds, avoid overhead sprinkler irrigation, disinfect stakes and pruning shears."));

        fertilizerRepository.save(new Fertilizer(null, "Slow-Release 15-15-15 Vegetable Food",
                "Balanced macronutrients to support steady vegetative growth and foliage replenishment.",
                18.00, "Artificial", "In Stock", d13.getId()));
        medicineRepository.save(new Medicine(null, "Copper Hydroxide (Kocide 3000)",
                "High-bioavailability copper bactericide/fungicide controlling bacterial spot.",
                32.50, "Artificial", "In Stock", d13.getId()));
        medicineRepository.save(new Medicine(null, "Bacillus amyloliquefaciens Bio-Protect",
                "Natural bacterial probiotic that produces lipopeptides inhibiting Xanthomonas.",
                27.00, "Natural", "In Stock", d13.getId()));

        productRepository.save(new Product(null, "Slow-Release 15-15-15 Vegetable Food", "Fertilizer",
                "Balanced slow-release granular fertilizer for peppers and nightshades.",
                18.00, "Artificial", "In Stock", "Pepper Bell", d13.getId()));
        productRepository.save(new Product(null, "Copper Hydroxide (Kocide 3000)", "Medicine",
                "Finely engineered copper particles for optimal bacterial leaf coverage.",
                32.50, "Artificial", "In Stock", "Pepper Bell", d13.getId()));
        productRepository.save(new Product(null, "Bacillus amyloliquefaciens Bio-Protect", "Medicine",
                "Certified organic bio-bactericide for sustainable vegetable farming.",
                27.00, "Natural", "In Stock", "Pepper Bell", d13.getId()));

        // 14. Pepper Bell Healthy
        Disease d14 = diseaseRepository.save(new Disease(null, "Pepper Bell", "Pepper Bell Healthy",
                "None. Plant is healthy with excellent fruit set and vegetative vigor.",
                "Deep green foliage, upright canopy, absence of bacterial spotting or viral mosaic mottling.",
                "Ensure steady soil moisture (1-2 inches per week), provide warm root zone conditions, maintain mulching."));

        fertilizerRepository.save(new Fertilizer(null, "Organic Fish & Guano Liquid Fertilizer",
                "All-natural marine and bat guano source of organic nitrogen and phosphorus.",
                20.00, "Natural", "In Stock", d14.getId()));
        productRepository.save(new Product(null, "Organic Fish & Guano Liquid Fertilizer", "Fertilizer",
                "Cold-processed marine hydrolysate for vibrant green pepper growth.",
                20.00, "Natural", "In Stock", "Pepper Bell", d14.getId()));
    }
}
