package rw.ac.rca.springboot.v1.serviceImpls;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rw.ac.rca.springboot.v1.exceptions.BadRequestException;
import rw.ac.rca.springboot.v1.models.Message;
import rw.ac.rca.springboot.v1.repositories.IMessageRepository;
import rw.ac.rca.springboot.v1.services.IMessageService;
import rw.ac.rca.springboot.v1.standalone.MailService;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class MessageServiceImpl implements IMessageService {
    private final IMessageRepository messageRepository;
    private final MailService mailService;

    @Override
    public Page<Message> findAll(Pageable pageable) {
        return this.messageRepository.findAll(pageable);
    }

    @Override
    public Message findById(UUID id) {
        return this.messageRepository.findById(id).orElse(null);
    }

    @Override
    public Message create(Message message) {
        return this.messageRepository.save(message);
    }

    @Override
    public Message update(UUID id, Message message) {
        return null;
    }

    @Override
    public boolean delete(UUID id) {
        return false;
    }

    @Override
    public Page<Message> findByUserId(Pageable pageable, UUID userId) {
        return null;
    }

    @Override
    public Message sendMessage(Message message) {
        try {
//            this.mailService.sendEmail(message.getTo(), message.getSubject(), message.getContent());
            return this.messageRepository.save(message);
        } catch (Exception e) {
            throw new BadRequestException("Failed to send email");
        }
    }
}
