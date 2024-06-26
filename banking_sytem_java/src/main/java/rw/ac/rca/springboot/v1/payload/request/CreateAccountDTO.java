package rw.ac.rca.springboot.v1.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import rw.ac.rca.springboot.v1.enums.EAccountType;

import java.util.UUID;

@Data
public class CreateAccountDTO {
    @NotBlank
    private EAccountType type;
    @NotBlank
    private UUID userId;
}
