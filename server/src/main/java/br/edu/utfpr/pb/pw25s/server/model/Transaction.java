package br.edu.utfpr.pb.pw25s.server.model;

import br.edu.utfpr.pb.pw25s.server.model.enums.EnumCategories;
import br.edu.utfpr.pb.pw25s.server.model.enums.EnumStatus;
import br.edu.utfpr.pb.pw25s.server.model.generic.GenericModel;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;


@Entity
@Table(name = "tb_transaction")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction extends GenericModel {

    @NotNull
    @Size(min = 2, max = 50)
    @Column(length = 50, nullable = false)
    private String description;

    @NotNull
    @Column(nullable = false)
    private Double realValue;

    @NotNull
    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumCategories category;

    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumStatus status;

    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumType type;
}