package br.edu.utfpr.pb.pw25s.server.model;

import br.edu.utfpr.pb.pw25s.server.model.generic.GenericModel;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;


@Entity
@Table(name = "tb_account")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Account extends GenericModel {

    @NotNull
    @Size(min = 2, max = 50)
    @Column(length = 50, nullable = false)
    private String description;

    @NotNull
    @Column(nullable = false)
    private Double savedMoney;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

}