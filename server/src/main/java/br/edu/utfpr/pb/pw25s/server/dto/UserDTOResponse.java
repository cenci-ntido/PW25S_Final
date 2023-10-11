package br.edu.utfpr.pb.pw25s.server.dto;

import br.edu.utfpr.pb.pw25s.server.annotation.UniqueUsername;
import br.edu.utfpr.pb.pw25s.server.model.User;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTOResponse {

    private Long id;

    @UniqueUsername
    @NotNull
    @Size(min = 4, max = 50)
    private String username;

    public UserDTOResponse(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
    }
}
