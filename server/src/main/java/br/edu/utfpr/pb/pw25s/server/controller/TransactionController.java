package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.TransactionDTO;
import br.edu.utfpr.pb.pw25s.server.model.Transaction;
import br.edu.utfpr.pb.pw25s.server.model.enums.EnumTypeTransaction;
import br.edu.utfpr.pb.pw25s.server.service.ICrudService;
import br.edu.utfpr.pb.pw25s.server.service.ITransactionService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("transactions")
public class TransactionController extends CrudController<Transaction, TransactionDTO, Long> {

    private static ITransactionService expenseDetailService;
    private static ModelMapper modelMapper;

    public TransactionController(ITransactionService expenseDetailService,
                                 ModelMapper modelMapper) {
        super(Transaction.class, TransactionDTO.class);
        TransactionController.expenseDetailService = expenseDetailService;
        TransactionController.modelMapper = modelMapper;
    }

    @Override//
    protected ICrudService<Transaction, Long> getService() {
        return TransactionController.expenseDetailService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return TransactionController.modelMapper;
    }

    @RequestMapping("enumtype")
    protected List<String> getTypeEnum (){
        List<String> types = new ArrayList<>();
        types.add(EnumTypeTransaction.EXPENSE.toString());
        types.add(EnumTypeTransaction.REVENUE.toString());
        return types;
    }
}

/*
    @PostMapping // http://localhost:8025/categories
    public ResponseEntity<AccountDTO> create(@RequestBody @Valid AccountDTO category) {
        Category categorySaved = accountService.create( convertToEntity( category ) );
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .buildAndExpand(categorySaved.getId()).toUri();

        return ResponseEntity.created(location).body(convertToDTO(categorySaved));
    }

    @PutMapping("{id}") //http://localhost:8025/categories/{id} em que {id} = um long
    public ResponseEntity<Category> update(@RequestBody @Valid Category category,
                                           @PathVariable Long id) {
        accountService.update(category);
        return ResponseEntity.ok(category);
    }

    @GetMapping
    public ResponseEntity<List<AccountDTO>> findAll() {

        return ResponseEntity.ok(
                accountService.findAll().stream().map(
                        this::convertToDTO).collect(Collectors.toList()
                )
        );
    }

    @GetMapping("{id}")
    public ResponseEntity<Category> findOne(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(accountService.findOne(id));
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable(name = "id") Long id) {
        accountService.delete(id);
    }

    private Category convertToEntity(AccountDTO categoryDTO) {
        return modelMapper.map(categoryDTO, Category.class);
    }

    private AccountDTO convertToDTO(Category category) {
        return modelMapper.map(category, AccountDTO.class);
    }
}
 */
