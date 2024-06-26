package rw.ac.rca.springboot.v1.services;

import rw.ac.rca.springboot.v1.payload.response.JwtAuthenticationResponse;

public interface IAuthService {
    JwtAuthenticationResponse login(String email, String password);

    void initiateResetPassword(String email);

    void resetPassword(String email, String passwordResetCode, String newPassword);

    void initiateAccountVerification(String email);

    void verifyAccount(String activationCode);
}
