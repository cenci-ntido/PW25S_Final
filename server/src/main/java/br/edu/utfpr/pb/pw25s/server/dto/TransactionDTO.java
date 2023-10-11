package br.edu.utfpr.pb.pw25s.server.dto;

import br.edu.utfpr.pb.pw25s.server.dto.generic.GenericDTO;
import br.edu.utfpr.pb.pw25s.server.model.Account;
import br.edu.utfpr.pb.pw25s.server.model.enums.EnumCategories;
import br.edu.utfpr.pb.pw25s.server.model.enums.EnumStatus;
import br.edu.utfpr.pb.pw25s.server.model.enums.EnumTypeTransaction;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO extends GenericDTO {

    @NotNull
    @Size(min = 2, max = 50)
    private String description;

    @NotNull
    private Double realValue;

    @NotNull
    private LocalDate date;

    @NotNull
    private Account account;

    @NotNull
    private EnumCategories category;

    @NotNull
    private EnumStatus status;

    @NotNull
    private EnumTypeTransaction typeTransaction;
}
