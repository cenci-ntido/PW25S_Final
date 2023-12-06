package br.edu.utfpr.pb.pw25s.server.repository;

import br.edu.utfpr.pb.pw25s.server.model.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransferRepository extends JpaRepository<Transfer, Long> {

    List<Transfer> findByAccountOriginUserId(Long userId);

    Transfer findByIdAndAccountOriginUserId(Long id, Long userId);

    boolean existsByIdAndAccountOriginUserId(Long id, Long userId);


}
