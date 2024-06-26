package rw.ac.rca.springboot.v1.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rw.ac.rca.springboot.v1.models.Account;
import rw.ac.rca.springboot.v1.payload.request.CreateAccountDTO;

import java.util.List;
import java.util.UUID;

public interface IAccountService {
    Page<Account> findAll(Pageable pageable);

    Account findById(UUID id);

    Account create(CreateAccountDTO account);

    Account update(UUID id, Account account);

    boolean delete(UUID id);

    List<Account> findByUserId(UUID userId);

    Page<Account> searchAccount(Pageable pageable, String searchKey);

    Account getByAccountNumber(String accountNumber);

    Account deposit(UUID accountId, double amount);

    Account withdraw(UUID accountId, double amount);

    List<Account> getMyAccounts();

}
