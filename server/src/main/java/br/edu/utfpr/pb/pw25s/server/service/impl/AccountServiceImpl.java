package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.Account;
import br.edu.utfpr.pb.pw25s.server.repository.AccountRepository;
import br.edu.utfpr.pb.pw25s.server.service.AuthService;
import br.edu.utfpr.pb.pw25s.server.service.IAccountService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl extends CrudServiceImpl<Account, Long>
        implements IAccountService {

    private final AccountRepository accountRepository;
    private final AuthService authService;


    public AccountServiceImpl(AccountRepository accountRepository, AuthService authService) {
        this.accountRepository = accountRepository;
        this.authService = authService;
    }

    @Override
    protected JpaRepository<Account, Long> getRepository() {
        return accountRepository;
    }

    @Override
    public Account save(Account entity) {
        entity.setUser(authService.getAuthenticatedUser());
        return super.save(entity);
    }

    @Override
    public Account findOne(Long aLong) {
        if(accountRepository.existsByIdAndUserId(aLong,
                authService.getAuthenticatedUser().getId())){
            return accountRepository.findByIdAndUserId(aLong,
                    authService.getAuthenticatedUser().getId());
        }else{
            throw new RuntimeException("Conta não encontrada para seu usuário!");
        }
    }

    @Override
    public List<Account> findAll() {
        return accountRepository.findByUserId(authService.getAuthenticatedUser().getId());
    }

    @Override
    public void delete(Long aLong) {
        if(accountRepository.findByIdAndUserId(aLong, authService.getAuthenticatedUser().getId()) != null){
            super.delete(aLong);
        }else{
            throw new RuntimeException("Conta informada não existe ou não é do seu usuário!");
        }
    }
}
