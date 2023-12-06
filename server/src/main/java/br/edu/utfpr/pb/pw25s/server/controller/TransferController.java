package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.TransferDTO;
import br.edu.utfpr.pb.pw25s.server.model.Transfer;
import br.edu.utfpr.pb.pw25s.server.model.enums.EnumCategories;
import br.edu.utfpr.pb.pw25s.server.model.enums.EnumStatus;
import br.edu.utfpr.pb.pw25s.server.model.enums.EnumTypeTransaction;
import br.edu.utfpr.pb.pw25s.server.service.ICrudService;
import br.edu.utfpr.pb.pw25s.server.service.ITransferService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("transfers")
public class TransferController extends CrudController<Transfer, TransferDTO, Long> {

    private static ITransferService expenseDetailService;
    private static ModelMapper modelMapper;

    public TransferController(ITransferService expenseDetailService,
                              ModelMapper modelMapper) {
        super(Transfer.class, TransferDTO.class);
        TransferController.expenseDetailService = expenseDetailService;
        TransferController.modelMapper = modelMapper;
    }

    @Override//
    protected ICrudService<Transfer, Long> getService() {
        return TransferController.expenseDetailService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return TransferController.modelMapper;
    }
}