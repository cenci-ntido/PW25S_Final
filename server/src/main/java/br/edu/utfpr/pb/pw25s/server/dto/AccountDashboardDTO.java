package br.edu.utfpr.pb.pw25s.server.dto;

import br.edu.utfpr.pb.pw25s.server.dto.generic.GenericDTO;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDashboardDTO extends GenericDTO {

    @NotNull
    @Size(min = 2, max = 50)
    private String description;

    @NotNull
    private Double savedMoney;

    private UserDTOResponse user;

    private  Double saldo;
}
