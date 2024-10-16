/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.demo;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@ServerEndpoint("/hello")
public class TestServerEndpoint {
        private static Set<Session> clients = new CopyOnWriteArraySet<>();

    @OnOpen
    public void handleOpen(Session session) {
        // Thêm session vào danh sách clients
        clients.add(session);
        System.out.println("New connection: " + session.getId());
    }

    @OnMessage
    public void handleMessage(String message, Session session) {
        // Phát tin nhắn tới tất cả các client
        for (Session client : clients) {
            if (client.isOpen()) {
                try {
                    client.getBasicRemote().sendText(message);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    @OnClose
    public void handleClose(Session session) {
        // Loại bỏ session khỏi danh sách clients
        clients.remove(session);
        System.out.println("Connection closed: " + session.getId());
    }
    
    @OnError
    public void handleError(Throwable t) {
        t.printStackTrace();
    }
}