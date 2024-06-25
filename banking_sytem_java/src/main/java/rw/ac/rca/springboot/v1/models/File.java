package rw.ac.rca.springboot.v1.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import rw.ac.rca.springboot.v1.audits.InitiatorAudit;
import rw.ac.rca.springboot.v1.enums.EFileSizeType;
import rw.ac.rca.springboot.v1.enums.EFileStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "files", uniqueConstraints = {@UniqueConstraint(columnNames = "path")})
@JsonIgnoreProperties(value = {"path"}, allowGetters = true)
public class File extends InitiatorAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "path")
    private String path;

    @Transient
    private String url;

    @Column(name = "size")
    private int size;

    @Column(name = "size_type")
    @Enumerated(EnumType.STRING)
    private EFileSizeType sizeType;

    @Column(name = "type")
    private String type;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private EFileStatus status;

    public String getUrl() {
        return "http://localhost:8087/api/v1/files/load-file" + "/" + this.getName();
    }
}

