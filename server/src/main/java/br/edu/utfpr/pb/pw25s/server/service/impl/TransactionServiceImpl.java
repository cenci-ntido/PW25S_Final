package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.Transaction;
import br.edu.utfpr.pb.pw25s.server.repository.TransactionRepository;
import br.edu.utfpr.pb.pw25s.server.service.AuthService;
import br.edu.utfpr.pb.pw25s.server.service.ITransactionService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionServiceImpl extends CrudServiceImpl<Transaction, Long>
        implements ITransactionService {

    private final TransactionRepository transactionRepository;
    private final AuthService authService;


    public TransactionServiceImpl(TransactionRepository transactionRepository, AuthService authService) {
        this.transactionRepository = transactionRepository;
        this.authService = authService;
    }

    @Override
    protected JpaRepository<Transaction, Long> getRepository() {
        return transactionRepository;
    }

    @Override
    public Transaction findOne(Long aLong) {
        if(transactionRepository.existsByIdAndAccountUserId(aLong,
                authService.getAuthenticatedUser().getId())){
            return transactionRepository.findByIdAndAccountUserId(aLong,
                    authService.getAuthenticatedUser().getId());
        }else{
            throw new RuntimeException("Transação não encontrada para seu usuário!");
        }
    }

    @Override
    public List<Transaction> findAll() {
        return transactionRepository.findByAccountUserId(authService.getAuthenticatedUser().getId());
    }

    @Override
    public void delete(Long aLong) {
        if(transactionRepository.findByIdAndAccountUserId(aLong, authService.getAuthenticatedUser().getId()) != null){
            super.delete(aLong);
        }else{
            throw new RuntimeException("Transação informada não existe ou não é do seu usuário!");
        }
    }
}
