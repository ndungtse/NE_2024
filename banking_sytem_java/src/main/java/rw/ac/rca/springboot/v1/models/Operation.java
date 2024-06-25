package rw.ac.rca.springboot.v1.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rw.ac.rca.springboot.v1.audits.TimestampAudit;
import rw.ac.rca.springboot.v1.config.BeanLocator;
import rw.ac.rca.springboot.v1.enums.EOperationType;
import rw.ac.rca.springboot.v1.serviceImpls.MessageServiceImpl;
import rw.ac.rca.springboot.v1.services.IMessageService;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "operations")
@AllArgsConstructor
@NoArgsConstructor
public class Operation extends TimestampAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    // map to account
    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    // map to user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private double amount;

    @Enumerated(EnumType.STRING)
    private EOperationType type;

    private Date operationDateTime;

    public Operation(Account account, User user, double amount, EOperationType type) {
        this.account = account;
        this.user = user;
        this.amount = amount;
        this.type = type;
    }

    public Operation(Account account, User user, double amount, EOperationType type, Date operationDateTime) {
        this.account = account;
        this.user = user;
        this.amount = amount;
        this.type = type;
        this.operationDateTime = operationDateTime;
    }

    // toString method
    @Override
    public String toString() {
        return "Operation{" +
                "id=" + id +
                ", account=" + account +
                ", user=" + user +
                ", amount=" + amount +
                ", type=" + type +
                ", operationDateTime=" + operationDateTime +
                '}';
    }

    @PostPersist
    public void createMessageAfterOperation() {
        IMessageService messageService = BeanLocator.getBean(MessageServiceImpl.class);
        Message message = new Message();
        message.setMessage("Operation of type " + this.getType() + " with amount " + this.getAmount() + " was done successfully");
        message.setCustomer(this.getUser());
        messageService.sendMessage(message);
    }
}
