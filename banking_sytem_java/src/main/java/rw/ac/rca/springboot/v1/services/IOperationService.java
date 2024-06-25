package rw.ac.rca.springboot.v1.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rw.ac.rca.springboot.v1.models.Operation;

import java.util.UUID;

public interface IOperationService {
    Page<Operation> findAll(Pageable pageable);

    Operation findById(UUID id);

    Operation create(Operation operation);

    Operation update(UUID id, Operation operation);

    boolean delete(UUID id);

    Page<Operation> findByUserId(Pageable pageable, UUID userId);

    void transfer(UUID fromAccountId, UUID toAccountId, double amount);
}
