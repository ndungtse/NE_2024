package rw.ac.rca.springboot.v1.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.ac.rca.springboot.v1.models.Operation;
import rw.ac.rca.springboot.v1.payload.request.TransferOperationDTO;
import rw.ac.rca.springboot.v1.payload.response.ApiResponse;
import rw.ac.rca.springboot.v1.services.IOperationService;

import java.util.UUID;

@RestController
@RequestMapping("/api/operations")
@RequiredArgsConstructor
public class OperationController {
    private final IOperationService operationService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createOperation(@RequestBody Operation operation) {
        return ResponseEntity.ok(ApiResponse.success("Operation created successfully", operationService.create(operation)));
    }

    @PostMapping("/transfer")
    public ResponseEntity<ApiResponse> transfer(@RequestBody TransferOperationDTO dto) {
        operationService.transfer(dto.getFromAccountId(), dto.getToAccountId(),dto.getAmount());
        return ResponseEntity.ok(ApiResponse.success("Transfer successful"));
    }

    @PostMapping("/all")
    public ResponseEntity<ApiResponse> getAllOperations(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit
    ) {
        Pageable pageable = PageRequest.of(page, limit, Sort.Direction.ASC, "id");
        return ResponseEntity.ok(ApiResponse.success("Operations fetched successfully", operationService.findAll(pageable)));
    }

    @PostMapping("/operation/{id}")
    public ResponseEntity<ApiResponse> getOperationById(@RequestBody Operation operation) {
        return ResponseEntity.ok(ApiResponse.success("Operation fetched successfully", operationService.findById(operation.getId())));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteOperation(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Operation deleted successfully", operationService.delete(id)));
    }
}
