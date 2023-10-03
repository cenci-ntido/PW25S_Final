package br.edu.utfpr.pb.pw25s.server.repository;

import br.edu.utfpr.pb.pw25s.server.model.Account;
import br.edu.utfpr.pb.pw25s.server.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByAccountUserId(Long userId);

    Transaction findByIdAndAccountUserId(Long id, Long userId);

    boolean existsByIdAndAccountUserId(Long id, Long userId);

}
