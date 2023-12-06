package br.edu.utfpr.pb.pw25s.server.dto;

import br.edu.utfpr.pb.pw25s.server.dto.generic.GenericDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO extends GenericDTO {

    List<AccountDashboardDTO> listaContasComSaldo;
}
/*
1 - busca todas as transaction no back para exibir os totais no front
encontrar uma maneira de agrupar os totais por conta!

2 - busca apenas os dados que vai para o dashboard no back
criar uma query que retorna as contas + saldos para o front
cria a interface no front e exibe os dados

List<Account> list
Account {numeroconta-banco-saldo}


2.1 - busca os dados no back
mas ao inves de criar a query, traz todos e usa stream para filtrar e agrupar os dados no DTO

 */