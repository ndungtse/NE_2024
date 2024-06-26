package rw.ac.rca.springboot.v1.services;

import rw.ac.rca.springboot.v1.enums.ERole;
import rw.ac.rca.springboot.v1.enums.EUserStatus;
import rw.ac.rca.springboot.v1.models.File;
import rw.ac.rca.springboot.v1.models.User;
import rw.ac.rca.springboot.v1.payload.request.UpdateUserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.UUID;


public interface IUserService {

    Page<User> getAll(Pageable pageable);

    User getById(UUID id);

    User create(User user);
    User save(User user);

    User update(UUID id, UpdateUserDTO dto);

    boolean delete(UUID id);

    Page<User> getAllByRole(Pageable pageable, ERole role);

    Page<User> searchUser(Pageable pageable, String searchKey);

    User getLoggedInUser();

    User getByEmail(String email);

    User changeStatus(UUID id, EUserStatus status);

    User changeProfileImage(UUID id, File file);

    User removeProfileImage(UUID id);

    Optional<User> findByActivationCode(String verificationCode);

}