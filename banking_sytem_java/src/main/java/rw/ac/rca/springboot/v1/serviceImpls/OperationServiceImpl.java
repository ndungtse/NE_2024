package rw.ac.rca.springboot.v1.serviceImpls;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rw.ac.rca.springboot.v1.exceptions.BadRequestException;
import rw.ac.rca.springboot.v1.exceptions.ResourceNotFoundException;
import rw.ac.rca.springboot.v1.models.Account;
import rw.ac.rca.springboot.v1.models.Operation;
import rw.ac.rca.springboot.v1.models.User;
import rw.ac.rca.springboot.v1.repositories.IAccountRepository;
import rw.ac.rca.springboot.v1.repositories.IOperationRepository;
import rw.ac.rca.springboot.v1.repositories.IUserRepository;
import rw.ac.rca.springboot.v1.services.IOperationService;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OperationServiceImpl implements IOperationService {

    private final IOperationRepository operationRepository;
    private final IUserRepository userRepository;
    private final IAccountRepository accountRepository;

    @Override
    public Page<Operation> findAll(Pageable pageable) {
        return this.operationRepository.findAll(pageable);
    }

    @Override
    public Operation findById(UUID id) {
        return this.operationRepository.findById(id).orElse(null);
    }

    @Override
    public Operation create(Operation operation) {
        return this.operationRepository.save(operation);
    }

    @Override
    public Operation update(UUID id, Operation operation) {
        operation.setId(id);
        return this.operationRepository.save(operation);
    }

    @Override
    public boolean delete(UUID id) {
        this.operationRepository.deleteById(id);
        return true;
    }

    @Override
    public Page<Operation> findByUserId(Pageable pageable, UUID userId) {
        try {
            Optional<User> user = this.userRepository.findById(userId);
            if (user.isPresent()) {
                return this.operationRepository.findByUser(pageable, user.get());
            }
            throw new ResourceNotFoundException("User", "id", userId.toString());
        } catch (Exception ex) {
            throw new ResourceNotFoundException("User", "id", userId.toString());
        }
    }

    @Override
    @Transactional
    public void transfer(UUID fromAccountId, UUID toAccountId, double amount) {
        try {
            Optional<Account> fromAccount = this.accountRepository.findById(fromAccountId);
            Optional<Account> toAccount = this.accountRepository.findById(toAccountId);
            System.out.println("Is from account present: " + fromAccount.isPresent());
            System.out.println("Is to account present: " + toAccount.isPresent());
            if (fromAccount.isPresent() && toAccount.isPresent()) {
                if (fromAccount.get().getAmount() < amount) {
                    System.out.println("Account balance: " + fromAccount.get().getAmount());
                    System.out.println("Amount to transfer: " + amount);
                    throw new BadRequestException("Insufficient balance");
                }
                fromAccount.get().setAmount(fromAccount.get().getAmount() - amount);
                toAccount.get().setAmount(toAccount.get().getAmount() + amount);
                this.accountRepository.save(fromAccount.get());
                this.accountRepository.save(toAccount.get());
                Operation operation = new Operation();
                operation.setAmount(amount);
                operation.setAccount(fromAccount.get());
                operation.setUser(fromAccount.get().getCustomer());
                this.operationRepository.save(operation);
            } else {
                throw new ResourceNotFoundException("Account", "id", fromAccountId.toString());
            }
        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage(), ex);
        }
    }
}
