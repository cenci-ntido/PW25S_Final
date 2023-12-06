package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.Transfer;
import br.edu.utfpr.pb.pw25s.server.repository.TransferRepository;
import br.edu.utfpr.pb.pw25s.server.repository.TransferRepository;
import br.edu.utfpr.pb.pw25s.server.service.AuthService;
import br.edu.utfpr.pb.pw25s.server.service.ITransactionService;
import br.edu.utfpr.pb.pw25s.server.service.ITransferService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransferServiceImpl extends CrudServiceImpl<Transfer, Long>
        implements ITransferService {

    private final TransferRepository transferRepository;
    private final AuthService authService;


    public TransferServiceImpl(TransferRepository transferRepository, AuthService authService) {
        this.transferRepository = transferRepository;
        this.authService = authService;
    }

    @Override
    protected JpaRepository<Transfer, Long> getRepository() {
        return transferRepository;
    }

    @Override
    public Transfer findOne(Long aLong) {
        if(transferRepository.existsByIdAndAccountOriginUserId(aLong,
                authService.getAuthenticatedUser().getId())){
            return transferRepository.findByIdAndAccountOriginUserId(aLong,
                    authService.getAuthenticatedUser().getId());
        }else{
            throw new RuntimeException("Transferência não encontrada para seu usuário!");
        }
    }

    @Override
    public List<Transfer> findAll() {
        return transferRepository.findByAccountOriginUserId(authService.getAuthenticatedUser().getId());
    }

    @Override
    public void delete(Long aLong) {
        if(transferRepository.findByIdAndAccountOriginUserId(aLong, authService.getAuthenticatedUser().getId()) != null){
            super.delete(aLong);
        }else{
            throw new RuntimeException("Transferência informada não existe ou não é do seu usuário!");
        }
    }
}
