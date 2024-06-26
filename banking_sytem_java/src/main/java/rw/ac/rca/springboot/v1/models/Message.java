package rw.ac.rca.springboot.v1.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rw.ac.rca.springboot.v1.audits.TimestampAudit;

import java.util.UUID;

@Entity
@Table(name = "messages")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Message extends TimestampAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String message;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User customer;

    public Message(String message, User customer) {
        this.message = message;
        this.customer = customer;
    }
}
