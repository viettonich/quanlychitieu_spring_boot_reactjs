package com.viet.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.viet.model.Category;
import com.viet.model.Consumption;
import com.viet.repository.CategoryRepository;
import com.viet.repository.ConsumptionReponsitory;
import com.viet.repository.ConsumptionReponsitoryImpl;

@RestController
@RequestMapping(value = "/api/consumptions", produces = { MediaType.APPLICATION_JSON_VALUE })
@CrossOrigin(origins = "http://localhost:3000")
public class ConsumptionController {

    @Autowired
    private ConsumptionReponsitory consumptionReponsitory;

    @Autowired
    private ConsumptionReponsitoryImpl consumptionReponsitoryCustom;

    @Autowired
    private CategoryRepository categoryRepository;

    @RequestMapping(value = "", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<Consumption> create(@RequestBody Consumption consumption) {
        Consumption consumptionNew = consumptionReponsitory.saveAndFlush(consumption);
        return new ResponseEntity<>(consumptionNew, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<Consumption>> findAll() {
        List<Consumption> consumptionList = consumptionReponsitory.findAll();
        return new ResponseEntity<>(consumptionList, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable int id) {
        Optional<Consumption> consumption = consumptionReponsitory.findById(id);
        if (!consumption.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        consumptionReponsitory.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Consumption> update(@PathVariable(value = "id") int id,
            @RequestBody Consumption consumption) {

        Optional<Consumption> curentConsumption = consumptionReponsitory.findById(id);
        if (!curentConsumption.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        curentConsumption.get().setAmount(consumption.getAmount());
        curentConsumption.get().setName(consumption.getName());
        curentConsumption.get().setDateCreate(consumption.getDateCreate());

        Category category = categoryRepository.findById(consumption.getCategory().getId()).get();

        curentConsumption.get().setCategory(category);
        
        // hihhi

        consumptionReponsitory.save(curentConsumption.get());
        return new ResponseEntity<>(curentConsumption.get(), HttpStatus.OK);
        
        //hay
    }

    @RequestMapping(value = "/date-create/{date}", method = RequestMethod.GET)
    public ResponseEntity<List<Consumption>> findByDate(@PathVariable String date) {

        List<Consumption> consumptionList = consumptionReponsitory.findByDateCreate(date);
        return new ResponseEntity<>(consumptionList, HttpStatus.OK);
    }

    @RequestMapping(value = "/date-create", method = RequestMethod.GET)
    public ResponseEntity<List<Consumption>> findByMonth(@RequestParam String year, @RequestParam String month) {
        List<Consumption> consumptionList = consumptionReponsitory.findByDateCreateMonth(year, month);
        return new ResponseEntity<>(consumptionList, HttpStatus.OK);
    }

    @RequestMapping(value = "/total-amount", method = RequestMethod.GET)
    public ResponseEntity<Integer> getTotalAmount(@RequestParam String year, @RequestParam String month) {

        return new ResponseEntity<>(consumptionReponsitory.totalAmount(year, month), HttpStatus.OK);
    }

    @RequestMapping(value = "/report", method = RequestMethod.GET)
    public ResponseEntity<List<Object[]>> report() {
        List<Object[]> consumptionList = consumptionReponsitoryCustom.reportTotalAmountByDay();
        return new ResponseEntity<>(consumptionList, HttpStatus.OK);
    }

}
