package com.example.glamlumina.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.glamlumina.entity.Orders;
import java.util.List;
public interface OrdersRepository extends JpaRepository<Orders, Long> {
    List<Orders> findByUsername(String username);
}
