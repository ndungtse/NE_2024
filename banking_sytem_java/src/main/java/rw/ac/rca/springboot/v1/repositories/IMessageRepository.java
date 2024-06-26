package rw.ac.rca.springboot.v1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rw.ac.rca.springboot.v1.models.Message;

import java.util.UUID;

@Repository
public interface IMessageRepository extends JpaRepository<Message, UUID>{
}
