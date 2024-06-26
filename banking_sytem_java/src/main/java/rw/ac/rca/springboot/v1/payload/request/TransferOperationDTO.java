package rw.ac.rca.springboot.v1.payload.request;

import lombok.Data;

import java.util.UUID;

@Data
public class TransferOperationDTO {
    private UUID fromAccountId;
    private UUID toAccountId;
    private double amount;
}
