package rw.ac.rca.springboot.v1.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rw.ac.rca.springboot.v1.models.Message;

import java.util.UUID;

public interface IMessageService {
    Page<Message> findAll(Pageable pageable);

    Message findById(UUID id);

    Message create(Message message);

    Message update(UUID id, Message message);

    boolean delete(UUID id);

    Page<Message> findByUserId(Pageable pageable, UUID userId);

    Message sendMessage(Message message);

}
