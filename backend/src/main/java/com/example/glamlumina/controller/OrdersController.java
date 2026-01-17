package com.example.glamlumina.controller;

import com.example.glamlumina.entity.Orders;
import com.example.glamlumina.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
// Allow local React dev server and any other origin for production

public class OrdersController {

    @Autowired
    private OrdersRepository orderRepository;

    // GET /api/orders → Get all orders
    @GetMapping
    public List<Orders> getAllOrders() {
        return orderRepository.findAll();
    }

    // GET /api/orders/user/{username} → Get orders for a specific user
    @GetMapping("/user/{username}")
    public List<Orders> getOrdersByUser(@PathVariable String username) {
        return orderRepository.findByUsername(username);
    }

    // POST /api/orders → Create a new order
    @PostMapping
    public Orders createOrder(@RequestBody Orders order) {
        // Ensure each OrderItem points back to parent order
        if (order.getItems() != null) {
                          order.getItems().forEach(item -> item.setOrder(order));
        }
        return orderRepository.save(order);
    }
}
