package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.AccountDTO;
import br.edu.utfpr.pb.pw25s.server.model.Account;
import br.edu.utfpr.pb.pw25s.server.service.IAccountService;
import br.edu.utfpr.pb.pw25s.server.service.ICrudService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("accounts")
public class AccountController extends CrudController<Account, AccountDTO, Long> {

    private static IAccountService accountService;
    private static ModelMapper modelMapper;

    public AccountController(IAccountService accountService,
                              ModelMapper modelMapper) {
        super(Account.class, AccountDTO.class);
        AccountController.accountService = accountService;
        AccountController.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Account, Long> getService() {
        return AccountController.accountService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return AccountController.modelMapper;
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
