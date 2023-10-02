package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.Transaction;
import br.edu.utfpr.pb.pw25s.server.repository.TransactionRepository;
import br.edu.utfpr.pb.pw25s.server.service.ITransactionService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl extends CrudServiceImpl<Transaction, Long>
        implements ITransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    protected JpaRepository<Transaction, Long> getRepository() {
        return transactionRepository;
    }
}
