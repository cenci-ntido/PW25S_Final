package br.edu.utfpr.pb.pw25s.server.model;

import br.edu.utfpr.pb.pw25s.server.model.enums.EnumCategories;
import br.edu.utfpr.pb.pw25s.server.model.enums.EnumStatus;
import br.edu.utfpr.pb.pw25s.server.model.enums.EnumTypeTransaction;
import br.edu.utfpr.pb.pw25s.server.model.generic.GenericModel;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;


@Entity
@Table(name = "tb_transfer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transfer extends GenericModel {

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
    @JoinColumn(name = "account_origin_id", referencedColumnName = "id")
    private Account accountOrigin;

    @ManyToOne
    @JoinColumn(name = "account_destiny_id", referencedColumnName = "id")
    private Account accountDestiny;

    @PrePersist
    @PreUpdate
    private void validateAccounts() {
        if (accountOrigin != null && accountOrigin.equals(accountDestiny)) {
            throw new IllegalStateException("Conta de origem não pode ser igual à conta de destino.");
        }
    }
}