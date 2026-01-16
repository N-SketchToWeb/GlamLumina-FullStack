package com.example.glamlumina.controller;

import com.example.glamlumina.entity.Orders;
import com.example.glamlumina.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173") // React frontend port
public class OrdersController {

    @Autowired
    private OrdersRepository orderRepository;

    // Get orders by username
    @GetMapping("/user/{username}")
    public List<Orders> getOrdersByUser(@PathVariable String username) {
        return orderRepository.findByUsername(username);
    }

    // Save new order
    @PostMapping("/create")
    public Orders createOrder(@RequestBody Orders order) {
        // Ensure each OrderItem points back to parent order
        if (order.getItems() != null) {
            order.getItems().forEach(item -> item.setOrder(order));
        }
        return orderRepository.save(order);
    }
}
