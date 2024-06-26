package rw.ac.rca.springboot.v1.payload.request;


import rw.ac.rca.springboot.v1.enums.EGender;
import rw.ac.rca.springboot.v1.enums.ERole;
import rw.ac.rca.springboot.v1.validators.ValidPassword;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.util.Date;

@Data
public class CreateUserDTO {

    @Email
    private String email;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    @Pattern(regexp = "[0-9]{9,12}", message = "Your phone is not a valid tel we expect 2507***, or 07*** or 7***")
    private String telephone;

    private Date dateOfBirth;

    private EGender gender;

    private ERole role;

    @ValidPassword
    private String password;
}
