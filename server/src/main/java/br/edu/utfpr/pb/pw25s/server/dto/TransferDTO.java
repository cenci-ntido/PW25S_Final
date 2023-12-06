package br.edu.utfpr.pb.pw25s.server.dto;

import br.edu.utfpr.pb.pw25s.server.model.Account;
import br.edu.utfpr.pb.pw25s.server.model.generic.GenericModel;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransferDTO extends GenericModel {

    @NotNull
    @Size(min = 2, max = 50)
    private String description;

    @NotNull
    private Double realValue;

    @NotNull
    private LocalDate date;

    @NotNull
    private Account accountOrigin;

    @NotNull
    private Account accountDestiny;

}