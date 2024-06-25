package rw.ac.rca.springboot.v1.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rw.ac.rca.springboot.v1.audits.TimestampAudit;
import rw.ac.rca.springboot.v1.enums.EAccountType;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Account extends TimestampAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "account_number")
    private String accountNumber;

    private double amount;

    @Enumerated(EnumType.STRING)
    private EAccountType type;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User customer;

    private Date bankingDateTime;

    public Account(String accountNumber, double amount, EAccountType type) {
        this.accountNumber = accountNumber;
        this.amount = amount;
        this.type = type;
    }

    public Account(String accountNumber, double amount, EAccountType type, User customer) {
        this.accountNumber = accountNumber;
        this.amount = amount;
        this.type = type;
        this.customer = customer;
    }
}
