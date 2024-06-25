package rw.ac.rca.springboot.v1.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rw.ac.rca.springboot.v1.models.Operation;
import rw.ac.rca.springboot.v1.models.User;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface IOperationRepository extends JpaRepository<Operation, UUID>{
    Page<Operation> findByUser(Pageable pageable, User user);
}
