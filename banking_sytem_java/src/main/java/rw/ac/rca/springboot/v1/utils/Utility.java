package rw.ac.rca.springboot.v1.utils;


import java.security.SecureRandom;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import rw.ac.rca.springboot.v1.models.User;

public class Utility {
    private static final String ALPHANUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final String NUM = "0123456789";
    private static final String ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final Random rng = new SecureRandom();

    private static final Logger logger = LoggerFactory.getLogger(Utility.class);


    static char randomChar() {
        return ALPHANUM.charAt(rng.nextInt(ALPHANUM.length()));
    }

    static char randomNum() {
        return NUM.charAt(rng.nextInt(NUM.length()));
    }

    static char randomStr() {
        return ALPHA.charAt(rng.nextInt(ALPHA.length()));
    }

    public static String randomUUID(int length, int spacing, char returnType) {
        StringBuilder sb = new StringBuilder();
        char spacerChar = '-';
        int spacer = 0;
        while (length > 0) {
            if (spacer == spacing && spacing > 0) {
                spacer++;
                sb.append(spacerChar);
            }
            length--;
            spacer++;

            switch (returnType) {
                case 'A':
                    sb.append(randomChar());
                    break;
                case 'N':
                    sb.append(randomNum());
                    break;
                case 'S':
                    sb.append(randomStr());
                    break;
                default:
                    logger.error("");
                    break;
            }
        }
        return sb.toString();
    }

    public static boolean isImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && (contentType.equals(MediaType.IMAGE_JPEG_VALUE) || contentType.equals(MediaType.IMAGE_PNG_VALUE) || contentType.equals(MediaType.IMAGE_GIF_VALUE));
    }
    public static boolean isCodeValid(String activationCode, String sentCode) {
        return activationCode.trim().equalsIgnoreCase(sentCode.trim());
    }

    public static String getConstraintViolationMessage(DataIntegrityViolationException ex, User user) {
        String message = ex.getMostSpecificCause().getMessage();
        if (message.contains("email")) {
            return String.format("User with email '%s' already exists", user.getEmail());
        } else if (message.contains("telephone")) {
            return String.format("User with phone number '%s' already exists", user.getTelephone());
        }
        // Add more checks for other unique constraints if necessary
        return "A unique constraint violation occurred";
    }

    public static String generateAuthCode() {
        Random random = new Random();
        StringBuilder resetCode = new StringBuilder();
        for (int i = 0; i < 3; i++) {
            int randomNumber = random.nextInt(10); // 0-9
            resetCode.append(randomNumber);
        }
        for (int i = 0; i < 3; i++) {
            char randomLetter = (char) ('A' + random.nextInt(26)); // A-Z
            resetCode.append(randomLetter);
        }
        return resetCode.toString();
    }

    public static String generateAccountNumber() {
        Random random = new Random();
        StringBuilder accountNumber = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            int randomNumber = random.nextInt(10); // 0-9
            accountNumber.append(randomNumber);
        }
        return accountNumber.toString();
    }

}
