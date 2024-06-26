package rw.ac.rca.springboot.v1.payload.request;

import rw.ac.rca.springboot.v1.validators.ValidPassword;
import lombok.Getter;

import jakarta.validation.constraints.NotBlank;

@Getter
public class ResetPasswordDTO {

    @NotBlank
    private String email;

    @NotBlank
    private String passwordResetCode;

    @ValidPassword
    private String newPassword;
}
