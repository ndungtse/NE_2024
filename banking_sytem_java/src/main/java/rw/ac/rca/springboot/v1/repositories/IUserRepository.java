package rw.ac.rca.springboot.v1.repositories;

import rw.ac.rca.springboot.v1.enums.ERole;
import rw.ac.rca.springboot.v1.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface IUserRepository extends JpaRepository<User, UUID> {

    Optional<User> findById(UUID userID);

    Optional<User> findByEmail(String email);

    Page<User> findByRoles(Pageable pageable, ERole role);

    Optional<User> findByActivationCode(String activationCode);

    @Query("SELECT u FROM User u" +
            " WHERE (lower(u.firstName)  LIKE ('%' || lower(:searchKey) || '%')) " +
            " OR (lower(u.lastName) LIKE ('%' || lower(:searchKey) || '%')) " +
            " OR (lower(u.email) LIKE ('%' || lower(:searchKey) || '%'))")
    Page<User> searchUser(Pageable pageable, String searchKey);
}
