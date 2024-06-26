package rw.ac.rca.springboot.v1.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import rw.ac.rca.springboot.v1.enums.EAccountType;
import rw.ac.rca.springboot.v1.models.Account;
import rw.ac.rca.springboot.v1.models.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface IAccountRepository extends JpaRepository<Account, UUID>{

    List<Account> findByCustomer(User customer);

    Optional<Account> findByTypeAndCustomer(EAccountType type, User customer);

    Optional<Account> findByAccountNumber(String accountNumber);

    @Query("SELECT a FROM Account a" +
            " WHERE (lower(a.accountNumber)  LIKE ('%' || lower(:searchKey) || '%')) " +
            " OR (lower(a.type) LIKE ('%' || lower(:searchKey) || '%')) " +
            " OR (lower(CAST(a.amount AS string)) LIKE ('%' || lower(:searchKey) || '%'))")
    Page<Account> searchAccount(Pageable pageable, String searchKey);
}
