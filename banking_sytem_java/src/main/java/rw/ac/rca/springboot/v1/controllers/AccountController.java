package rw.ac.rca.springboot.v1.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.ac.rca.springboot.v1.payload.request.CreateAccountDTO;
import rw.ac.rca.springboot.v1.payload.response.ApiResponse;
import rw.ac.rca.springboot.v1.services.IAccountService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/accounts")
@RequiredArgsConstructor
public class AccountController {
    private final IAccountService accountService;

     @PostMapping("/create")
    public ResponseEntity<ApiResponse> createAccount(@RequestBody CreateAccountDTO account) {
        return ResponseEntity.ok(ApiResponse.success("Account created successfully", accountService.create(account)));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllAccounts(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit
    ) {
        Pageable pageable = PageRequest.of(page, limit, Sort.Direction.ASC, "id");
        return ResponseEntity.ok(ApiResponse.success("Accounts fetched successfully", accountService.findAll(pageable)));
    }

    // get my accounts
    @GetMapping("/my-accounts")
    public ResponseEntity<ApiResponse> getMyAccounts() {
        return ResponseEntity.ok(ApiResponse.success("My accounts fetched successfully", accountService.getMyAccounts()));
    }

    @GetMapping("/account/{accountNumber}")
    public ResponseEntity<ApiResponse> getAccountByAccountNumber(@PathVariable String accountNumber) {
        return ResponseEntity.ok(ApiResponse.success("Account fetched successfully", accountService.getByAccountNumber(accountNumber)));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteAccount(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Account deleted successfully", accountService.delete(id)));
    }

    @PutMapping("/deposit/{accountId}/{amount}")
    public ResponseEntity<ApiResponse> deposit(@PathVariable UUID accountId, @PathVariable double amount) {
        return ResponseEntity.ok(ApiResponse.success("Deposit successful", accountService.deposit(accountId, amount)));
    }

    @PutMapping("/withdraw/{accountId}/{amount}")
    public ResponseEntity<ApiResponse> withdraw(@PathVariable UUID accountId, @PathVariable double amount) {
        return ResponseEntity.ok(ApiResponse.success("Withdrawal successful", accountService.withdraw(accountId, amount)));
    }
}
