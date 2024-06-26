package rw.ac.rca.springboot.v1.serviceImpls;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import rw.ac.rca.springboot.v1.models.Account;
import rw.ac.rca.springboot.v1.models.User;
import rw.ac.rca.springboot.v1.payload.request.CreateAccountDTO;
import rw.ac.rca.springboot.v1.repositories.IAccountRepository;
import rw.ac.rca.springboot.v1.repositories.IUserRepository;
import rw.ac.rca.springboot.v1.services.IAccountService;
import rw.ac.rca.springboot.v1.services.IMessageService;
import rw.ac.rca.springboot.v1.services.IOperationService;
import rw.ac.rca.springboot.v1.exceptions.BadRequestException;
import rw.ac.rca.springboot.v1.exceptions.ResourceNotFoundException;
import rw.ac.rca.springboot.v1.services.IUserService;
import rw.ac.rca.springboot.v1.standalone.MailService;
import rw.ac.rca.springboot.v1.utils.Utility;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AccountService implements IAccountService {

    //    private final IOperationService operationService;
    private final IUserService userService;
    private final IAccountRepository accountRepository;
    private final IUserRepository userRepository;
    //    private final IMessageService messageService;
    private final MailService mailService;

    @Override
//    @PreAuthorize("hasRole('ADMIN')")
    public Page<Account> findAll(Pageable pageable) {
        return this.accountRepository.findAll(pageable);
    }

    @Override
    public Account create(CreateAccountDTO account) {
        try {
            // check if user with that account type already has an account
            Optional<User> customer = this.userRepository.findById(account.getUserId());
            if (customer.isEmpty()) {
                throw new ResourceNotFoundException("User", "id", account.getUserId().toString());
            }
            Optional<Account> accountOptional = this.accountRepository.findByTypeAndCustomer(account.getType(), customer.get());
            if (accountOptional.isPresent()) {
                throw new BadRequestException(String.format("User with account type '%s' already has an account", account.getType()));
            }
            Account newAccount = new Account();
            String accountNumber = Utility.generateAccountNumber();
            newAccount.setAccountNumber(accountNumber);
            newAccount.setAmount(0);
            newAccount.setType(account.getType());
            newAccount.setCustomer(customer.get());
            return this.accountRepository.save(newAccount);
        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage(), ex);
        }
    }

    @Override
    public Account findById(UUID id) {
        return this.accountRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Account", "id", id));
    }

    @Override
    public Account update(UUID id, Account account) {
        try {
            Account existingAccount = this.accountRepository.findById(id).orElseThrow(
                    () -> new ResourceNotFoundException("Account", "id", id));
            existingAccount.setAccountNumber(account.getAccountNumber());
            existingAccount.setAmount(account.getAmount());
            existingAccount.setType(account.getType());
            return this.accountRepository.save(existingAccount);
        } catch (Exception ex) {
            throw new BadRequestException("Failed to update account", ex);
        }
    }

    @Override
    public boolean delete(UUID id) {
        Account account = this.accountRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Account", "id", id));
        this.accountRepository.delete(account);
        return true;
    }

    @Override
    public List<Account> findByUserId(UUID userId) {
        try {
            User user = this.userRepository.findById(userId).orElseThrow(
                    () -> new ResourceNotFoundException("User", "id", userId));
            return this.accountRepository.findByCustomer(user);
        } catch (Exception ex) {
            throw new BadRequestException("Failed to get user accounts", ex);
        }
    }

    @Override
    public Page<Account> searchAccount(Pageable pageable, String searchKey) {
        return this.accountRepository.searchAccount(pageable, searchKey);
    }

    @Override
    public Account getByAccountNumber(String accountNumber) {
        return this.accountRepository.findByAccountNumber(accountNumber).orElseThrow(
                () -> new ResourceNotFoundException("Account", "accountNumber", accountNumber));
    }

    @Override
    public Account deposit(UUID id, double amount) {
        try {
            Account account = this.accountRepository.findById(id).orElseThrow(
                    () -> new ResourceNotFoundException("Account", "id", id));
            User user = this.userService.getLoggedInUser();
            if (!account.getCustomer().getId().equals(user.getId())) {
                throw new BadRequestException("You are not allowed to deposit to this account");
            }
            account.setAmount(account.getAmount() + amount);
            Account savedAccount = this.accountRepository.save(account);
            // send email
            this.mailService.sendDepositOrWithdrawalNotification(savedAccount, amount, "Deposit");
            return savedAccount;
        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage(), ex);
        }
    }

    @Override
    public Account withdraw(UUID id, double amount) {
        try {
            Account account = this.accountRepository.findById(id).orElseThrow(
                    () -> new ResourceNotFoundException("Account", "id", id));
            User user = this.userService.getLoggedInUser();
            if (!account.getCustomer().getId().equals(user.getId())) {
                throw new BadRequestException("You are not allowed to withdraw from this account");
            }
            if (account.getAmount() < amount) {
                throw new BadRequestException("Insufficient balance");
            }
            account.setAmount(account.getAmount() - amount);
            Account savedAccount = this.accountRepository.save(account);
            // send email
            this.mailService.sendDepositOrWithdrawalNotification(savedAccount, amount, "Withdrawal");
            return savedAccount;
        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage(), ex);
        }
    }

    @Override
    public List<Account> getMyAccounts() {
        User user = this.userService.getLoggedInUser();
        return this.accountRepository.findByCustomer(user);
    }
}



