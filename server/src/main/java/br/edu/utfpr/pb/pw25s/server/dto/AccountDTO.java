package br.edu.utfpr.pb.pw25s.server.dto;

import br.edu.utfpr.pb.pw25s.server.dto.generic.GenericDTO;
import br.edu.utfpr.pb.pw25s.server.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDTO extends GenericDTO {

    @NotNull
    @Size(min = 2, max = 50)
    private String description;

    @NotNull
    private Double savedMoney;

    private UserDTO user;
}
